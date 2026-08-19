import { useState } from "react";
import { Eye, Search, Trash2, X } from "lucide-react";
import { useFetch } from "../../hooks/useFetch";
import {
  adminFetchEnquiries,
  adminUpdateEnquiryStatus,
  adminUpdateEnquiry,
  adminDeleteEnquiry,
} from "../../services/contactService";
import { LoadingGrid, EmptyState, ErrorState } from "../../components/StatusStates";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import Pagination from "../../components/admin/Pagination";

const STATUS_OPTIONS = ["new", "in-progress", "resolved"];

function DetailsDrawer({ enquiry, onClose, onSaved }) {
  const [notes, setNotes] = useState(enquiry?.adminNotes || "");
  const [statusValue, setStatusValue] = useState(enquiry?.status || "new");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!enquiry) return null;

  const save = async () => {
    setSaving(true);
    try {
      const res = await adminUpdateEnquiry(enquiry._id, { status: statusValue, adminNotes: notes });
      onSaved(res.data);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />
      <div role="dialog" aria-modal="true" className="relative h-full w-full max-w-md overflow-y-auto bg-white p-6 shadow-2xl">
        <button type="button" onClick={onClose} aria-label="Close" className="absolute right-4 top-4 text-navy-400 hover:text-navy-800">
          <X size={20} />
        </button>

        <h2 className="pr-8 text-lg font-bold text-navy-900">{enquiry.subject}</h2>
        <p className="text-sm text-navy-500">{enquiry.enquiryType}</p>

        <dl className="mt-5 space-y-3 text-sm">
          {[
            ["Name", enquiry.name],
            ["Email", enquiry.email],
            ["Phone", enquiry.phone || "—"],
            ["Submitted", new Date(enquiry.submittedAt).toLocaleString()],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between gap-4 border-b border-navy-50 pb-2">
              <dt className="text-navy-500">{label}</dt>
              <dd className="text-right font-medium text-navy-900">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-4">
          <p className="mb-1 text-sm font-medium text-navy-800">Message</p>
          <p className="whitespace-pre-line text-sm text-navy-600">{enquiry.message}</p>
        </div>

        <div className="mt-5">
          <label className="mb-1.5 block text-sm font-medium text-navy-800">Status</label>
          <select value={statusValue} onChange={(e) => setStatusValue(e.target.value)} className="form-input">
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
            placeholder="Internal notes about this enquiry..."
          />
        </div>

        <button type="button" onClick={save} disabled={saving} className="btn-primary mt-4 w-full text-sm disabled:opacity-60">
          {saved ? "Saved!" : saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

export default function ContactEnquiriesList() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { data, meta, status, retry } = useFetch(
    (signal) => adminFetchEnquiries({ search, status: statusFilter, page, limit: 10 }, signal),
    [search, statusFilter, page]
  );

  const items = data || [];

  const quickStatus = async (id, newStatus) => {
    await adminUpdateEnquiryStatus(id, newStatus);
    retry();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await adminDeleteEnquiry(deleteTarget._id);
      setDeleteTarget(null);
      retry();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-navy-900 sm:text-2xl">Contact Enquiries</h1>
      <p className="mt-1 text-sm text-navy-500">Messages submitted through the public Contact Us form.</p>

      <div className="mt-5 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by name, email, subject..."
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
          <EmptyState className="m-4" title="No enquiries yet" message="Contact form submissions will appear here." />
        )}

        {status === "success" && items.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-sm">
              <thead>
                <tr className="bg-navy-50 text-left text-navy-700">
                  <th className="px-4 py-3 font-semibold">Sr.</th>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 font-semibold">Phone</th>
                  <th className="px-4 py-3 font-semibold">Type</th>
                  <th className="px-4 py-3 font-semibold">Subject</th>
                  <th className="px-4 py-3 font-semibold">Message</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Submitted</th>
                  <th className="px-4 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((row, i) => (
                  <tr key={row._id} className="border-t border-navy-50">
                    <td className="px-4 py-3 text-navy-500">{(meta?.page - 1) * meta?.limit + i + 1 || i + 1}</td>
                    <td className="px-4 py-3 whitespace-nowrap font-medium text-navy-900">{row.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-navy-600">{row.email}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-navy-600">{row.phone || "—"}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-navy-600">{row.enquiryType}</td>
                    <td className="px-4 py-3 max-w-[160px] text-navy-700"><span className="line-clamp-2">{row.subject}</span></td>
                    <td className="px-4 py-3 max-w-[220px] text-navy-500"><span className="line-clamp-2">{row.message}</span></td>
                    <td className="px-4 py-3">
                      <select
                        value={row.status}
                        onChange={(e) => quickStatus(row._id, e.target.value)}
                        className="rounded-md border border-navy-200 bg-white px-2 py-1 text-xs"
                        aria-label={`Update status for ${row.name}`}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s.replace("-", " ")}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-navy-500">
                      {new Date(row.submittedAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSelected(row)}
                          aria-label="View full message"
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
          enquiry={selected}
          onClose={() => setSelected(null)}
          onSaved={() => {
            setSelected(null);
            retry();
          }}
        />
      )}

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete this enquiry?"
        message="This will permanently remove the contact enquiry."
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
