import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnv } from "vite";
import { createSettings, PUBLIC_PAGES, getPageMetadata, getConferenceMetadata, renderMetadata, escapeHtml } from "../src/seo/metadata.mjs";

const client = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const env = { ...loadEnv("production", client, ""), ...process.env };
const dist = path.join(client, "dist");
if (!env.VITE_SITE_URL) throw new Error("Set VITE_SITE_URL in client/.env.production before running build:seo.");
const settings = createSettings(env.VITE_SITE_URL, env.VITE_SERVER_URL);
if (settings.siteUrl.startsWith("http:") || /YOUR_|PLACEHOLDER|PROJECT[_-]ID|localhost|127\.0\.0\.1/i.test(settings.siteUrl)) {
  throw new Error("VITE_SITE_URL must be your final public HTTPS domain, not a placeholder or localhost.");
}
const template = await readFile(path.join(dist, "index.html"), "utf8");
if (!template.includes("<!-- SEO:START -->")) throw new Error("SEO markers missing from index.html.");

async function loadConferences() {
  if (env.SEO_DATA_FILE) {
    const file = path.resolve(client, env.SEO_DATA_FILE);
    const json = JSON.parse(await readFile(file, "utf8"));
    const records = Array.isArray(json) ? json : json.conferences;
    if (!Array.isArray(records)) throw new Error("SEO_DATA_FILE must contain an array or { conferences: [...] }.");
    return records.filter((record) => record.active !== false);
  }
  const base = new URL(env.SEO_API_BASE_URL || env.VITE_API_BASE_URL || "/api", settings.siteUrl).href.replace(/\/$/, "");
  const conferences = [];
  let pages = 1;
  for (let page = 1; page <= pages; page += 1) {
    const response = await fetch(`${base}/conferences?limit=100&page=${page}`, { signal: AbortSignal.timeout(30000) });
    if (!response.ok) throw new Error(`Public conference API returned ${response.status}; deployment stopped to avoid publishing incomplete conference SEO.`);
    const json = await response.json();
    if (json.success === false || !Array.isArray(json.data)) throw new Error("Public API must return { success: true, data: [...], meta: { pages } }.");
    conferences.push(...json.data.filter((record) => record.active !== false));
    pages = Math.max(1, Number(json.meta?.pages) || 1);
    if (pages > 1000) throw new Error("Sitemap dataset exceeds this build's safety limit.");
  }
  return conferences;
}

const conferences = await loadConferences();
const responses = {
  upcoming: { data: conferences.filter((c) => c.status === "upcoming").sort((a, b) => new Date(a.startDate) - new Date(b.startDate)) },
  previous: { data: conferences.filter((c) => c.status === "previous").sort((a, b) => new Date(b.endDate) - new Date(a.endDate)) },
};
for (const conference of conferences) {
  if (!conference.title || !(conference.slug || conference._id)) throw new Error("Every public conference needs a title and slug or ID.");
  for (const identifier of [conference.slug, conference._id].filter(Boolean)) responses[`conference:${identifier}`] = { data: conference };
}
const { render } = await import(path.join(client, ".seo-ssr", "entry-server.mjs"));
const report = [];
function visibleMarkup(markup) {
  // Animation entry states should not hide content for readers without JavaScript.
  return markup.replace(/style="([^"]*)"/g, (_match, style) => `style="${style.replace(/(^|;)opacity:0(?=;|$)/g, "$1opacity:1")}"`);
}
async function writePage(urlPath, metadata, renderPath = urlPath, filename) {
  const content = template
    .replace('<html lang="en">', `<html lang="en" data-seo-path="${escapeHtml(urlPath)}">`)
    .replace(/<!-- SEO:START -->[\s\S]*?<!-- SEO:END -->/, `<!-- SEO:START -->\n    ${renderMetadata(metadata, env.VITE_GOOGLE_SITE_VERIFICATION)}\n    <!-- SEO:END -->`)
    .replace('<div id="root"></div>', () => `<div id="root">${visibleMarkup(render(renderPath, responses))}</div>`);
  const relative = filename || (urlPath === "/" ? "index.html" : `${urlPath.slice(1)}.html`);
  const output = path.resolve(dist, relative);
  if (!output.startsWith(`${dist}${path.sep}`)) throw new Error("Unsafe output path.");
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, content);
  report.push({ path: urlPath, file: relative, title: metadata.title, canonical: metadata.canonical || null, robots: metadata.robots });
}

for (const urlPath of Object.keys(PUBLIC_PAGES)) await writePage(urlPath, getPageMetadata(urlPath, settings));
const canonicalRecords = [];
const seen = new Set();
for (const conference of conferences) {
  const identifier = String(conference.slug || conference._id);
  const urlPath = `/conferences/${encodeURIComponent(identifier)}`;
  if (seen.has(urlPath)) throw new Error(`Duplicate conference URL: ${urlPath}`);
  seen.add(urlPath);
  const metadata = getConferenceMetadata(conference, settings, { identifier });
  await writePage(urlPath, metadata);
  canonicalRecords.push({ url: metadata.canonical, updatedAt: conference.updatedAt });
  // Preserve supported MongoDB-ID links with the same slug canonical.
  if (conference._id && conference.slug && String(conference._id) !== conference.slug) {
    const alias = `/conferences/${encodeURIComponent(String(conference._id))}`;
    if (seen.has(alias)) throw new Error(`Duplicate conference alias: ${alias}`);
    seen.add(alias);
    await writePage(alias, metadata);
  }
}
const adminPaths = ["/admin", "/admin/login", "/admin/dashboard", "/admin/conferences", "/admin/conferences/new", "/admin/evaluations", "/admin/contact-enquiries"];
for (const urlPath of adminPaths) await writePage(urlPath, getPageMetadata(urlPath, settings));
// Newly added records remain reachable before another Hosting deployment.
// A source canonical is intentionally omitted; React resolves the real slug.
const fallbackMetadata = getConferenceMetadata(null, settings, { identifier: "pending", status: "loading" });
delete fallbackMetadata.canonical;
await writePage("/conference-fallback", fallbackMetadata, "/conferences/pending", "conference.html");
await writePage("/404", getPageMetadata("/404", settings), "/not-a-real-page", "404.html");

const sitemapEntries = [
  ...Object.keys(PUBLIC_PAGES).map((urlPath) => ({ url: `${settings.siteUrl}${urlPath}` })),
  ...canonicalRecords,
];
const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + sitemapEntries.map((item) => {
  const date = item.updatedAt ? new Date(item.updatedAt) : null;
  const lastmod = date && Number.isFinite(date.getTime()) ? `<lastmod>${date.toISOString()}</lastmod>` : "";
  return `  <url><loc>${escapeHtml(item.url)}</loc>${lastmod}</url>`;
}).join("\n") + "\n</urlset>\n";
await writeFile(path.join(dist, "sitemap.xml"), sitemap);
await writeFile(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /uploads/evaluations/\n\nSitemap: ${settings.siteUrl}/sitemap.xml\n`);
await writeFile(path.join(dist, "seo-report.json"), JSON.stringify({ siteUrl: settings.siteUrl, pages: report, sitemapCount: sitemapEntries.length }, null, 2));
await rm(path.join(client, ".seo-ssr"), { recursive: true, force: true });
console.log(`SEO build complete: ${Object.keys(PUBLIC_PAGES).length} public pages, ${conferences.length} active conferences, ${sitemapEntries.length} sitemap URLs; private pages and a real 404 document also generated.`);
