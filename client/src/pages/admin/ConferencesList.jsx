import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useFetch } from "../../hooks/useFetch";
import { adminFetchConferences, adminDeleteConference } from "../../services/conferenceService";
import { resolveUploadUrl } from "../../services/api";
import { LoadingGrid, EmptyState, ErrorState } from "../../components/StatusStates";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import Pagination from "../../components/admin/Pagination";
import StatusBadge from "../../components/admin/StatusBadge";
import fallbackCover from "../../assets/img/j1.png";

export default function ConferencesList() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const { data, meta, status, retry } = useFetch(
    (signal) =>
      adminFetchConferences({ search, status: statusFilter, page, limit: 10 }, signal),
    [search, statusFilter, page]
  );

  const items = data || [];

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    setDeleteError("");
    try {
      await adminDeleteConference(deleteTarget._id);
      setDeleteTarget(null);
      retry();
    } catch (error) {
      setDeleteError(error.message || "Could not delete this conference.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-navy-900 sm:text-2xl">Conferences</h1>
          <p className="mt-1 text-sm text-navy-500">Create and manage conference listings.</p>
        </div>
        <Link to="/admin/conferences/new" className="btn-primary text-sm">
          <Plus size={16} /> Add Conference
        </Link>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by title, acronym, city, country..."
            className="form-input pl-9"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="form-input w-auto"
        >
          <option value="">All statuses</option>
          <option value="upcoming">Upcoming</option>
          <option value="previous">Previous</option>
        </select>
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-navy-100 bg-white shadow-card">
        {status === "loading" && <LoadingGrid count={4} className="p-4 sm:grid-cols-2 lg:grid-cols-4" />}

        {status === "error" && <ErrorState className="m-4" onRetry={retry} />}

        {status === "success" && items.length === 0 && (
          <EmptyState className="m-4" title="No conferences found" message="Try adjusting your search or filters." />
        )}

        {status === "success" && items.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-sm">
              <thead>
                <tr className="bg-navy-50 text-left text-navy-700">
                  <th scope="col" className="px-4 py-3 font-semibold">Cover</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Acronym</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Title</th>
                  <th scope="col" className="px-4 py-3 font-semibold whitespace-nowrap">Dates</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Location</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Mode</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Status</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Active</th>
                  <th scope="col" className="px-4 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((c) => (
                  <tr key={c._id} className="border-t border-navy-50">
                    <td className="px-4 py-3">
                      <img
                        src={resolveUploadUrl(c.coverImage, fallbackCover)}
                        alt=""
                        className="h-10 w-14 rounded object-cover"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = fallbackCover;
                        }}
                      />
                    </td>
                    <td className="px-4 py-3 font-semibold text-navy-900 whitespace-nowrap">{c.acronym}</td>
                    <td className="px-4 py-3 max-w-[240px] text-navy-700">
                      <span className="line-clamp-2">{c.title}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-navy-600">{c.dateRange || c.dateLabel}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-navy-600">
                      {c.city}
                      {c.country ? `, ${c.country}` : ""}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-navy-600">{c.mode}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={c.status} />
                    </td>
                    <td className="px-4 py-3">
                      <span className={`badge-pill font-semibold ${c.active ? "bg-brandGreen-50 text-brandGreen-700" : "bg-navy-100 text-navy-500"}`}>
                        {c.active ? "Active" : "Hidden"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={`/conferences/${c.slug || c._id}`}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`View ${c.acronym} on the public site`}
                          className="rounded-md p-2 text-navy-500 hover:bg-navy-50 hover:text-navy-800"
                        >
                          <Eye size={16} />
                        </a>
                        <Link
                          to={`/admin/conferences/${c._id}/edit`}
                          aria-label={`Edit ${c.acronym}`}
                          className="rounded-md p-2 text-navy-500 hover:bg-navy-50 hover:text-navy-800"
                        >
                          <Pencil size={16} />
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            setDeleteError("");
                            setDeleteTarget(c);
                          }}
                          aria-label={`Delete ${c.acronym}`}
                          className="rounded-md p-2 text-red-500 hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {meta && (
          <Pagination page={meta.page} pages={meta.pages} total={meta.total} onPageChange={setPage} />
        )}
      </div>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title={`Delete ${deleteTarget?.acronym || "this conference"}?`}
        message={deleteError || "This will permanently remove the conference and its cover image. This action cannot be undone."}
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
