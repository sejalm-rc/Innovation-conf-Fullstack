import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  Award,
  CheckCircle2,
  FileText,
  Globe2,
  Handshake,
  Info,
  Loader2,
  Mail,
  Megaphone,
  Phone,
  Search,
  Send,
  ShieldCheck,
  TrendingUp,
  Upload,
  Users2,
} from "lucide-react";

import associateBg from "../assets/img/associateBg.png";
import ctaImage from "../assets/img/aboutcta.png";
import { submitEvaluation } from "../services/evaluationService";
import { ApiError } from "../services/api";

const whyAssociate = [
  {
    icon: Globe2,
    title: "Global Visibility",
    description:
      "Get global exposure to our network of researchers, institutions and industry experts.",
  },
  {
    icon: Award,
    title: "Scopus Indexed Tie-Ups",
    description:
      "Access tie-ups with Scopus indexed proceedings and journals.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    description:
      "Your conference goes through our rigorous pre-evaluation for quality and standards.",
  },
  {
    icon: Users2,
    title: "Large Academic Network",
    description:
      "Reach 10,000+ authors and an extensive network across 120+ countries.",
  },
  {
    icon: Megaphone,
    title: "Promotion & Support",
    description:
      "We promote your conference through our platforms and academic channels.",
  },
  {
    icon: TrendingUp,
    title: "Sustainable Impact",
    description:
      "Together we align research with the UN Sustainable Development Goals (SDGs).",
  },
];

const evaluationSteps = [
  {
    icon: FileText,
    title: "Submission",
    description:
      "You submit your conference details through our evaluation form.",
  },
  {
    icon: Search,
    title: "Initial Screening",
    description:
      "We review basic requirements, scope, relevance and documentation.",
  },
  {
    icon: Users2,
    title: "Detailed Evaluation",
    description:
      "Our expert panel evaluates quality, organizing team, previous records and publication plan.",
  },
  {
    icon: ShieldCheck,
    title: "Decision & Feedback",
    description:
      "You receive the decision with recommendations for improvement (if any).",
  },
  {
    icon: Handshake,
    title: "Association & Tie-Up",
    description:
      "Once approved, we associate your conference with Scopus indexed proceedings/journals.",
  },
  {
    icon: Globe2,
    title: "Promotion & Support",
    description:
      "We promote your conference globally and support you at every step.",
  },
];

const whatWeLookFor = [
  "Clear aims, scope and relevance",
  "Strong and diverse organizing committee",
  "Quality of previous conferences (if any)",
  "Publication plan with Scopus indexed proceedings or journals",
  "Peer review and quality assurance process",
  "Alignment with SDGs and global impact",
  "Ethical standards and transparency",
];

const importantNotes = [
  "Submission is completely FREE.",
  "Only pre-evaluated conferences will be associated.",
  "We maintain strict quality and publication standards.",
  "Evaluation time: 7–14 working days.",
];

const countries = [
  "India",
  "United States",
  "United Kingdom",
  "Singapore",
  "Malaysia",
  "UAE",
  "Australia",
  "Thailand",
  "Spain",
  "Other",
];

const venueModes = ["In Person", "Hybrid", "Virtual"];

const publicationPlans = [
  "Innovation Conference Proceedings (ICP) - Scopus",
  "Innovation in Technology and Science Proceedings (ITS-P) - Scopus",
  "Advances in Social Sciences & Education (ASSEP) - Scopus",
  "Innovation in Health and Life Sciences Proceedings (IHLSP) - Scopus",
  "Sustainable Engineering and Technology Proceedings (SETP) - Scopus",
  "Other / Not yet decided",
];

const initialForm = {
  title: "",
  acronym: "",
  organizer: "",
  country: "",
  dates: "",
  venueMode: "",
  website: "",
  email: "",
  contactPerson: "",
  phone: "",
  scope: "",
  publicationPlan: "",
};

const reveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
};

export default function AssociateConference() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    document.title =
      "Associate Your Conference With Us | Innovation Conference";

    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Partner with Innovation Conferences to host pre-evaluated, high quality conferences with tie-ups to Scopus indexed proceedings and journals."
      );
    }
  }, []);

  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
    setSubmitted(false);
  };

  const validateForm = () => {
    const nextErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const urlPattern = /^https?:\/\/.+/i;
    const phoneDigits = form.phone.replace(/\D/g, "");

    if (form.title.trim().length < 4) {
      nextErrors.title = "Please enter a valid conference title.";
    }

    if (form.organizer.trim().length < 2) {
      nextErrors.organizer = "Please enter the organizer or institution.";
    }

    if (!form.country) nextErrors.country = "Please select a country.";
    if (!form.dates.trim()) nextErrors.dates = "Please enter conference dates.";
    if (!form.venueMode) nextErrors.venueMode = "Please select a venue or mode.";

    if (form.website && !urlPattern.test(form.website.trim())) {
      nextErrors.website = "Website must start with http:// or https://.";
    }

    if (!emailPattern.test(form.email.trim())) {
      nextErrors.email = "Please enter a valid contact email.";
    }

    if (form.contactPerson.trim().length < 2) {
      nextErrors.contactPerson = "Please enter the contact person's name.";
    }

    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      nextErrors.phone = "Please enter a valid phone number.";
    }

    if (form.scope.trim().length < 30) {
      nextErrors.scope = "Please describe the scope in at least 30 characters.";
    }

    if (!form.publicationPlan) {
      nextErrors.publicationPlan = "Please select a publication plan.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const acceptedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!acceptedTypes.includes(file.type)) {
      setSelectedFile(null);
      setErrors((current) => ({
        ...current,
        document: "Please upload a PDF, DOC or DOCX file.",
      }));
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setSelectedFile(null);
      setErrors((current) => ({
        ...current,
        document: "The selected file must be smaller than 20MB.",
      }));
      return;
    }

    setSelectedFile(file);
    setErrors((current) => ({ ...current, document: "" }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(false);
    setSubmitError("");

    if (isSubmitting) return; // guard against duplicate-click submissions

    if (!validateForm()) {
      requestAnimationFrame(() => {
        document.querySelector("[data-field-error]")?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await submitEvaluation(form, selectedFile);

      setSubmitted(true);
      setForm(initialForm);
      setSelectedFile(null);
      setErrors({});

      requestAnimationFrame(() => {
        document.getElementById("submission-message")?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      });
    } catch (error) {
      if (error instanceof ApiError && error.errors?.length) {
        setSubmitError(error.errors.join(" "));
      } else {
        setSubmitError(error.message || "Something went wrong while submitting. Please try again.");
      }
      requestAnimationFrame(() => {
        document.getElementById("submission-error")?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById("conference-evaluation-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main className="w-full overflow-x-clip bg-white text-[#082c5d]">
      {/* ==================== HERO SECTION ==================== */}
      <section className="px-3 sm:px-5 lg:px-6 mt-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="relative mx-auto min-h-[300px] w-full max-w-[1440px] overflow-hidden rounded-[14px] bg-[#042d5c] bg-cover bg-center sm:min-h-[275px] lg:min-h-[260px]"
          style={{
            backgroundImage: `url(${associateBg})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Keeps the text readable on small screens */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#032d5d]/95 via-[#063767]/80 to-[#042d5c]/20 sm:via-[#063767]/55 lg:via-transparent" />

          <div className="relative z-10 mx-auto flex min-h-[300px] max-w-[1320px] items-center px-6 py-9 sm:min-h-[275px] sm:px-10 lg:min-h-[260px] lg:px-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.12 }}
              className="max-w-[610px]"
            >
              <h1 className="text-[28px] font-[600] leading-[1.15] tracking-[-0.02em] text-white min-[400px]:text-[32px] sm:text-[29px] lg:text-[29px]">
                Associate Your Conference
                <span className="mt-1 block">
                  with <span className="text-[#79ae39]">Innovation Conferences</span>
                </span>
              </h1>

              <h2 className="mt-4 text-[14px] font-[550] text-white sm:text-[15px]">
                Expand Reach. Ensure Quality. Create Global Impact.
              </h2>

              <p className="mt-5 max-w-[520px] text-[12px] leading-[1.75] text-white/95 min-[400px]:text-[12px] sm:text-[13px]">
                Partner with us to host pre-evaluated, high quality conferences
                with tie-ups to Scopus indexed proceedings and journals,
                ensuring visibility, credibility and real impact for your
                research community.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ==================== WHY ASSOCIATE ==================== */}
      <section className="px-3 py-7 sm:px-5 sm:py-9 lg:px-6">
        <div className="mx-auto max-w-[1320px] px-6 sm:px-10 lg:px-16">
          <SectionHeading title="Why Associate Your Conference with Us?" />

          <div className="mt-6 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
          {whyAssociate.map(({ icon: Icon, title, description }, index) => (
            <motion.article
              key={title}
              {...reveal}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              whileHover={{ y: -7 }}
              className="h-full min-h-[205px] rounded-[10px] border border-[#d8e0e7] bg-white px-4 py-5 text-center transition-shadow duration-300 hover:border-[#79ae39]/60 hover:shadow-[0_12px_28px_rgba(8,44,93,.12)]"
            >
              <Icon
                size={45}
                strokeWidth={1.4}
                className="mx-auto mb-3 text-[#378e34]"
              />
              <h3 className="text-[13px] font-[550] text-[#082c5d]">{title}</h3>
              <p className="mt-3 text-[11.5px] leading-[1.65] text-[#233d5d]">
                {description}
              </p>
            </motion.article>
          ))}
          </div>
        </div>
      </section>

      {/* ==================== EVALUATION PROCESS ==================== */}
      <section className="bg-[#fbfcfd] px-3 pb-8 sm:px-5 lg:px-6">
        <div className="mx-auto max-w-[1320px] px-6 sm:px-10 lg:px-16">
          <SectionHeading title="Our Conference Evaluation Process" />
          <p className="mx-auto mt-2 max-w-[720px] text-center text-[14px] text-[#253f60]">
            Every conference is carefully evaluated before association to ensure
            the highest quality and impact.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 xl:gap-3">
            {evaluationSteps.map(
              ({ icon: Icon, title, description }, index) => (
                <motion.article
                  key={title}
                  {...reveal}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="relative text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: 3 }}
                    className="mx-auto grid h-[68px] w-[68px] place-items-center rounded-full bg-gradient-to-br from-[#0b477c] to-[#002f61] text-white shadow-[0_7px_18px_rgba(3,48,99,.2)]"
                  >
                    <Icon size={30} strokeWidth={1.4} />
                  </motion.div>

                  {index < evaluationSteps.length - 1 && (
                    <ArrowRight
                      size={25}
                      strokeWidth={1.3}
                      className="absolute -right-5 top-5 hidden text-[#3a9636] xl:block"
                    />
                  )}

                  <p className="mt-3 text-[14px] font-[500] text-[#45933a]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 text-[13px] font-[550] text-[#082c5d]">
                    {title}
                  </h3>
                  <p className="mx-auto mt-2 max-w-[165px] text-[11.5px] leading-[1.55] text-[#28415f]">
                    {description}
                  </p>
                </motion.article>
              )
            )}
          </div>
        </div>
      </section>

      {/* ==================== FORM AND SIDEBAR ==================== */}
      <section
        id="conference-evaluation-form"
        className="scroll-mt-24 px-3 py-8 sm:px-5 lg:px-6"
      >
        <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-6 px-6 sm:px-10 lg:grid-cols-[minmax(0,1.65fr)_minmax(290px,.95fr)] lg:px-16">
          <motion.div
            {...reveal}
            transition={{ duration: 0.5 }}
            className="rounded-[12px] border border-[#dbe3e9] bg-[#f9fbfa] px-4 py-6 shadow-sm sm:px-7"
          >
            <h2 className="text-[20px] font-[550] text-[#348a32]">
              Submit Your Conference for Evaluation
            </h2>
            <p className="mt-1 text-[13px] text-[#263f5d]">
              Please provide accurate information for a smooth evaluation
              process.
            </p>

            {submitted && (
              <motion.div
                id="submission-message"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-5 rounded-lg border border-[#78b868] bg-[#edf9ea] px-5 py-4 text-center"
              >
                <CheckCircle2
                  size={36}
                  className="mx-auto text-[#368f34]"
                />
                <h3 className="mt-2 text-[15px] font-[550] text-[#153d2b]">
                  Conference Submitted Successfully!
                </h3>
                <p className="mt-1 text-[13px] leading-relaxed text-[#31533f]">
                  Thank you for submitting your conference. Our team will review
                  it and contact you within 7–14 working days.
                </p>
              </motion.div>
            )}

            {submitError && (
              <motion.div
                id="submission-error"
                role="alert"
                aria-live="assertive"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-5 flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 px-5 py-4"
              >
                <AlertCircle size={20} className="mt-0.5 shrink-0 text-red-500" />
                <p className="text-[13px] leading-relaxed text-red-700">{submitError}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="mt-5 space-y-3" noValidate>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field label="Conference Title" required error={errors.title}>
                  <input
                    name="title"
                    value={form.title}
                    onChange={updateField}
                    placeholder="Enter conference title"
                    className={inputClass(errors.title)}
                  />
                </Field>

                <Field label="Acronym (if any)">
                  <input
                    name="acronym"
                    value={form.acronym}
                    onChange={updateField}
                    placeholder="e.g. ICSE 2026"
                    className={inputClass()}
                  />
                </Field>

                <Field
                  label="Organizer / Institution"
                  required
                  error={errors.organizer}
                >
                  <input
                    name="organizer"
                    value={form.organizer}
                    onChange={updateField}
                    placeholder="Enter organizer / institution name"
                    className={inputClass(errors.organizer)}
                  />
                </Field>

                <Field label="Country" required error={errors.country}>
                  <select
                    name="country"
                    value={form.country}
                    onChange={updateField}
                    className={inputClass(errors.country)}
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field
                  label="Conference Dates"
                  required
                  error={errors.dates}
                >
                  <input
                    name="dates"
                    value={form.dates}
                    onChange={updateField}
                    placeholder="e.g. 19–20 December 2026"
                    className={inputClass(errors.dates)}
                  />
                </Field>

                <Field
                  label="Venue / Mode"
                  required
                  error={errors.venueMode}
                >
                  <select
                    name="venueMode"
                    value={form.venueMode}
                    onChange={updateField}
                    className={inputClass(errors.venueMode)}
                  >
                    <option value="">Select mode</option>
                    {venueModes.map((mode) => (
                      <option key={mode} value={mode}>
                        {mode}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Conference Website" error={errors.website}>
                  <input
                    type="url"
                    name="website"
                    value={form.website}
                    onChange={updateField}
                    placeholder="https://www.example.com"
                    className={inputClass(errors.website)}
                  />
                </Field>

                <Field label="Contact Email" required error={errors.email}>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={updateField}
                    placeholder="name@example.com"
                    className={inputClass(errors.email)}
                  />
                </Field>

                <Field
                  label="Contact Person"
                  required
                  error={errors.contactPerson}
                >
                  <input
                    name="contactPerson"
                    value={form.contactPerson}
                    onChange={updateField}
                    placeholder="Full name"
                    className={inputClass(errors.contactPerson)}
                  />
                </Field>

                <Field label="Contact Phone" required error={errors.phone}>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={updateField}
                    placeholder="+91 12345 67890"
                    className={inputClass(errors.phone)}
                  />
                </Field>
              </div>

              <Field
                label="Conference Scope & Tracks"
                required
                error={errors.scope}
              >
                <textarea
                  name="scope"
                  value={form.scope}
                  onChange={updateField}
                  rows={3}
                  placeholder="Briefly describe the scope, themes and tracks of your conference..."
                  className={`${inputClass(errors.scope)} resize-none`}
                />
              </Field>

              <Field
                label="Publication Plan"
                required
                error={errors.publicationPlan}
              >
                <select
                  name="publicationPlan"
                  value={form.publicationPlan}
                  onChange={updateField}
                  className={inputClass(errors.publicationPlan)}
                >
                  <option value="">Select publication plan</option>
                  {publicationPlans.map((plan) => (
                    <option key={plan} value={plan}>
                      {plan}
                    </option>
                  ))}
                </select>
              </Field>

              <Field
                label="Upload Supporting Documents"
                help="Call for Papers, Previous Proceedings, Organizing Committee or Brochure"
                error={errors.document}
              >
                <label className="flex min-h-[58px] cursor-pointer items-center gap-3 rounded-md border border-[#bfcbd7] bg-white px-4 py-3 transition hover:border-[#47963b] hover:bg-[#f7fbf6]">
                  <Upload size={23} className="shrink-0 text-[#123c6d]" />
                  <span className="min-w-0 text-[10px] text-[#263f60]">
                    <strong className="block truncate text-[11px]">
                      {selectedFile?.name ||
                        "Click to upload files or drag and drop"}
                    </strong>
                    PDF, DOC or DOCX (Max 20MB)
                  </span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFile}
                    className="hidden"
                  />
                </label>
              </Field>

              <button
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className="mx-auto flex min-h-[42px] w-full max-w-[370px] items-center justify-center gap-3 rounded-md bg-[#063669] px-6 text-[12.5px] font-[550] text-white shadow-md transition duration-300 hover:-translate-y-1 hover:bg-[#3d9336] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {isSubmitting ? (
                  <>
                    Submitting...
                    <Loader2 size={16} className="animate-spin" />
                  </>
                ) : (
                  <>
                    Submit for Evaluation
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          <aside className="space-y-4">
            <SidebarCard title="What We Look For">
              <ul className="space-y-2.5">
                {whatWeLookFor.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-[12px] leading-[1.5] text-[#183656]"
                  >
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 shrink-0 text-[#399038]"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </SidebarCard>

            <motion.div
              {...reveal}
              transition={{ duration: 0.45 }}
              className="rounded-[11px] bg-gradient-to-r from-[#073c73] to-[#00305f] p-6 text-white shadow-md"
            >
              <h3 className="mb-4 text-[15px] font-[500]">Important Notes</h3>
              <ul className="space-y-2.5">
                {importantNotes.map((note) => (
                  <li
                    key={note}
                    className="flex items-start gap-2.5 text-[12px] leading-[1.5]"
                  >
                    <Info size={15} className="mt-0.5 shrink-0" />
                    {note}
                  </li>
                ))}
              </ul>
            </motion.div>

            <SidebarCard title="Need Help?">
              <p className="mb-4 text-[12px] text-[#486078]">
                Our team is here to assist you.
              </p>
              <ul className="space-y-3 text-[12px] text-[#17385f]">
                <li className="flex items-center gap-3">
                  <Mail size={17} className="shrink-0 text-[#063669]" />
                  <a
                    href="mailto:contact@innovationconferences.org"
                    className="break-all hover:text-[#399038]"
                  >
                    contact@innovationconferences.org
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={17} className="shrink-0 text-[#063669]" />
                  <a href="tel:+919970294396" className="hover:text-[#399038]">
                    +91 99702 94396
                  </a>
                </li>
              </ul>
            </SidebarCard>
          </aside>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="px-3 pb-3 sm:px-5 lg:px-6">
        <motion.div
          {...reveal}
          transition={{ duration: 0.55 }}
          className="relative mx-auto flex max-w-[1320px] flex-col items-center justify-between gap-5 overflow-hidden rounded-[12px] bg-gradient-to-r from-[#043d72] via-[#03436d] to-[#138066] px-6 py-4 text-white sm:px-10 md:flex-row lg:px-16"
        >
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_90%_20%,#6de56b_1px,transparent_1.5px)] [background-size:20px_20px]" />

          <div className="relative z-10 flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
            <img
              src={ctaImage}
              alt="Global academic collaboration"
              className="h-[78px] w-[78px] shrink-0 object-contain sm:h-[92px] sm:w-[92px]"
            />
            <div>
              <h2 className="text-[20px] font-[550] sm:text-[22px]">
                Let's Collaborate for a Better Future
              </h2>
              <p className="mt-1 max-w-[600px] text-[12px] leading-[1.6] text-white/95 sm:text-[14px]">
                Join Innovation Conferences and be part of a global movement to
                advance research, innovation and sustainable development.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={scrollToForm}
            className="relative z-10 flex min-h-[43px] shrink-0 items-center justify-center gap-3 rounded-md bg-[#4aa335] px-6 text-[12.5px] font-[550] text-white shadow-md transition duration-300 hover:-translate-y-1 hover:bg-[#5bb943] hover:shadow-lg"
          >
            Submit Your Conference
            <Send size={17} />
          </button>
        </motion.div>
      </section>
    </main>
  );
}

function SectionHeading({ title }) {
  return (
    <div className="text-center">
      <h2 className="text-[20px] font-[550] text-[#082c5d] sm:text-[22px]">
        {title}
      </h2>
      <span className="mx-auto mt-1 block h-[2px] w-11 bg-[#4c9b3a]" />
    </div>
  );
}

function Field({ label, required, help, error, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[13px] font-semibold text-[#15365e] sm:text-[12px]">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      {help && <span className="mb-1 block text-[11px] text-[#50667d]">{help}</span>}
      {children}
      {error && (
        <span
          data-field-error
          className="mt-1 block text-[11px] text-red-600"
        >
          {error}
        </span>
      )}
    </label>
  );
}

function SidebarCard({ title, children }) {
  return (
    <motion.div
      {...reveal}
      transition={{ duration: 0.45 }}
      className="rounded-[11px] border border-[#d7e0e7] bg-white p-6 shadow-sm"
    >
      <h3 className="mb-4 text-[16px] font-[550] text-[#348a32]">{title}</h3>
      {children}
    </motion.div>
  );
}

function inputClass(error) {
  return `min-h-[38px] w-full rounded-md border bg-white px-3 text-[13px] text-[#173656] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
    error
      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
      : "border-[#cbd6df] focus:border-[#48963a] focus:ring-[#48963a]/15"
  }`;
}