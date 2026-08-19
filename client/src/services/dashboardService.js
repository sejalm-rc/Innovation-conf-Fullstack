import { apiRequest } from "./api";

export function adminFetchDashboardSummary(signal) {
  return apiRequest("/admin/dashboard/summary", { signal });
}
