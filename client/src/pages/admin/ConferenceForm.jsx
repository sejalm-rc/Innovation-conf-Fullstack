import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AlertCircle, ArrowLeft, CheckCircle2, ImagePlus, Loader2, Plus, Trash2 } from "lucide-react";
import {
  adminCreateConference,
  adminFetchConference,
  adminUpdateConference,
} from "../../services/conferenceService";
import { resolveUploadUrl, ApiError } from "../../services/api";
import fallbackCover from "../../assets/img/j1.png";

const emptyForm = {
  title: "",
  acronym: "",
  theme: "",
  description: "",
  mode: "In Person",
  status: "",
  startDate: "",
  endDate: "",
  dateLabel: "",
  dateRange: "",
  city: "",
  country: "",
  location: "",
  organizer: "",
  submissionInfo: "",
  registrationInfo: "",
  publicationInfo: "",
  contactEmail: "",
  contactPhone: "",
  featured: false,
  active: true,
};

function toDateInputValue(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

function Field({ label, required, error, children, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-medium text-navy-800">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}

export default function ConferenceForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [importantDates, setImportantDates] = useState([]);
  const [scopusPublications, setScopusPublications] = useState([]);
  const [coverPreview, setCoverPreview] = useState("");
  const [coverFile, setCoverFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [loadingExisting, setLoadingExisting] = useState(isEdit);
  const [loadError, setLoadError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!isEdit) return;

    let cancelled = false;
    setLoadingExisting(true);
    setLoadError("");

    adminFetchConference(id)
      .then((res) => {
        if (cancelled) return;
        const c = res.data;
        setForm({
          title: c.title || "",
          acronym: c.acronym || "",
          theme: c.theme || "",
          description: c.description || "",
          mode: c.mode || "In Person",
          status: c.statusOverride ? c.status : "",
          startDate: toDateInputValue(c.startDate),
          endDate: toDateInputValue(c.endDate),
          dateLabel: c.dateLabel || "",
          dateRange: c.dateRange || "",
          city: c.city || "",
          country: c.country || "",
          location: c.location || "",
          organizer: c.organizer || "",
          submissionInfo: c.submissionInfo || "",
          registrationInfo: c.registrationInfo || "",
          publicationInfo: c.publicationInfo || "",
          contactEmail: c.contactEmail || "",
          contactPhone: c.contactPhone || "",
          featured: Boolean(c.featured),
          active: c.active !== false,
        });
        setImportantDates(c.importantDates || []);
        setScopusPublications(c.scopusPublications || []);
        setCoverPreview(resolveUploadUrl(c.coverImage, ""));
      })
      .catch((error) => {
        if (!cancelled) setLoadError(error.message || "Could not load this conference.");
      })
      .finally(() => {
        if (!cancelled) setLoadingExisting(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id, isEdit]);

  const updateField = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const handleCoverChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      setErrors((c) => ({ ...c, coverImage: "Please upload a JPG, PNG or WEBP image." }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((c) => ({ ...c, coverImage: "Cover image must be smaller than 5MB." }));
      return;
    }

    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
    setErrors((c) => ({ ...c, coverImage: "" }));
  };

  const updateImportantDate = (index, key, value) => {
    setImportantDates((current) => current.map((d, i) => (i === index ? { ...d, [key]: value } : d)));
  };
  const addImportantDate = () =>
    setImportantDates((current) => [...current, { label: "", date: "" }]);
  const removeImportantDate = (index) =>
    setImportantDates((current) => current.filter((_, i) => i !== index));

  const updateScopusRow = (index, key, value) => {
    setScopusPublications((current) => current.map((r, i) => (i === index ? { ...r, [key]: value } : r)));
  };
  const addScopusRow = () =>
    setScopusPublications((current) => [
      ...current,
      { title: "", subtitle: "", publisher: "", indexedIn: "Scopus", issn: "", publicationStatus: "Indexed" },
    ]);
  const removeScopusRow = (index) =>
    setScopusPublications((current) => current.filter((_, i) => i !== index));

  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = "Title is required.";
    if (!form.acronym.trim()) next.acronym = "Acronym is required.";
    if (!form.description.trim()) next.description = "Description is required.";
    if (!form.startDate) next.startDate = "Start date is required.";
    if (!form.endDate) next.endDate = "End date is required.";
    if (form.startDate && form.endDate && new Date(form.startDate) > new Date(form.endDate)) {
      next.endDate = "End date must be after the start date.";
    }
    if (form.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contactEmail.trim())) {
      next.contactEmail = "Enter a valid email address.";
    }
    setErrors((current) => ({ ...current, ...next }));
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError("");
    setSuccess(false);
    if (isSubmitting) return;
    if (!validate()) {
      document.querySelector("[data-field-error]")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...form,
        importantDates: importantDates.filter((d) => d.label && d.date),
        scopusPublications: scopusPublications.filter((r) => r.title && r.publisher),
        coverImageFile: coverFile,
      };
      if (!payload.status) delete payload.status;

      if (isEdit) {
        await adminUpdateConference(id, payload);
      } else {
        await adminCreateConference(payload);
      }

      setSuccess(true);
      setTimeout(() => navigate("/admin/conferences"), 900);
    } catch (error) {
      if (error instanceof ApiError && error.errors?.length) {
        setSubmitError(error.errors.join(" "));
      } else {
        setSubmitError(error.message || "Could not save this conference. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingExisting) {
    return (
      <div className="flex items-center gap-2 text-navy-500">
        <Loader2 className="animate-spin" size={18} /> Loading conference...
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
        {loadError}
      </div>
    );
  }

  return (
    <div>
      <Link to="/admin/conferences" className="mb-4 inline-flex items-center gap-1.5 text-sm text-navy-600 hover:text-brandGreen">
        <ArrowLeft size={15} /> Back to Conferences
      </Link>

      <h1 className="text-xl font-bold text-navy-900 sm:text-2xl">
        {isEdit ? "Edit Conference" : "Add Conference"}
      </h1>

      {submitError && (
        <div role="alert" className="mt-4 flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle size={17} className="mt-0.5 shrink-0" /> <span>{submitError}</span>
        </div>
      )}
      {success && (
        <div role="status" className="mt-4 flex items-start gap-2.5 rounded-lg border border-brandGreen-200 bg-brandGreen-50 px-4 py-3 text-sm text-brandGreen-700">
          <CheckCircle2 size={17} className="mt-0.5 shrink-0" /> <span>Conference saved successfully.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-6">
        <div className="rounded-xl border border-navy-100 bg-white p-5 shadow-card">
          <h2 className="mb-4 font-semibold text-navy-900">Cover Image</h2>
          <div className="flex flex-wrap items-center gap-4">
            <img
              src={coverPreview || fallbackCover}
              alt="Cover preview"
              className="h-24 w-36 rounded-lg border border-navy-100 object-cover"
            />
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-navy-200 px-4 py-2 text-sm font-semibold text-navy-700 hover:bg-navy-50">
              <ImagePlus size={16} /> Choose Image
              <input type="file" accept=".jpg,.jpeg,.png,.webp" onChange={handleCoverChange} className="hidden" />
            </label>
          </div>
          {errors.coverImage && <p className="mt-2 text-xs text-red-600" data-field-error>{errors.coverImage}</p>}
        </div>

        <div className="rounded-xl border border-navy-100 bg-white p-5 shadow-card">
          <h2 className="mb-4 font-semibold text-navy-900">Basic Information</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Title" required error={errors.title}>
              <input name="title" value={form.title} onChange={updateField} className="form-input" data-field-error={errors.title ? "" : undefined} />
            </Field>
            <Field label="Acronym" required error={errors.acronym}>
              <input name="acronym" value={form.acronym} onChange={updateField} className="form-input" />
            </Field>
            <Field label="Theme" className="sm:col-span-2">
              <input name="theme" value={form.theme} onChange={updateField} className="form-input" />
            </Field>
            <Field label="Description" required error={errors.description} className="sm:col-span-2">
              <textarea name="description" value={form.description} onChange={updateField} rows={4} className="form-input resize-none" />
            </Field>
          </div>
        </div>

        <div className="rounded-xl border border-navy-100 bg-white p-5 shadow-card">
          <h2 className="mb-4 font-semibold text-navy-900">Schedule & Location</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="Start Date" required error={errors.startDate}>
              <input type="date" name="startDate" value={form.startDate} onChange={updateField} className="form-input" />
            </Field>
            <Field label="End Date" required error={errors.endDate}>
              <input type="date" name="endDate" value={form.endDate} onChange={updateField} className="form-input" />
            </Field>
            <Field label="Mode">
              <select name="mode" value={form.mode} onChange={updateField} className="form-input">
                <option>In Person</option>
                <option>Virtual</option>
                <option>Hybrid</option>
              </select>
            </Field>
            <Field label="Date Label (e.g. 19-20 DEC 2026)">
              <input name="dateLabel" value={form.dateLabel} onChange={updateField} className="form-input" />
            </Field>
            <Field label="Date Range (e.g. December 19-20, 2026)">
              <input name="dateRange" value={form.dateRange} onChange={updateField} className="form-input" />
            </Field>
            <Field label="Status Override">
              <select name="status" value={form.status} onChange={updateField} className="form-input">
                <option value="">Auto (based on end date)</option>
                <option value="upcoming">Force Upcoming</option>
                <option value="previous">Force Previous</option>
              </select>
            </Field>
            <Field label="City">
              <input name="city" value={form.city} onChange={updateField} className="form-input" />
            </Field>
            <Field label="Country">
              <input name="country" value={form.country} onChange={updateField} className="form-input" />
            </Field>
            <Field label="Location (display text)">
              <input name="location" value={form.location} onChange={updateField} className="form-input" />
            </Field>
            <Field label="Organizer" className="sm:col-span-2 lg:col-span-3">
              <input name="organizer" value={form.organizer} onChange={updateField} className="form-input" />
            </Field>
          </div>
        </div>

        <div className="rounded-xl border border-navy-100 bg-white p-5 shadow-card">
          <h2 className="mb-4 font-semibold text-navy-900">Submission, Registration & Publication</h2>
          <div className="space-y-4">
            <Field label="Submission Information">
              <textarea name="submissionInfo" value={form.submissionInfo} onChange={updateField} rows={3} className="form-input resize-none" />
            </Field>
            <Field label="Registration Information">
              <textarea name="registrationInfo" value={form.registrationInfo} onChange={updateField} rows={3} className="form-input resize-none" />
            </Field>
            <Field label="Publication Information">
              <textarea name="publicationInfo" value={form.publicationInfo} onChange={updateField} rows={3} className="form-input resize-none" />
            </Field>
          </div>
        </div>

        <div className="rounded-xl border border-navy-100 bg-white p-5 shadow-card">
          <h2 className="mb-4 font-semibold text-navy-900">Contact</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Contact Email" error={errors.contactEmail}>
              <input name="contactEmail" value={form.contactEmail} onChange={updateField} className="form-input" />
            </Field>
            <Field label="Contact Phone">
              <input name="contactPhone" value={form.contactPhone} onChange={updateField} className="form-input" />
            </Field>
          </div>
        </div>

        <div className="rounded-xl border border-navy-100 bg-white p-5 shadow-card">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-navy-900">Important Dates</h2>
            <button type="button" onClick={addImportantDate} className="flex items-center gap-1 text-sm font-semibold text-brandGreen hover:underline">
              <Plus size={15} /> Add Row
            </button>
          </div>
          <div className="space-y-3">
            {importantDates.length === 0 && <p className="text-sm text-navy-400">No important dates added yet.</p>}
            {importantDates.map((d, i) => (
              <div key={i} className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
                <input
                  value={d.label}
                  onChange={(e) => updateImportantDate(i, "label", e.target.value)}
                  placeholder="Label (e.g. Abstract Submission Deadline)"
                  className="form-input flex-1"
                />
                <input
                  value={d.date}
                  onChange={(e) => updateImportantDate(i, "date", e.target.value)}
                  placeholder="Date (e.g. August 30, 2026)"
                  className="form-input flex-1"
                />
                <button
                  type="button"
                  onClick={() => removeImportantDate(i)}
                  aria-label="Remove row"
                  className="rounded-md p-2 text-red-500 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-navy-100 bg-white p-5 shadow-card">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-navy-900">Scopus / Publication Rows</h2>
            <button type="button" onClick={addScopusRow} className="flex items-center gap-1 text-sm font-semibold text-brandGreen hover:underline">
              <Plus size={15} /> Add Row
            </button>
          </div>
          <div className="space-y-4">
            {scopusPublications.length === 0 && <p className="text-sm text-navy-400">No Scopus rows added yet.</p>}
            {scopusPublications.map((row, i) => (
              <div key={i} className="rounded-lg border border-navy-100 p-4">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <input
                    value={row.title}
                    onChange={(e) => updateScopusRow(i, "title", e.target.value)}
                    placeholder="Proceedings / Journal title"
                    className="form-input"
                  />
                  <input
                    value={row.subtitle}
                    onChange={(e) => updateScopusRow(i, "subtitle", e.target.value)}
                    placeholder="Subtitle"
                    className="form-input"
                  />
                  <input
                    value={row.publisher}
                    onChange={(e) => updateScopusRow(i, "publisher", e.target.value)}
                    placeholder="Publisher / Partner"
                    className="form-input"
                  />
                  <input
                    value={row.indexedIn}
                    onChange={(e) => updateScopusRow(i, "indexedIn", e.target.value)}
                    placeholder="Indexed In (e.g. Scopus)"
                    className="form-input"
                  />
                  <input
                    value={row.issn}
                    onChange={(e) => updateScopusRow(i, "issn", e.target.value)}
                    placeholder="ISSN"
                    className="form-input"
                  />
                  <input
                    value={row.publicationStatus}
                    onChange={(e) => updateScopusRow(i, "publicationStatus", e.target.value)}
                    placeholder="Status (e.g. Indexed)"
                    className="form-input"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeScopusRow(i)}
                  className="mt-3 flex items-center gap-1 text-sm font-semibold text-red-500 hover:underline"
                >
                  <Trash2 size={14} /> Remove Row
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-navy-100 bg-white p-5 shadow-card">
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-sm font-medium text-navy-800">
              <input type="checkbox" name="featured" checked={form.featured} onChange={updateField} className="h-4 w-4 rounded border-navy-300 text-brandGreen focus:ring-brandGreen" />
              Featured conference
            </label>
            <label className="flex items-center gap-2 text-sm font-medium text-navy-800">
              <input type="checkbox" name="active" checked={form.active} onChange={updateField} className="h-4 w-4 rounded border-navy-300 text-brandGreen focus:ring-brandGreen" />
              Active (visible on the public site)
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link to="/admin/conferences" className="btn-secondary">Cancel</Link>
          <button type="submit" disabled={isSubmitting} className="btn-primary disabled:cursor-not-allowed disabled:opacity-60">
            {isSubmitting ? (
              <>
                Saving... <Loader2 size={16} className="animate-spin" />
              </>
            ) : isEdit ? (
              "Save Changes"
            ) : (
              "Create Conference"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
