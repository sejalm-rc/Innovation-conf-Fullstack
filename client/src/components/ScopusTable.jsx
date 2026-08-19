import { BookOpen } from "lucide-react";

export default function ScopusTable({ rows, caption = "Scopus Indexed Proceedings / Journals" }) {
  return (
    <div className="bg-white border border-navy-100 rounded-xl shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm" role="table">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="bg-navy-50 text-navy-800 text-left">
              <th scope="col" className="px-4 py-3.5 font-semibold whitespace-nowrap">
                Proceedings / Journal
              </th>
              <th scope="col" className="px-4 py-3.5 font-semibold whitespace-nowrap">
                Publisher / Partner
              </th>
              <th scope="col" className="px-4 py-3.5 font-semibold whitespace-nowrap">
                Indexed In
              </th>
              <th scope="col" className="px-4 py-3.5 font-semibold whitespace-nowrap">
                ISSN
              </th>
              <th scope="col" className="px-4 py-3.5 font-semibold whitespace-nowrap">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-navy-500">
                  No Scopus indexed proceedings have been added for this conference yet.
                </td>
              </tr>
            )}
            {rows.map((row, i) => (
              <tr
                key={row._id || row.issn || `${row.title}-${i}`}
                className={`border-t border-navy-50 ${i % 2 === 1 ? "bg-navy-50/40" : ""}`}
              >
                <td className="px-4 py-4 align-top">
                  <div className="flex items-start gap-2.5">
                    <span className="mt-0.5 w-7 h-7 rounded bg-navy-900 text-white flex items-center justify-center shrink-0">
                      <BookOpen size={14} />
                    </span>
                    <div>
                      <p className="font-semibold text-navy-900 leading-snug">{row.title}</p>
                      {row.subtitle && <p className="text-xs text-navy-500 mt-0.5">{row.subtitle}</p>}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 align-top text-navy-700 whitespace-nowrap">{row.publisher}</td>
                <td className="px-4 py-4 align-top">
                  <span className="font-semibold text-amber-600">{row.indexedIn}</span>
                </td>
                <td className="px-4 py-4 align-top text-navy-700 whitespace-nowrap">ISSN: {row.issn}</td>
                <td className="px-4 py-4 align-top">
                  <span className="badge-pill bg-brandGreen-50 text-brandGreen-700">
                    {row.publicationStatus || "Indexed"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
