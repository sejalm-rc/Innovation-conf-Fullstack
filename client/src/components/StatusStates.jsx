import { AlertTriangle, Inbox, RefreshCcw } from "lucide-react";

export function LoadingGrid({ count = 3, className = "" }) {
  return (
    <div className={`grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse overflow-hidden rounded-xl border border-navy-100 bg-white"
          aria-hidden="true"
        >
          <div className="h-40 bg-navy-100" />
          <div className="space-y-2 p-4">
            <div className="h-3 w-2/3 rounded bg-navy-100" />
            <div className="h-3 w-full rounded bg-navy-100" />
            <div className="h-3 w-1/2 rounded bg-navy-100" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function EmptyState({ title = "Nothing to show yet", message = "", className = "" }) {
  return (
    <div
      role="status"
      className={`flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-navy-200 bg-navy-50/50 px-6 py-14 text-center ${className}`}
    >
      <Inbox size={32} className="text-navy-400" />
      <p className="font-semibold text-navy-800">{title}</p>
      {message && <p className="max-w-sm text-sm text-navy-500">{message}</p>}
    </div>
  );
}

export function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load this content. Please try again.",
  onRetry,
  className = "",
}) {
  return (
    <div
      role="alert"
      className={`flex flex-col items-center justify-center gap-3 rounded-xl border border-red-200 bg-red-50 px-6 py-14 text-center ${className}`}
    >
      <AlertTriangle size={32} className="text-red-500" />
      <p className="font-semibold text-red-700">{title}</p>
      <p className="max-w-sm text-sm text-red-600">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 inline-flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          <RefreshCcw size={15} /> Retry
        </button>
      )}
    </div>
  );
}
