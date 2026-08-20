import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Globe2,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  Send,
  ShieldCheck,
  Users2,
} from "lucide-react";
import contactBg from "../assets/img/network-bg.jpg";
import { submitContactEnquiry } from "../services/contactService";
import { ApiError } from "../services/api";

const reveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
};

const initialForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  enquiryType: "",
  message: "",
};

const contactCards = [
  {
    icon: Mail,
    title: "Email Us",
    text: "contact@innovationconferences.org",
    href: "mailto:contact@innovationconferences.org",
  },
  {
    icon: Phone,
    title: "Call Us",
    text: "+91 99702 94396",
    href: "tel:+919970294396",
  },
  {
    icon: Clock3,
    title: "Working Hours",
    text: "Mon–Sat, 9:30 AM–6:30 PM",
  },
  {
    icon: Globe2,
    title: "Global Support",
    text: "Serving researchers worldwide",
  },
];

const faqs = [
  {
    question: "How can I submit a paper to a conference?",
    answer:
      "Visit the relevant conference details page and use its paper submission option. Our team will guide you through the review and publication process.",
  },
  {
    question: "Are your conference proceedings Scopus indexed?",
    answer:
      "Every listed conference is pre-evaluated. Its details page clearly states the associated Scopus indexed proceeding or journal publication opportunity.",
  },
  {
    question: "How long does it take to receive a response?",
    answer:
      "General enquiries are normally answered within one to two working days. Conference evaluation requests may take 7–14 working days.",
  },
  {
    question: "Can institutions associate their conferences with you?",
    answer:
      "Yes. Institutions can use the Associate Conference page to submit complete conference details for our quality evaluation process.",
  },
];

const inputClass = (error) =>
  `w-full rounded-md border bg-white px-3.5 py-3 text-[12px] text-[#17385e] outline-none transition placeholder:text-slate-400 ${
    error
      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
      : "border-[#cedae5] focus:border-[#419b3d] focus:ring-2 focus:ring-[#419b3d]/10"
  }`;

function Field({ label, required, error, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-[530] text-[#0a315f]">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-[11px] text-red-600">{error}</span>}
    </label>
  );
}

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    document.title = "Contact Us | Innovation Conferences";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "Contact Innovation Conferences for conference support, paper submission, publication and association enquiries.",
      );
  }, []);

  const updateField = ({ target: { name, value } }) => {
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
    if (status !== "idle") setStatus("idle");
  };

  const validate = () => {
    const next = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneDigits = form.phone.replace(/\D/g, "");

    if (form.name.trim().length < 2) next.name = "Please enter your full name.";
    if (!emailPattern.test(form.email.trim())) next.email = "Please enter a valid email address.";
    if (form.phone && (phoneDigits.length < 7 || phoneDigits.length > 15)) next.phone = "Please enter a valid phone number.";
    if (!form.enquiryType) next.enquiryType = "Please select an enquiry type.";
    if (form.subject.trim().length < 3) next.subject = "Please enter a subject.";
    if (form.message.trim().length < 20) next.message = "Please enter at least 20 characters.";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("idle");
    setErrorMessage("");

    if (status === "loading") return; // guard against duplicate-click submissions
    if (!validate()) return;

    setStatus("loading");
    try {
      await submitContactEnquiry(form);

      setForm(initialForm);
      setErrors({});
      setStatus("success");
    } catch (error) {
      if (error instanceof ApiError && error.errors?.length) {
        setErrorMessage(error.errors.join(" "));
      } else {
        setErrorMessage(error.message || "Something went wrong. Please try again.");
      }
      setStatus("error");
    }
  };

  return (
    <main className="w-full overflow-hidden bg-white font-['Poppins',sans-serif] text-[#17385e]">
      {/* ==================== HERO SECTION ==================== */}
      <section className="px-3 sm:px-5 lg:px-6 mt-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}    
          transition={{ duration: 0.55 }}
          className="relative mx-auto min-h-[300px] max-w-[1440px] overflow-hidden rounded-[14px] bg-[#032f60] bg-cover bg-center sm:min-h-[275px] lg:min-h-[260px]"
          style={{ backgroundImage: `url(${contactBg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#032e5d]/98 via-[#063a69]/88 to-[#034b6a]/35" />
          <div className="relative z-10 mx-auto flex min-h-[300px] max-w-[1320px] items-center px-6 py-9 sm:min-h-[275px] sm:px-10 lg:min-h-[260px] lg:px-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.12 }}
              className="max-w-[650px]"
            >
              <p className="mb-3 flex items-center gap-2 text-[12px] font-[550] uppercase text-[#79b83d]">
                <MessageSquareText size={19} /> Contact Us
              </p>
              <h1 className="text-[28px] font-[600] leading-[1.18] tracking-[-0.02em] text-white sm:text-[29px] lg:text-[29px]">
                Let&apos;s Connect. Let&apos;s Create
                <span className="mt-1 block text-[#83b934]">Meaningful Research Impact.</span>
              </h1>
              <p className="mt-5 max-w-[500px] text-[14px] leading-[1.75] text-white/95 sm:text-[15px]">
                Have a question about conferences, paper submissions, publications or institutional association?
                Our team is ready to assist you.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ==================== CONTACT CARDS ==================== */}
      <section className="px-3 py-6 sm:px-4 lg:px-4">
        <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-2 px-6 min-[470px]:grid-cols-2 sm:px-10 lg:grid-cols-4 lg:px-10">
          {contactCards.map(({ icon: Icon, title, text, href }, index) => {
            const content = <><div className="grid h-10 w-10 place-items-center rounded-full bg-[#eef7ec] text-[#459d3b] transition group-hover:bg-[#459d3b] group-hover:text-white"><Icon size={20} /></div><div><h2 className="text-[14px] font-[550] text-[#082f63]">{title}</h2><p className="mt-1 break-words text-[12px] leading-[1.5] text-[#3c5068] sm:text-[13px]">{text}</p></div></>;
            return (
              <motion.article key={title} {...reveal} transition={{ duration: 0.4, delay: index * 0.06 }} whileHover={{ y: -5 }} className="group rounded-xl border border-[#d9e3ea] bg-white shadow-[0_5px_18px_rgba(8,47,99,.05)]">
                {href ? <a href={href} className="flex min-h-[112px] items-center gap-4 px-2 py-4">{content}</a> : <div className="flex min-h-[112px] items-center gap-4 px-5 py-4">{content}</div>}
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* ==================== FORM AND CONTACT DETAILS ==================== */}
      <section className="px-3 pb-9 sm:px-5 lg:px-6">
        <div className="mx-auto grid max-w-[1320px] gap-6 px-6 sm:px-10 lg:grid-cols-[1.45fr_.8fr] lg:px-10">
          <motion.div {...reveal} className="rounded-xl border border-[#d8e2e9] bg-[#fafcfb] p-5 sm:p-7">
            <h2 className="text-[20px] font-[550] text-[#348a32]">Send Us a Message</h2>
            <p className="mt-1 text-[12px] text-[#42566d] sm:text-[13px]">Complete the form and our support team will contact you shortly.</p>

            {status === "success" && (
              <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} role="status" className="mt-5 flex gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3">
                <CheckCircle2 className="shrink-0 text-[#3c9939]" size={21} />
                <div><h3 className="text-[13px] font-[550] text-green-900">Message sent successfully!</h3><p className="mt-1 text-[11px] text-green-800">Thank you for contacting us. We will reply within 1–2 working days.</p></div>
              </motion.div>
            )}
            {status === "error" && (
              <div role="alert" aria-live="assertive" className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[11px] text-red-700">
                {errorMessage || "We could not send your message. Please try again or email us directly."}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Full Name" required error={errors.name}><input name="name" value={form.name} onChange={updateField} autoComplete="name" placeholder="Enter your full name" className={inputClass(errors.name)} /></Field>
                <Field label="Email Address" required error={errors.email}><input type="email" name="email" value={form.email} onChange={updateField} autoComplete="email" placeholder="name@example.com" className={inputClass(errors.email)} /></Field>
                <Field label="Phone Number" error={errors.phone}><input type="tel" name="phone" value={form.phone} onChange={updateField} autoComplete="tel" placeholder="+91 12345 67890" className={inputClass(errors.phone)} /></Field>
                <Field label="Enquiry Type" required error={errors.enquiryType}><select name="enquiryType" value={form.enquiryType} onChange={updateField} className={inputClass(errors.enquiryType)}><option value="">Select enquiry type</option><option>Conference Information</option><option>Paper Submission</option><option>Publication Support</option><option>Associate a Conference</option><option>Partnership / Collaboration</option><option>Other</option></select></Field>
              </div>
              <Field label="Subject" required error={errors.subject}><input name="subject" value={form.subject} onChange={updateField} placeholder="How can we help you?" className={inputClass(errors.subject)} /></Field>
              <Field label="Message" required error={errors.message}><textarea name="message" value={form.message} onChange={updateField} rows={5} placeholder="Write your message here..." className={`${inputClass(errors.message)} resize-none`} /></Field>
              <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} disabled={status === "loading"} className="inline-flex min-h-[43px] w-full items-center justify-center gap-3 rounded-md bg-[#073665] px-7 py-3 text-[12px] font-[550] text-white transition hover:bg-[#459b38] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto">
                {status === "loading" ? "Sending..." : "Send Message"} <Send size={16} />
              </motion.button>
            </form>
          </motion.div>

          <div className="space-y-6">
            <motion.aside {...reveal} transition={{ duration: 0.5, delay: 0.08 }} className="rounded-xl bg-[#063665] p-6 text-white">
              <h2 className="text-[18px] font-[550]">Contact Information</h2>
              <p className="mt-2 text-[12px] leading-[1.65] text-white/80">Reach our team directly for conference and publication support.</p>
              <div className="mt-6 space-y-5">
                <a href="mailto:contact@innovationconferences.org" className="group flex items-start gap-4"><Mail className="mt-0.5 shrink-0 text-[#74b93e]" size={20} /><div><p className="text-[12px] text-white/65">Email</p><p className="mt-1 break-all text-[13px] group-hover:text-[#8dcc52]">contact@innovationconferences.org</p></div></a>
                <a href="tel:+919970294396" className="group flex items-start gap-4"><Phone className="mt-0.5 shrink-0 text-[#74b93e]" size={20} /><div><p className="text-[12px] text-white/65">Phone</p><p className="mt-1 text-[13px] group-hover:text-[#8dcc52]">+91 99702 94396</p></div></a>
                <div className="flex items-start gap-4"><MapPin className="mt-0.5 shrink-0 text-[#74b93e]" size={20} /><div><p className="text-[12px] text-white/65">Location</p><p className="mt-1 text-[13px] leading-[1.6]">Nagpur, Maharashtra, India<br />Supporting researchers worldwide</p></div></div>
              </div>
            </motion.aside>

            <motion.aside {...reveal} transition={{ duration: 0.5, delay: 0.12 }} whileHover={{ y: -4 }} className="rounded-xl border border-[#d8e2e9] bg-gradient-to-br from-[#f7faf6] to-[#eef5ef] p-6">
              <ShieldCheck size={31} className="text-[#449d3d]" />
              <h3 className="mt-3 text-[15px] font-[550] text-[#082f63]">Reliable Academic Support</h3>
              <p className="mt-2 text-[12px] leading-[1.7] text-[#42566d]">Transparent communication, ethical processes and timely support at every stage of your conference journey.</p>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* ==================== MAP ==================== */}
      <section className="px-3 pb-9 sm:px-5 lg:px-6">
        <motion.div {...reveal} className="mx-auto max-w-[1320px] px-6 sm:px-10 lg:px-10">
          <div className="grid overflow-hidden rounded-xl border border-[#d7e1e8] bg-white lg:grid-cols-[.65fr_1.35fr]">
            <div className="flex flex-col justify-center p-6 sm:p-8"><MapPin size={34} className="text-[#459d3b]" /><h2 className="mt-3 text-[20px] font-[550] text-[#082f63]">Our Global Presence</h2><span className="mt-2 h-[2px] w-9 bg-[#459d3b]" /><p className="mt-4 text-[12px] leading-[1.75] text-[#42566d] sm:text-[13px]">Innovation Conferences works with researchers, academic institutions and publication partners across the world.</p><div className="mt-5 flex items-center gap-3 text-[12px] font-[550] text-[#348a32]"><Users2 size={18} /> Global academic community</div></div>
            <iframe title="Innovation Conferences location" src="https://www.google.com/maps?q=Nagpur%2C%20Maharashtra%2C%20India&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-[300px] w-full border-0 sm:h-[350px] lg:h-full lg:min-h-[360px]" />
          </div>
        </motion.div>
      </section>

      {/* ==================== FAQ ==================== */}
   <section className="pb-10">
  <div className="max-w-[1520px] px-1 mx-auto">

    {/* Section Heading */}
    <motion.div {...reveal} className="text-center">
      <h2 className="text-[20px] font-[550] text-[#082f63] sm:text-[22px]">
        Frequently Asked Questions
      </h2>

      <span className="mx-auto mt-2 block h-[2px] w-9 bg-[#459d3b]" />
    </motion.div>

    {/* FAQ Grid */}
    <div className="mx-auto mt-7 grid max-w-[1000px] grid-cols-1 items-start gap-4 md:grid-cols-2">
      {faqs.map((item, index) => {
        const isOpen = openFaq === index;

        return (
          <motion.div
            key={item.question}
            {...reveal}
            transition={{
              duration: 0.35,
              delay: index * 0.04,
            }}
            className="w-full overflow-hidden rounded-lg border border-[#d8e2e9] bg-white"
          >
            {/* Question */}
            <button
              type="button"
              onClick={() => setOpenFaq(isOpen ? -1 : index)}
              aria-expanded={isOpen}
              className="flex min-h-[58px] w-full items-center justify-between gap-4 px-5 py-4 text-left text-[12px] font-[600] leading-[1.5] text-[#082f63] sm:text-[13px]"
            >
              <span className="pr-2">
                {item.question}
              </span>

              <ChevronDown
                size={18}
                className={`shrink-0 text-[#459d3b] transition-transform duration-300 ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {/* Answer */}
            <motion.div
              initial={false}
              animate={{
                height: isOpen ? "auto" : 0,
                opacity: isOpen ? 1 : 0,
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className="overflow-hidden"
            >
              <div className="border-t border-[#e4ebf0] px-5 py-4 text-[12px] leading-[1.7] text-[#42566d] sm:text-[13px]">
                {item.answer}
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  </div>
</section>

      {/* ==================== CTA ==================== */}
      <section className="px-3 pb-5 sm:px-5 lg:px-10">
        <motion.div {...reveal} className="relative mx-auto max-w-[1320px] overflow-hidden rounded-xl bg-[#063665] text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_92%_100%,rgba(57,167,102,.50),transparent_30%),linear-gradient(110deg,#06305f,#004776)]" />
            <div className="relative z-10 mx-auto flex min-h-[112px] max-w-[1320px] flex-col items-center gap-5 px-6 py-6 text-center sm:px-10 md:flex-row md:text-left lg:px-16">
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full border border-white/25 bg-white/10">
            <MessageSquareText size={31} />
            </div>
            <div className="flex-1">
                <h2 className="text-[18px] font-[550] sm:text-[20px]">Let&apos;s Build Research Impact Together</h2>
                <p className="mt-2 text-[12px] leading-[1.6] text-white/85 sm:text-[14px]">Connect with our team for conference, publication and collaboration support.</p></div>
                <a href="mailto:support@innovationconferences.org" className="inline-flex w-full items-center justify-center gap-3 rounded bg-[#51a333] px-6 py-3.5 text-[12px] font-[550] text-white transition hover:-translate-y-1 hover:bg-[#438d2c] sm:w-auto">Email Our Team 
                    <ArrowRight size={17} />
                    </a>
                    </div>
                    </motion.div>
      </section>
    </main>
  );
}