import { apiRequest, buildQueryString } from "./api";

// ---------------- Public ----------------

export function fetchConferences(params = {}, signal) {
  return apiRequest(`/conferences${buildQueryString(params)}`, { signal });
}

export function fetchUpcomingConferences(signal) {
  return apiRequest("/conferences/upcoming", { signal });
}

export function fetchPreviousConferences(signal) {
  return apiRequest("/conferences/previous", { signal });
}

export function fetchConferenceByIdentifier(identifier, signal) {
  return apiRequest(`/conferences/${encodeURIComponent(identifier)}`, { signal });
}

// ---------------- Admin ----------------

export function adminFetchConferences(params = {}, signal) {
  return apiRequest(`/admin/conferences${buildQueryString(params)}`, { signal });
}

export function adminFetchConference(id, signal) {
  return apiRequest(`/admin/conferences/${id}`, { signal });
}

function toFormData(payload) {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (key === "coverImageFile" && value instanceof File) {
      formData.append("coverImage", value);
      return;
    }

    if (key === "importantDates" || key === "scopusPublications") {
      formData.append(key, JSON.stringify(value || []));
      return;
    }

    formData.append(key, value);
  });

  return formData;
}

export function adminCreateConference(payload) {
  return apiRequest("/admin/conferences", { method: "POST", body: toFormData(payload) });
}

export function adminUpdateConference(id, payload) {
  return apiRequest(`/admin/conferences/${id}`, { method: "PUT", body: toFormData(payload) });
}

export function adminDeleteConference(id) {
  return apiRequest(`/admin/conferences/${id}`, { method: "DELETE" });
}
