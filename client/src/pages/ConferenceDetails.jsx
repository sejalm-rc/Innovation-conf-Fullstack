import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CalendarDays,
  MapPin,
  Building2,
  Mail,
  Phone,
  FileText,
  ClipboardList,
  BadgeCheck,
  BookOpenCheck,
  ArrowLeft,
  ArrowRight,
  Send,
  Tag,
  SearchX,
} from "lucide-react";
import Breadcrumb from "../components/Breadcrumb";
import ScopusTable from "../components/ScopusTable";
import { ErrorState } from "../components/StatusStates";
import { useFetch } from "../hooks/useFetch";
import { fetchConferenceByIdentifier, fetchConferences } from "../services/conferenceService";
import { resolveUploadUrl } from "../services/api";
import fallbackCover from "../assets/img/conference-indore-cover.webp";

function DetailsSkeleton() {
  return (
    <div className="container-page py-10 animate-pulse" aria-busy="true" aria-label="Loading conference details">
      <div className="h-56 sm:h-72 md:h-96 rounded-2xl bg-navy-100 mb-10" />
      <div className="grid lg:grid-cols-[1fr_340px] gap-10">
        <div className="space-y-4">
          <div className="h-5 w-1/3 bg-navy-100 rounded" />
          <div className="h-4 w-full bg-navy-100 rounded" />
          <div className="h-4 w-5/6 bg-navy-100 rounded" />
          <div className="h-4 w-2/3 bg-navy-100 rounded" />
        </div>
        <div className="h-64 bg-navy-100 rounded-xl" />
      </div>
    </div>
  );
}

function NotFoundState() {
  return (
    <div className="container-page py-20 text-center">
      <SearchX size={44} className="mx-auto text-navy-300 mb-4" />
      <h1 className="text-2xl font-bold text-navy-900 mb-2">Conference not found</h1>
      <p className="text-navy-500 mb-6 max-w-md mx-auto">
        The conference you're looking for doesn't exist, may have been removed, or the link may be incorrect.
      </p>
      <Link to="/conferences" className="btn-primary inline-flex">
        <ArrowLeft size={16} /> Back to All Conferences
      </Link>
    </div>
  );
}

export default function ConferenceDetails() {
  const { id } = useParams();

  const {
    data: conference,
    status,
    error,
    retry,
  } = useFetch((signal) => fetchConferenceByIdentifier(id, signal), [id]);

  const [otherConferences, setOtherConferences] = useState([]);

  useEffect(() => {
    if (conference) {
      document.title = `${conference.title} (${conference.acronym}) | Innovation Conference`;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", (conference.description || "").slice(0, 155));
    }
  }, [conference]);

  useEffect(() => {
    let cancelled = false;
    if (!conference) return undefined;

    fetchConferences({ limit: 4 })
      .then((res) => {
        if (cancelled) return;
        setOtherConferences((res.data || []).filter((c) => c._id !== conference._id).slice(0, 3));
      })
      .catch(() => {
        if (!cancelled) setOtherConferences([]);
      });

    return () => {
      cancelled = true;
    };
  }, [conference]);

  if (status === "loading") return <DetailsSkeleton />;

  if (status === "error") {
    if (error?.status === 404) return <NotFoundState />;
    return (
      <div className="container-page py-20">
        <ErrorState
          title="Couldn't load this conference"
          message="Please check your connection and try again."
          onRetry={retry}
        />
      </div>
    );
  }

  if (!conference) return <NotFoundState />;

  const coverSrc = resolveUploadUrl(conference.coverImage, fallbackCover);
  const importantDates = conference.importantDates || [];
  const scopusPublications = conference.scopusPublications || [];

  return (
    <div>
      <div className="container-page pt-6">
        <Breadcrumb items={[{ label: "Conferences", to: "/conferences" }, { label: conference.acronym }]} />
      </div>

      {/* Cover image */}
      <section className="container-page pt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl overflow-hidden h-56 sm:h-72 md:h-96"
        >
          <img
            src={coverSrc}
            alt={`${conference.acronym} cover`}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = fallbackCover;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
            {conference.status === "previous" && (
              <span className="badge-pill bg-navy-900 text-white mb-3">Completed</span>
            )}
            <p className="text-brandGreen font-semibold text-sm uppercase tracking-wide mb-1">
              {conference.acronym}
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight max-w-3xl">
              {conference.title}
            </h1>
            {conference.theme && <p className="text-navy-100 text-sm mt-2 italic">Theme: {conference.theme}</p>}
          </div>
        </motion.div>
      </section>

      <section className="container-page py-10 grid lg:grid-cols-[1fr_340px] gap-10">
        <div>
          {/* Quick info bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="grid sm:grid-cols-3 gap-4 mb-10"
          >
            <div className="flex items-center gap-3 bg-navy-50 rounded-lg p-4">
              <CalendarDays className="text-brandGreen shrink-0" size={22} />
              <div>
                <p className="text-xs text-navy-500">Conference Dates</p>
                <p className="text-sm font-semibold text-navy-900">{conference.dateRange}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-navy-50 rounded-lg p-4">
              <MapPin className="text-brandGreen shrink-0" size={22} />
              <div>
                <p className="text-xs text-navy-500">Location</p>
                <p className="text-sm font-semibold text-navy-900">
                  {conference.mode} &middot; {conference.location}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-navy-50 rounded-lg p-4">
              <Building2 className="text-brandGreen shrink-0" size={22} />
              <div>
                <p className="text-xs text-navy-500">Organizer</p>
                <p className="text-sm font-semibold text-navy-900">{conference.organizer}</p>
              </div>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-10"
          >
            <h2 className="text-xl font-bold text-navy-900 mb-2">About the Conference</h2>
            <span className="section-title-underline mb-4" />
            <p className="text-navy-600 text-[15px] leading-relaxed mt-4">{conference.description}</p>
          </motion.div>

          {/* Important dates */}
          {importantDates.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mb-10"
            >
              <h2 className="text-xl font-bold text-navy-900 mb-4 flex items-center gap-2">
                <ClipboardList className="text-brandGreen" size={20} /> Important Dates
              </h2>
              <div className="border border-navy-100 rounded-xl divide-y divide-navy-50 overflow-hidden">
                {importantDates.map((d, i) => (
                  <div
                    key={`${d.label}-${i}`}
                    className="flex items-center justify-between px-5 py-3.5 bg-white even:bg-navy-50/40"
                  >
                    <span className="text-sm text-navy-700">{d.label}</span>
                    <span className="text-sm font-semibold text-navy-900">{d.date}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Submission / Registration / Publication */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="grid sm:grid-cols-1 gap-6 mb-10"
          >
            {conference.submissionInfo && (
              <div className="border border-navy-100 rounded-xl p-6">
                <h3 className="font-bold text-navy-900 mb-2 flex items-center gap-2">
                  <FileText className="text-brandGreen" size={18} /> Submission Information
                </h3>
                <p className="text-sm text-navy-600 leading-relaxed">{conference.submissionInfo}</p>
              </div>
            )}
            {conference.registrationInfo && (
              <div className="border border-navy-100 rounded-xl p-6">
                <h3 className="font-bold text-navy-900 mb-2 flex items-center gap-2">
                  <BadgeCheck className="text-brandGreen" size={18} /> Registration Information
                </h3>
                <p className="text-sm text-navy-600 leading-relaxed">{conference.registrationInfo}</p>
              </div>
            )}
            {conference.publicationInfo && (
              <div className="border border-navy-100 rounded-xl p-6">
                <h3 className="font-bold text-navy-900 mb-2 flex items-center gap-2">
                  <BookOpenCheck className="text-brandGreen" size={18} /> Publication Information
                </h3>
                <p className="text-sm text-navy-600 leading-relaxed">{conference.publicationInfo}</p>
              </div>
            )}
          </motion.div>

          {/* Scopus indexing table - mandatory */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            id="scopus-indexing"
          >
            <h2 className="text-xl font-bold text-navy-900 mb-1">Scopus Indexing / Publication Information</h2>
            <p className="text-sm text-navy-500 mb-4">
              Papers accepted at {conference.acronym} are published through the following Scopus indexed
              proceedings.
            </p>
            <ScopusTable rows={scopusPublications} caption={`Scopus indexing for ${conference.acronym}`} />
          </motion.div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 h-fit lg:sticky lg:top-28">
          <div className="border border-navy-100 rounded-xl p-6 bg-navy-50">
            <h3 className="font-bold text-navy-900 mb-4">Contact Information</h3>
            <ul className="space-y-3 text-sm">
              {conference.contactEmail && (
                <li className="flex items-center gap-2.5 text-navy-700">
                  <Mail size={16} className="text-brandGreen shrink-0" />
                  <a href={`mailto:${conference.contactEmail}`} className="hover:text-brandGreen break-all">
                    {conference.contactEmail}
                  </a>
                </li>
              )}
              {conference.contactPhone && (
                <li className="flex items-center gap-2.5 text-navy-700">
                  <Phone size={16} className="text-brandGreen shrink-0" />
                  <span>{conference.contactPhone}</span>
                </li>
              )}
              <li className="flex items-center gap-2.5 text-navy-700">
                <Tag size={16} className="text-brandGreen shrink-0" />
                <span>{conference.mode}</span>
              </li>
            </ul>
            <Link to="/associate-conference" className="btn-primary w-full mt-5 text-sm">
              Submit Your Paper <Send size={15} />
            </Link>
          </div>

          {otherConferences.length > 0 && (
            <div className="border border-navy-100 rounded-xl p-6">
              <h3 className="font-bold text-navy-900 mb-4">Other Conferences</h3>
              <ul className="space-y-4">
                {otherConferences.map((c) => (
                  <li key={c._id}>
                    <Link to={`/conferences/${c.slug || c._id}`} className="group flex gap-3 items-center">
                      <img
                        src={resolveUploadUrl(c.coverImage, fallbackCover)}
                        alt={`${c.acronym} cover`}
                        className="w-14 h-14 rounded-lg object-cover shrink-0"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = fallbackCover;
                        }}
                      />
                      <div>
                        <p className="text-sm font-semibold text-navy-900 group-hover:text-brandGreen leading-snug line-clamp-2">
                          {c.acronym}
                        </p>
                        <p className="text-xs text-navy-500">{c.location}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                to="/conferences"
                className="text-brandGreen font-semibold text-sm flex items-center gap-1 hover:underline mt-4"
              >
                View All Conferences <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </aside>
      </section>

      <section className="container-page pb-16">
        <Link to="/conferences" className="inline-flex items-center gap-2 text-navy-700 hover:text-brandGreen text-sm font-medium">
          <ArrowLeft size={16} /> Back to All Conferences
        </Link>
      </section>
    </div>
  );
}
