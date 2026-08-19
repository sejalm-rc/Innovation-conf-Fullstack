import { apiRequest, buildQueryString } from "./api";

export function submitEvaluation(formValues, file) {
  const formData = new FormData();
  Object.entries(formValues).forEach(([key, value]) => {
    formData.append(key, value ?? "");
  });
  if (file) formData.append("document", file);

  return apiRequest("/evaluations", { method: "POST", body: formData });
}

export function adminFetchEvaluations(params = {}, signal) {
  return apiRequest(`/admin/evaluations${buildQueryString(params)}`, { signal });
}

export function adminFetchEvaluation(id, signal) {
  return apiRequest(`/admin/evaluations/${id}`, { signal });
}

export function adminUpdateEvaluationStatus(id, status, adminNotes) {
  return apiRequest(`/admin/evaluations/${id}/status`, {
    method: "PATCH",
    body: { status, ...(adminNotes !== undefined ? { adminNotes } : {}) },
  });
}

export function adminUpdateEvaluation(id, payload) {
  return apiRequest(`/admin/evaluations/${id}`, { method: "PATCH", body: payload });
}

export function adminDeleteEvaluation(id) {
  return apiRequest(`/admin/evaluations/${id}`, { method: "DELETE" });
}
