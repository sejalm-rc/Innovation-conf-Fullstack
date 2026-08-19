export default function SectionTitle({ eyebrow, title, subtitle, center = false, dark = false }) {
  return (
    <div className={center ? "text-center" : ""}>
      {eyebrow && (
        <p className="text-brandGreen font-semibold text-sm tracking-wide uppercase mb-1">{eyebrow}</p>
      )}
      <h2 className={`text-2xl sm:text-3xl font-bold ${dark ? "text-white" : "text-navy-900"}`}>{title}</h2>
      <span className={`w-14 h-1 bg-brandGreen rounded-full mt-3 ${center ? "mx-auto" : ""}`} />
      {subtitle && (
        <p className={`mt-4 max-w-2xl ${center ? "mx-auto" : ""} ${dark ? "text-navy-100" : "text-navy-600"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
