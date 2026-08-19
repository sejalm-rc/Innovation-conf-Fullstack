import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  FileBarChart2,
  Globe2,
  Leaf,
  Lightbulb,
  Quote,
  Search,
  Users2,
} from "lucide-react";
import sdgHero from "../assets/img/sdgbg.png";
import sdgCta from "../assets/img/sdgcta.png";
import impactImage from "../assets/img/sdg2.png";

import sdg1 from "../assets/img/sd1.png";
import sdg2 from "../assets/img/sd2.png";
import sdg3 from "../assets/img/sd3.png";
import sdg4 from "../assets/img/sd4.png";
import sdg5 from "../assets/img/sd5.png";
import sdg6 from "../assets/img/sd6.png";
import sdg7 from "../assets/img/sd7.png";
import sdg8 from "../assets/img/sd8.png";
import sdg9 from "../assets/img/sd9.png";
import sdg10 from "../assets/img/sd10.png";
import sdg11 from "../assets/img/sd11.png";
import sdg12 from "../assets/img/sd12.png";
import sdg13 from "../assets/img/sd13.png";
import sdg14 from "../assets/img/sd14.png";
import sdg15 from "../assets/img/sd15.png";
import sdg16 from "../assets/img/sd16.png";
import sdg17 from "../assets/img/sd17.png";
import sdaGoal from "../assets/img/sd18.png";

const reveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
};

const commitments = [
  "Promote interdisciplinary research for sustainable solutions",
  "Encourage responsible innovation and ethical research",
  "Facilitate global collaboration and knowledge exchange",
  "Support capacity building in developing communities",
  "Drive policy impact through evidence based research",
];

const stats = [
  {
    icon: Users2,
    value: "500+",
    first: "Conferences Hosted",
    second: "Across 60+ countries",
    color: "#6ca635",
  },
  {
    icon: FileBarChart2,
    value: "15,000+",
    first: "Research Papers",
    second: "Contributed",
    color: "#31579b",
  },
  {
    icon: Users2,
    value: "25,000+",
    first: "Researchers & Authors",
    second: "Engaged",
    color: "#45913e",
  },
  {
    icon: Globe2,
    value: "120+",
    first: "Countries",
    second: "Participated",
    color: "#ee9300",
  },
  {
    icon: Leaf,
    value: "Strong Impact",
    first: "Aligned with",
    second: "UN SDGs",
    color: "#42933d",
  },
];

const drivers = [
  {
    icon: Search,
    title: "Thematic Focus",
    text: "Conferences are organized around themes that address critical global challenges aligned with SDGs.",
  },
  {
    icon: Users2,
    title: "Inclusive Participation",
    text: "We encourage participation from diverse communities, including researchers from developing regions.",
  },
  {
    icon: Lightbulb,
    title: "Knowledge to Action",
    text: "Research presented at our conferences contributes to real world solutions and evidence based policies.",
  },
  {
    icon: Globe2,
    title: "Global Collaboration",
    text: "We connect researchers, innovators, industry and policymakers to accelerate sustainable impact.",
  },
  {
    icon: FileBarChart2,
    title: "Quality & Integrity",
    text: "All conferences are pre-evaluated to ensure high quality, ethical and impactful outcomes.",
  },
];

const actions = [
  "Climate change solutions",
  "Sustainable cities & communities",
  "Quality education for all",
  "Good health & well-being",
  "Clean energy innovations",
  "Peace, justice & strong institutions",
  "Partnerships for the goals",
];

const sdgImages = [
  { image: sdg1, name: "No Poverty" },
  { image: sdg2 , name: "Zero Hunger" },
  { image: sdg3, name: "Good Health and Well-Being" },
  { image: sdg4, name: "Quality Education" },
  { image: sdg5, name: "Gender Equality" },
  { image: sdg6, name: "Clean Water and Sanitation" },
  { image: sdg7, name: "Affordable and Clean Energy" },
  { image: sdg8, name: "Decent Work and Economic Growth" },
  { image: sdg9, name: "Industry, Innovation and Infrastructure" },
  { image: sdg10, name: "Reduced Inequalities" },
  { image: sdg11, name: "Sustainable Cities and Communities" },
  { image: sdg12, name: "Responsible Consumption and Production" },
  { image: sdg13, name: "Climate Action" },
  { image: sdg14, name: "Life Below Water" },
  { image: sdg15, name: "Life on Land" },
  { image: sdg16, name: "Peace, Justice and Strong Institutions" },
  { image: sdg17, name: "Partnerships for the Goals" },
  { image: sdaGoal, name: "Sustainable Development Goals" },

];

function Heading({ children, center = false }) {
  return (
    <div className={center ? "text-center" : ""}>
      <h2 className="text-[18px] font-[550] leading-tight text-[#082f63] sm:text-[20px]">
        {children}
      </h2>
      <span
        className={`mt-1 block h-[2px] w-9 bg-[#459d3b] ${center ? "mx-auto" : ""}`}
      />
    </div>
  );
}

export default function SDGImpact() {
  useEffect(() => {
    document.title = "SDG Impact | Innovation Conference";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "Discover how Innovation Conferences drives research and innovation aligned with all 17 United Nations Sustainable Development Goals.",
      );
  }, []);

  return (
    <main className="w-full overflow-hidden bg-white font-['Poppins',sans-serif] text-[#102f59]">
      {/* ==================== HERO ==================== */}
      <section className="px-3 sm:px-5 lg:px-6 mt-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="relative mx-auto min-h-[300px] w-full max-w-[1440px] overflow-hidden rounded-[14px] bg-[#032e5d] bg-cover sm:min-h-[275px] lg:min-h-[260px]"
          style={{
            backgroundImage: `url(${sdgHero})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#032e5d]/95 via-[#033564]/80 to-transparent sm:via-[#033564]/55 lg:via-transparent" />
          <div className="relative z-10 mx-auto flex min-h-[300px] max-w-[1320px] items-center px-6 py-9 sm:min-h-[275px] sm:px-10 lg:min-h-[260px] lg:px-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.12 }}
              className="max-w-[610px]"
            >
              <p className="mb-3 flex items-center gap-2 text-[12px] font-[550] uppercase text-[#78b83c] sm:text-[13px]">
                <Leaf size={20} /> SDG Impact
              </p>
              <h1 className="text-[28px] font-[600] leading-[1.18] tracking-[-0.02em] text-white min-[400px]:text-[29px] sm:text-[29px] lg:text-[29px]">
                Research with Purpose.
                <span className="mt-1 block">
                  Innovation for a{" "}
                  <span className="text-[#83b934]">Sustainable Future.</span>
                </span>
              </h1>
              <p className="mt-5 max-w-[570px] text-[12px] leading-[1.75] text-white/95 sm:text-[13px]">
                At Innovation Conferences, we believe that high quality research
                and innovation are powerful drivers for achieving the United
                Nations Sustainable Development Goals (SDGs).
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ==================== COMMITMENT + STATS ==================== */}
      <section className="px-3 py-7 sm:px-5 lg:px-6">
        <div className="mx-auto grid max-w-[1320px] gap-9 px-6 sm:px-10 lg:grid-cols-[.9fr_1.6fr] lg:gap-14 lg:px-16">
          <motion.div {...reveal} transition={{ duration: 0.5 }}>
            <Heading>Our Commitment to the SDGs</Heading>
            <p className="mt-5 text-[12px] leading-[1.75] text-[#29425f] sm:text-[12px]">
              We are committed to promoting research, collaboration and
              knowledge sharing that address global challenges and advance the
              17 Sustainable Development Goals.
            </p>
            <ul className="mt-4 space-y-2">
              {commitments.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[12px] leading-[1.45] sm:text-[12px]"
                >
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-[#49a443]"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="mt-5 inline-flex items-center gap-3 rounded border border-[#123f73] px-5 py-2.5 text-[12px] font-[550] transition hover:bg-[#103865] hover:text-white"
            >
              Read Our SDG Policy <Leaf size={15} />
            </motion.button>
          </motion.div>
          <motion.div {...reveal} transition={{ duration: 0.5, delay: 0.08 }}>
            <Heading>Impact at a Glance</Heading>
            <div className="mt-5 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
              {stats.map(({ icon: Icon, value, first, second, color }, i) => (
                <motion.article
                  key={value}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  whileHover={{ y: -6 }}
                  className="flex min-h-[185px] flex-col items-center rounded-xl border border-[#dce5ec] bg-white px-2 py-4 text-center shadow-[0_5px_16px_rgba(8,47,99,.04)] hover:shadow-[0_12px_28px_rgba(8,47,99,.12)]"
                >
                  <div
                    className="grid h-12 w-12 place-items-center rounded-full text-white"
                    style={{ backgroundColor: color }}
                  >
                    <Icon size={25} />
                  </div>
                  <p className="mt-3 whitespace-nowrap text-[17px] font-[550] text-[#082f63]">
                    {value}
                  </p>
                  <p className="mt-3 text-[11px]">{first}</p>
                  <p className="mt-2 text-[11px] text-[#3d4e63]">{second}</p>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

   {/* ==================== ALL 17 SDG IMAGES ==================== */}
<section className="px-3 pb-7 pt-2 sm:px-5 lg:px-6">
  <motion.div
    {...reveal}
    className="
      mx-auto
      w-full
      max-w-[1320px]
      px-6
      sm:px-10
      lg:px-16
    "
  >
    <Heading center>
      Supporting All 17 Sustainable Development Goals
    </Heading>

    <div
      className="
        mt-6
        grid
        grid-cols-2
        gap-3
        min-[460px]:grid-cols-3
        sm:grid-cols-4
        md:grid-cols-5
        lg:grid-cols-9
      "
    >
      {sdgImages.map(({ image, name }, index) => (
        <motion.div
          key={name}
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.4,
            delay: index * 0.035,
          }}
          whileHover={{
            y: -6,
            scale: 1.04,
          }}
          className="
            group
            overflow-hidden
            rounded-[5px]
            bg-white
            shadow-[0_4px_12px_rgba(8,47,99,0.08)]
            transition-shadow
            duration-300
            hover:shadow-[0_12px_25px_rgba(8,47,99,0.18)]
          "
        >
          <img
            src={image}
            alt={`Sustainable Development Goal ${index + 1}: ${name}`}
            loading="lazy"
            className="
              aspect-square
              h-auto
              w-full
              object-cover
              transition-transform
              duration-300
              group-hover:scale-[1.03]
            "
          />
        </motion.div>
      ))}
    </div>
  </motion.div>
</section>

      {/* ==================== IMPACT DRIVERS ==================== */}
      <section className="px-3 py-4 sm:px-5 lg:px-6">
        <div className="mx-auto max-w-[1320px] px-6 sm:px-10 lg:px-16">
          <Heading center>
            How We Drive SDG Impact Through Our Conferences
          </Heading>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
            {drivers.map(({ icon: Icon, title, text }, i) => (
              <motion.article
                key={title}
                {...reveal}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -5 }}
                className={`px-5 text-center ${i < drivers.length - 1 ? "lg:border-r lg:border-[#d5dfe7]" : ""}`}
              >
                <Icon
                  size={39}
                  strokeWidth={1.35}
                  className="mx-auto text-[#429d3d]"
                />
                <h3 className="mt-3 text-[12.5px] font-[550] text-[#082f63]">
                  {title}
                </h3>
                <p className="mt-2 text-[11px] leading-[1.6] sm:text-[11px]">
                  {text}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== REAL IMPACT ==================== */}
      <section className="px-3 py-7 sm:px-5 lg:px-6">
        <div className="mx-auto grid max-w-[1320px] items-stretch gap-6 px-6 sm:px-10 md:grid-cols-2 lg:grid-cols-[1fr_1.15fr_.92fr] lg:px-16">
          <motion.img
            {...reveal}
            whileHover={{ scale: 1.015 }}
            src={impactImage}
            alt="People holding the Earth together"
            className="h-full min-h-[230px] w-full rounded-xl object-cover"
          />
          <motion.div
            {...reveal}
            transition={{ duration: 0.5, delay: 0.06 }}
            className="py-3"
          >
            <Heading>Real Impact. Real Change.</Heading>
            <p className="mt-5 text-[11px] leading-[1.75] sm:text-[12px]">
              The research and collaborations initiated through our conferences
              contribute to innovations, policies and solutions that create a
              better, more sustainable future for all.
            </p>
            <div className="mt-6 flex gap-4 rounded-lg border border-[#cfdce7] px-4 py-4">
              <Quote
                size={27}
                fill="currentColor"
                className="shrink-0 text-[#48a33f]"
              />
              <p className="text-[11px] leading-[1.65]">
                Together, through research and innovation, we can achieve the
                SDGs and leave a lasting legacy for future generations.
              </p>
            </div>
          </motion.div>
          <motion.aside
            {...reveal}
            transition={{ duration: 0.5, delay: 0.12 }}
            whileHover={{ y: -4 }}
            className="rounded-xl bg-gradient-to-br from-[#f6faf5] to-[#eef4ef] px-6 py-5 md:col-span-2 lg:col-span-1"
          >
            <h3 className="text-[15px] font-[550] text-[#418d36]">
              Our Impact in Action
            </h3>
            <ul className="mt-4 space-y-2.5">
              {actions.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-[11px] sm:text-[12px]"
                >
                  <CheckCircle2 size={15} className="shrink-0 text-[#45a13e]" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.aside>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="px-3 pb-5 sm:px-5 lg:px-6">
        <motion.div
          {...reveal}
          className="relative mx-auto max-w-[1440px] overflow-hidden rounded-xl bg-[#003463] text-white"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_80%,rgba(43,167,97,.45),transparent_28%),linear-gradient(110deg,#032f60,#004271)]" />
          <div className="relative z-10 mx-auto flex min-h-[118px] max-w-[1320px] flex-col items-center gap-5 px-6 py-4 text-center sm:px-10 md:flex-row md:text-left lg:px-16">
            <motion.img
              whileHover={{ rotate: -3, scale: 1.06 }}
              src={sdgCta}
              alt="Sustainable globe held in hands"
              className="h-[86px] w-[86px] shrink-0 object-contain sm:h-[98px] sm:w-[98px]"
            />
            <div className="flex-1">
              <h3 className="text-[17px] font-[550] sm:text-[18px]">
                Be Part of the Change
              </h3>
              <p className="mt-2 max-w-[350px] text-[12px] leading-[1.65] text-white/90 sm:text-[13px]">
                Join us in advancing the Sustainable Development Goals through
                high quality research, innovation and collaboration.
              </p>
            </div>
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/conferences"
                className="inline-flex min-w-[225px] items-center justify-center gap-4 rounded bg-[#54a832] px-6 py-3.5 text-[12px] font-[550] text-white shadow-lg transition hover:bg-[#45952a]"
              >
                Explore Our Conferences <ArrowRight size={17} />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
