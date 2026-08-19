import { useState } from "react";
import { Download, ExternalLink, Eye, Search, Trash2, X } from "lucide-react";
import { useFetch } from "../../hooks/useFetch";
import {
  adminFetchEvaluations,
  adminUpdateEvaluationStatus,
  adminDeleteEvaluation,
} from "../../services/evaluationService";
import { resolveUploadUrl } from "../../services/api";
import { LoadingGrid, EmptyState, ErrorState } from "../../components/StatusStates";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import Pagination from "../../components/admin/Pagination";
import StatusBadge from "../../components/admin/StatusBadge";

const STATUS_OPTIONS = ["pending", "under-review", "approved", "rejected"];

function DetailsDrawer({ evaluation, onClose, onStatusChange, savingStatus }) {
  const [notes, setNotes] = useState(evaluation?.adminNotes || "");
  const [notesSaved, setNotesSaved] = useState(false);

  if (!evaluation) return null;

  const saveNotes = async () => {
    await onStatusChange(evaluation.status, notes);
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />
      <div role="dialog" aria-modal="true" className="relative h-full w-full max-w-md overflow-y-auto bg-white p-6 shadow-2xl">
        <button type="button" onClick={onClose} aria-label="Close" className="absolute right-4 top-4 text-navy-400 hover:text-navy-800">
          <X size={20} />
        </button>

        <h2 className="pr-8 text-lg font-bold text-navy-900">{evaluation.title}</h2>
        <p className="text-sm text-navy-500">{evaluation.acronym}</p>

        <dl className="mt-5 space-y-3 text-sm">
          {[
            ["Organizer", evaluation.organizer],
            ["Contact Person", evaluation.contactPerson],
            ["Email", evaluation.email],
            ["Phone", evaluation.phone],
            ["Country", evaluation.country],
            ["Dates", evaluation.dates],
            ["Venue / Mode", evaluation.venueMode],
            ["Publication Plan", evaluation.publicationPlan],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between gap-4 border-b border-navy-50 pb-2">
              <dt className="text-navy-500">{label}</dt>
              <dd className="text-right font-medium text-navy-900">{value || "—"}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-4">
          <p className="mb-1 text-sm font-medium text-navy-800">Scope</p>
          <p className="text-sm text-navy-600">{evaluation.scope}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          {evaluation.website && (
            <a href={evaluation.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brandGreen hover:underline">
              <ExternalLink size={15} /> Open Website
            </a>
          )}
          {evaluation.proposalFile?.url && (
            <a
              href={resolveUploadUrl(evaluation.proposalFile.url)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 hover:underline"
            >
              <Download size={15} /> Download Proposal
            </a>
          )}
        </div>

        <div className="mt-5">
          <label className="mb-1.5 block text-sm font-medium text-navy-800">Status</label>
          <select
            value={evaluation.status}
            onChange={(e) => onStatusChange(e.target.value, notes)}
            disabled={savingStatus}
            className="form-input"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s.replace("-", " ")}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4">
          <label className="mb-1.5 block text-sm font-medium text-navy-800">Admin Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="form-input resize-none"
            placeholder="Internal notes about this evaluation..."
          />
          <button
            type="button"
            onClick={saveNotes}
            disabled={savingStatus}
            className="btn-secondary mt-2 text-sm disabled:opacity-60"
          >
            {notesSaved ? "Saved!" : "Save Notes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function EvaluationsList() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [savingStatus, setSavingStatus] = useState(false);

  const { data, meta, status, retry } = useFetch(
    (signal) => adminFetchEvaluations({ search, status: statusFilter, page, limit: 10 }, signal),
    [search, statusFilter, page]
  );

  const items = data || [];

  const handleStatusChange = async (newStatus, notes) => {
    if (!selected) return;
    setSavingStatus(true);
    try {
      const res = await adminUpdateEvaluationStatus(selected._id, newStatus, notes);
      setSelected(res.data);
      retry();
    } catch {
      // surfaced implicitly by leaving the previous state visible
    } finally {
      setSavingStatus(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await adminDeleteEvaluation(deleteTarget._id);
      setDeleteTarget(null);
      retry();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-navy-900 sm:text-2xl">Conference Evaluations</h1>
      <p className="mt-1 text-sm text-navy-500">Review conferences submitted for evaluation via Associate Us.</p>

      <div className="mt-5 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by title, acronym, organizer, email..."
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
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s.replace("-", " ")}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-navy-100 bg-white shadow-card">
        {status === "loading" && <LoadingGrid count={4} className="p-4 sm:grid-cols-2 lg:grid-cols-4" />}
        {status === "error" && <ErrorState className="m-4" onRetry={retry} />}
        {status === "success" && items.length === 0 && (
          <EmptyState className="m-4" title="No evaluations yet" message="Submitted conferences will appear here." />
        )}

        {status === "success" && items.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-sm">
              <thead>
                <tr className="bg-navy-50 text-left text-navy-700">
                  <th className="px-4 py-3 font-semibold">Sr.</th>
                  <th className="px-4 py-3 font-semibold">Title</th>
                  <th className="px-4 py-3 font-semibold">Acronym</th>
                  <th className="px-4 py-3 font-semibold">Organizer</th>
                  <th className="px-4 py-3 font-semibold">Contact</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 font-semibold">Country</th>
                  <th className="px-4 py-3 font-semibold">Submitted</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((row, i) => (
                  <tr key={row._id} className="border-t border-navy-50">
                    <td className="px-4 py-3 text-navy-500">{(meta?.page - 1) * meta?.limit + i + 1 || i + 1}</td>
                    <td className="px-4 py-3 max-w-[200px] text-navy-800"><span className="line-clamp-2">{row.title}</span></td>
                    <td className="px-4 py-3 whitespace-nowrap text-navy-700">{row.acronym}</td>
                    <td className="px-4 py-3 max-w-[160px] text-navy-700"><span className="line-clamp-2">{row.organizer}</span></td>
                    <td className="px-4 py-3 whitespace-nowrap text-navy-700">{row.contactPerson}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-navy-600">{row.email}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-navy-600">{row.country}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-navy-500">
                      {new Date(row.submittedAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={row.status} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSelected(row)}
                          aria-label="View details"
                          className="rounded-md p-2 text-navy-500 hover:bg-navy-50 hover:text-navy-800"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(row)}
                          aria-label="Delete"
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

        {meta && <Pagination page={meta.page} pages={meta.pages} total={meta.total} onPageChange={setPage} />}
      </div>

      {selected && (
        <DetailsDrawer
          evaluation={selected}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
          savingStatus={savingStatus}
        />
      )}

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete this evaluation?"
        message="This will permanently remove the submitted evaluation and any uploaded proposal file."
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
