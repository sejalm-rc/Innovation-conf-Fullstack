import { motion } from "framer-motion";

export default function PageHero({ eyebrow, titleLines, description, image, imageAlt }) {
  return (
    <section className="container-page pt-6">
      <div className="relative overflow-hidden rounded-2xl bg-navy-900">
        <div className="grid md:grid-cols-2 items-center min-h-[280px] sm:min-h-[320px]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 px-6 sm:px-10 py-10 sm:py-14"
          >
            {eyebrow && (
              <p className="text-brandGreen font-semibold text-sm uppercase tracking-wide mb-3">{eyebrow}</p>
            )}
            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
              {titleLines.map((line, i) => (
                <span key={i} className={line.accent ? "text-brandGreen block" : "block"}>
                  {line.text}
                </span>
              ))}
            </h1>
            {description && <p className="mt-4 text-navy-100 max-w-md text-[15px] leading-relaxed">{description}</p>}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative h-56 sm:h-72 md:h-full"
          >
            <img src={image} alt={imageAlt} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/10 to-transparent md:block hidden" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
