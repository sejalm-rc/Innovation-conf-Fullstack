import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, pages, total, onPageChange }) {
  if (!pages || pages <= 1) return null;

  return (
    <div className="flex items-center justify-between gap-3 border-t border-navy-100 px-4 py-3 text-sm">
      <span className="text-navy-500">
        Page {page} of {pages} &middot; {total} total
      </span>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
          className="flex h-8 w-8 items-center justify-center rounded-md border border-navy-200 text-navy-700 disabled:opacity-40"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= pages}
          aria-label="Next page"
          className="flex h-8 w-8 items-center justify-center rounded-md border border-navy-200 text-navy-700 disabled:opacity-40"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
