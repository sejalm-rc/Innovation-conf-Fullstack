import test from "node:test";
import assert from "node:assert/strict";
import { createSettings, PUBLIC_PAGES, getPageMetadata, getConferenceMetadata, renderMetadata } from "../src/seo/metadata.mjs";

const settings = createSettings("https://innovation.example.test", "https://api.example.test");
const conference = {
  _id: "0123456789abcdef01234567", slug: "research-2026", title: "Research & Innovation Symposium", acronym: "RIS 2026",
  description: "Discuss research methods, publication information and academic collaboration.",
  mode: "In Person", location: "Conference Hall", city: "Pune", country: "India",
  startDate: "2026-11-10T00:00:00.000Z", endDate: "2026-11-11T00:00:00.000Z", coverImage: "/uploads/conferences/cover.png",
};

test("each public page has a unique title, description, canonical and schema", () => {
  const titles = new Set();
  const descriptions = new Set();
  for (const pathname of Object.keys(PUBLIC_PAGES)) {
    const meta = getPageMetadata(`${pathname}?utm_source=test`, settings);
    assert.equal(meta.canonical, `${settings.siteUrl}${pathname}`);
    assert.match(meta.robots, /^index,/);
    assert.ok(meta.structuredData.length >= 3);
    assert.ok(meta.description.length > 70);
    titles.add(meta.title); descriptions.add(meta.description);
  }
  assert.equal(titles.size, Object.keys(PUBLIC_PAGES).length);
  assert.equal(descriptions.size, Object.keys(PUBLIC_PAGES).length);
});

test("all admin variants and errors are noindex without public canonical or schema", () => {
  for (const pathname of ["/admin", "/admin/login", "/admin/dashboard", "/admin/conferences", "/admin/conferences/new", "/admin/conferences/123/edit", "/admin/evaluations", "/admin/contact-enquiries", "/missing"]) {
    const meta = getPageMetadata(pathname, settings);
    assert.match(meta.robots, /^noindex/);
    assert.equal(meta.canonical, undefined);
    assert.deepEqual(meta.structuredData, []);
  }
});

test("conference ID aliases use the slug canonical and absolute public image", () => {
  const meta = getConferenceMetadata(conference, settings, { identifier: conference._id });
  assert.equal(meta.canonical, `${settings.siteUrl}/conferences/research-2026`);
  assert.equal(meta.image, "https://api.example.test/uploads/conferences/cover.png");
  assert.match(meta.title, /RIS 2026/);
  assert.equal(meta.structuredData.find((item) => item["@type"] === "Event").startDate, "2026-11-10");
});

test("schema does not invent missing venues, dates, virtual links or ticket offers", () => {
  for (const variant of [{ mode: "Virtual" }, { mode: "Hybrid" }, { city: "" }, { startDate: "invalid" }]) {
    const meta = getConferenceMetadata({ ...conference, ...variant }, settings);
    assert.equal(meta.structuredData.some((item) => item["@type"] === "Event"), false);
  }
  const event = getConferenceMetadata(conference, settings).structuredData.find((item) => item["@type"] === "Event");
  assert.equal(event.offers, undefined);
  assert.equal(event.aggregateRating, undefined);
});

test("a failed lookup is noindex; loading a real conference is not prematurely noindex", () => {
  assert.match(getConferenceMetadata(null, settings, { identifier: "removed", notFound: true }).robots, /^noindex/);
  assert.match(getConferenceMetadata(null, settings, { identifier: "loading", status: "loading" }).robots, /^index/);
});

test("HTML and JSON-LD escape untrusted conference strings", () => {
  const meta = getConferenceMetadata({ ...conference, title: '<script>alert("x")</script>' }, settings);
  const html = renderMetadata(meta);
  assert.ok(html.includes("&lt;script&gt;"));
  assert.ok(!html.includes('<script>alert("x")</script>'));
  assert.ok(html.includes("\\u003cscript>"));
  assert.throws(() => createSettings("https://example.test/subpage"));
  assert.throws(() => createSettings("javascript:alert(1)"));
});
