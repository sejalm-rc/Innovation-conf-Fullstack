const RAW_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const RAW_SERVER_URL = import.meta.env.VITE_SERVER_URL;

if (!RAW_API_BASE_URL) {
  // Fail loudly instead of silently falling back to a hardcoded URL.
  // eslint-disable-next-line no-console
  console.error(
    "[config] VITE_API_BASE_URL is not set. Create client/.env from client/.env.example."
  );
}

export const API_BASE_URL = RAW_API_BASE_URL || "http://localhost:5000/api";
export const SERVER_URL = RAW_SERVER_URL || "https://innovation-conference-api.onrender.com/";

/**
 * Resolves an uploaded file's stored relative path (e.g. "/uploads/conferences/x.jpg")
 * into an absolute URL the browser can load. Falls back to a placeholder when empty.
 */
export function resolveUploadUrl(relativePath, fallback = "") {
  if (!relativePath) return fallback;
  if (/^https?:\/\//i.test(relativePath)) return relativePath;
  return `${SERVER_URL}${relativePath.startsWith("/") ? "" : "/"}${relativePath}`;
}

export class ApiError extends Error {
  constructor(message, { status, errors = [] } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

async function parseResponse(response) {
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    if (!response.ok) {
      throw new ApiError(`Request failed with status ${response.status}`, {
        status: response.status,
      });
    }
    return null;
  }

  const body = await response.json();

  if (!response.ok || body.success === false) {
    throw new ApiError(body.message || "Something went wrong. Please try again.", {
      status: response.status,
      errors: body.errors || [],
    });
  }

  return body;
}

/**
 * Thin fetch wrapper: always sends/receives JSON (unless FormData is passed),
 * always includes credentials (for the httpOnly auth cookie), and normalizes
 * errors into ApiError so callers can show a friendly message.
 */
export async function apiRequest(path, { method = "GET", body, headers = {}, signal } = {}) {
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    credentials: "include",
    headers: isFormData
      ? headers
      : { "Content-Type": "application/json", ...headers },
    body: body === undefined ? undefined : isFormData ? body : JSON.stringify(body),
    signal,
  });

  return parseResponse(response);
}

export function buildQueryString(params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.set(key, value);
    }
  });
  const str = query.toString();
  return str ? `?${str}` : "";
}
