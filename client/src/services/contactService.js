import { apiRequest, buildQueryString } from "./api";

export function submitContactEnquiry(payload) {
  return apiRequest("/contact-enquiries", { method: "POST", body: payload });
}

export function adminFetchEnquiries(params = {}, signal) {
  return apiRequest(`/admin/contact-enquiries${buildQueryString(params)}`, { signal });
}

export function adminFetchEnquiry(id, signal) {
  return apiRequest(`/admin/contact-enquiries/${id}`, { signal });
}

export function adminUpdateEnquiryStatus(id, status) {
  return apiRequest(`/admin/contact-enquiries/${id}/status`, { method: "PATCH", body: { status } });
}

export function adminUpdateEnquiry(id, payload) {
  return apiRequest(`/admin/contact-enquiries/${id}`, { method: "PATCH", body: payload });
}

export function adminDeleteEnquiry(id) {
  return apiRequest(`/admin/contact-enquiries/${id}`, { method: "DELETE" });
}
