const STYLES = {
  pending: "bg-amber-50 text-amber-700",
  "under-review": "bg-sky-50 text-sky-700",
  approved: "bg-brandGreen-50 text-brandGreen-700",
  rejected: "bg-red-50 text-red-700",
  new: "bg-sky-50 text-sky-700",
  "in-progress": "bg-amber-50 text-amber-700",
  resolved: "bg-brandGreen-50 text-brandGreen-700",
  upcoming: "bg-brandGreen-50 text-brandGreen-700",
  previous: "bg-navy-100 text-navy-700",
};

const LABELS = {
  "under-review": "Under Review",
  "in-progress": "In Progress",
};

export default function StatusBadge({ status }) {
  const style = STYLES[status] || "bg-navy-100 text-navy-700";
  const label = LABELS[status] || (status ? status[0].toUpperCase() + status.slice(1) : "Unknown");

  return <span className={`badge-pill font-semibold ${style}`}>{label}</span>;
}
