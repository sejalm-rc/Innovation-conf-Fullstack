import { CalendarCheck2, CalendarRange, ClipboardList, Mail, TrendingUp } from "lucide-react";
import { useFetch } from "../../hooks/useFetch";
import { adminFetchDashboardSummary } from "../../services/dashboardService";
import { LoadingGrid, ErrorState } from "../../components/StatusStates";

const cards = [
  { key: "totalConferences", label: "Total Conferences", icon: TrendingUp, color: "bg-navy-900" },
  { key: "upcomingConferences", label: "Upcoming Conferences", icon: CalendarRange, color: "bg-brandGreen" },
  { key: "previousConferences", label: "Previous Conferences", icon: CalendarCheck2, color: "bg-navy-600" },
  { key: "pendingEvaluations", label: "Pending Evaluations", icon: ClipboardList, color: "bg-amber-500" },
  { key: "newEnquiries", label: "New Contact Enquiries", icon: Mail, color: "bg-sky-600" },
];

export default function Dashboard() {
  const { data, status, retry } = useFetch((signal) => adminFetchDashboardSummary(signal), []);

  return (
    <div>
      <h1 className="text-xl font-bold text-navy-900 sm:text-2xl">Dashboard</h1>
      <p className="mt-1 text-sm text-navy-500">Overview of conferences, evaluations and enquiries.</p>

      {status === "loading" && <LoadingGrid count={5} className="mt-6 sm:grid-cols-2 lg:grid-cols-5" />}

      {status === "error" && (
        <ErrorState className="mt-6" title="Couldn't load dashboard data" onRetry={retry} />
      )}

      {status === "success" && data && (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {cards.map(({ key, label, icon: Icon, color }) => (
            <div key={key} className="rounded-xl border border-navy-100 bg-white p-5 shadow-card">
              <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg text-white ${color}`}>
                <Icon size={19} />
              </div>
              <p className="text-2xl font-bold text-navy-900">{data[key]}</p>
              <p className="mt-1 text-xs text-navy-500">{label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
