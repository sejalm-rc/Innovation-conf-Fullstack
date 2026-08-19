import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  ArrowRight,
  Award,
  BadgeCheck,
  BookOpenCheck,
  ChartNoAxesCombined,
  CheckCircle2,
  CircleCheckBig,
  ClipboardCheck,
  Eye,
  FileText,
  Globe2,
  Handshake,
  ListChecks,
  Search,
  ShieldAlert,
  ShieldCheck,
  Star,
  Target,
  TrendingUp,
  UserRoundCheck,
  Users2,
} from "lucide-react";

import aboutHero from "../assets/img/aboutbg.png";
import ctaimg from "../assets/img/aboutcta.png";
import sdgImg from "../assets/img/sd18.png";
import ctaBg from "../assets/img/cta.png";

const missionItems = [
  {
    icon: Target,
    text: "To host and promote pre-evaluated, top quality conferences that drive meaningful research and innovation.",
  },
  {
    icon: Users2,
    text: "To ensure all accepted papers are published in Scopus indexed proceedings or Scopus indexed journals.",
  },
  {
    icon: Globe2,
    text: "To foster global collaboration and contribute to a sustainable and inclusive future through research.",
  },
];

/* =========================================================
   QUALITY COMMITMENT DATA
========================================================= */

const commitmentItems = [
  {
    icon: ClipboardCheck,
    title: "Pre-Evaluation",
    description:
      "Every conference goes through a rigorous pre-evaluation process based on quality, academic value, scope and integrity.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Standards",
    description:
      "We assess the scientific committee, reviewers, publication partner, past record and infrastructure before approval.",
  },
  {
    icon: BookOpenCheck,
    title: "Scopus Indexed Tie-Ups",
    description:
      "Only conferences with tie-ups to Scopus indexed proceedings or journals are listed on our platform.",
  },
  {
    icon: Users2,
    title: "Rigorous Peer Review",
    description:
      "All submitted papers undergo a strict peer review by experts ensuring originality, relevance and quality.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description:
      "Clear information on dates, committees, publication partners, fees and processes – always upfront.",
  },
  {
    icon: ShieldAlert,
    title: "Ethics & Integrity",
    description:
      "We follow high ethical standards and promote plagiarism-free, responsible and inclusive research.",
  },
];

/* =========================================================
   WHY AUTHORS CHOOSE US
========================================================= */

const authorBenefits = [
  {
    icon: Globe2,
    text: "Global visibility for your research",
  },
  {
    icon: BadgeCheck,
    text: "Scopus indexed publications",
  },
  {
    icon: CircleCheckBig,
    text: "High quality peer review",
  },
  {
    icon: UserRoundCheck,
    text: "Connect with global experts & leaders",
  },
  {
    icon: ChartNoAxesCombined,
    text: "Make a real world impact",
  },
];

/* =========================================================
   EVALUATION PROCESS
========================================================= */

const processItems = [
  {
    number: "01",
    icon: FileText,
    title: "Application Received",
    description: "Conference proposal submitted by the host organization.",
  },
  {
    number: "02",
    icon: Search,
    title: "Pre-Screening",
    description:
      "Initial screening for scope, relevance, and basic requirements.",
  },
  {
    number: "03",
    icon: ListChecks,
    title: "Detailed Evaluation",
    description:
      "Assessment by our expert panel on quality, committee, publication tie-ups, and past record.",
  },
  {
    number: "04",
    icon: BadgeCheck,
    title: "Approval",
    description:
      "Only conferences that meet our strict standards are approved and featured.",
  },
  {
    number: "05",
    icon: ShieldCheck,
    title: "Publication Tie-Up Verified",
    description:
      "We ensure the conference has a valid tie-up with Scopus indexed proceedings or journals.",
  },
  {
    number: "06",
    icon: Star,
    title: "Listed on Platform",
    description:
      "Approved conferences are published on our platform for global visibility.",
  },
];

/* =========================================================
   ABOUT PAGE
========================================================= */

const About = () => {
  useEffect(() => {
    document.title = "About Us | Innovation Conferences";

    const meta = document.querySelector('meta[name="description"]');

    if (meta) {
      meta.setAttribute(
        "content",
        "Innovation Conferences is a global platform dedicated to organizing high quality academic conferences with Scopus indexed publication opportunities.",
      );
    }
  }, []);

  return (
    <main
      className="
        w-full
        overflow-hidden
        bg-white
        text-[#082c5c]
        font-['Poppins',sans-serif]
      "
    >
      {/* ==================== ABOUT HERO SECTION ==================== */}
      <section className="px-3 sm:px-5 lg:px-6 mt-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="
      relative
      mx-auto
      min-h-[300px]
      w-full
      max-w-[1440px]
      overflow-hidden
      rounded-[14px]
      bg-[#002c59]
      bg-cover
      sm:min-h-[275px]
      lg:min-h-[260px]
    "
          style={{
            backgroundImage: `url(${aboutHero})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Text readability overlay */}
          <div
            className="
        pointer-events-none
        absolute
        inset-0
        bg-gradient-to-r
        from-[#00294f]/95
        via-[#003768]/80
        to-[#002c59]/20
        sm:via-[#003768]/55
        lg:via-transparent
      "
          />

          {/* Hero content */}
          <div
            className="
        relative
        z-10
        mx-auto
        flex
        min-h-[300px]
        w-full
        max-w-[1320px]
        items-center
        px-6
        py-9
        sm:min-h-[275px]
        sm:px-10
        lg:min-h-[260px]
        lg:px-16
      "
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.12,
                ease: "easeOut",
              }}
              className="w-full max-w-[700px]"
            >
              {/* Eyebrow */}
              <motion.p
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.15 }}
                className="
            mb-3
            text-[11px]
            font-[550]
            uppercase
            tracking-[0.015em]
            text-[#58b947]
            sm:text-[12px]
            lg:text-[13px]
          "
              >
                About Innovation Conferences
              </motion.p>

              {/* Main heading */}
              <h1
                className="
            text-[28px]
            font-[600]
            leading-[1.15]
            tracking-[-0.02em]
            text-white
            min-[400px]:text-[32px]
            sm:text-[29px]
            lg:text-[29px]
          "
              >
                Advancing Research.
                <span className="mt-1 text-[#58b947] block">
                  Ensuring Quality. Creating Impact.
                </span>
              </h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="
            mt-5
            max-w-[590px]
            text-[12px]
            leading-[1.75]
            text-white/95
            sm:text-[13px]
          "
              >
                Innovation Conferences is a global platform dedicated to
                organizing high quality academic conferences that lead to
                publications in Scopus indexed proceedings and journals.
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* =========================================================
          WHO WE ARE + OUR MISSION
      ========================================================== */}

      <section className="w-full px-3 sm:px-5 lg:px-6">
        <div
          className="
            mx-auto
            grid
            w-full
            max-w-[1320px]
            grid-cols-1
            gap-8
            px-6
            pb-9
            pt-6

            sm:px-10
            md:grid-cols-2
            md:gap-0

            lg:px-16
            lg:pb-10
            lg:pt-7
          "
        >
          {/* Who We Are */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="
            md:border-r
            md:border-[#d4dde7]
            md:pr-10

            lg:pr-[60px]
          "
          >
            <h2
              className="
              text-[20px]
              font-[550]
              leading-tight
              text-[#092c5c]

              lg:text-[22px]
            "
            >
              Who We Are
            </h2>

            <div className="mt-1 h-[2px] w-[34px] bg-[#48a33f]" />

            <p
              className="
              mt-5
              text-[12px]
              leading-[1.75]
              text-[#243f61]

              sm:text-[13px]
            "
            >
              Innovation Conferences brings together researchers, academicians,
              industry experts and policy leaders from around the world to
              exchange ideas, share knowledge and advance solutions for real
              world challenges.
            </p>

            <p
              className="
              mt-5
              text-[12px]
              leading-[1.75]
              text-[#243f61]

              sm:text-[13px]
            "
            >
              We are committed to research excellence, ethical standards and
              global impact aligned with the United Nations Sustainable
              Development Goals (SDGs).
            </p>
          </motion.div>

          {/* Our Mission */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="
            md:pl-10

            lg:pl-[60px]
          "
          >
            <h2
              className="
              text-[20px]
              font-[550]
              leading-tight
              text-[#092c5c]

              lg:text-[22px]
            "
            >
              Our Mission
            </h2>

            <div className="mt-2 h-[2px] w-[34px] bg-[#48a33f]" />

            <div className="mt-5 space-y-5">
              {missionItems.map(({ icon: Icon, text }, index) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.08,
                  }}
                  className="group flex items-start gap-4"
                >
                  <div
                    className="
                    flex
                    h-[38px]
                    w-[38px]
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#f3f9f2]
                    text-[#46a23e]
                    transition-all
                    duration-300

                    group-hover:-translate-y-1
                    group-hover:bg-[#46a23e]
                    group-hover:text-white
                  "
                  >
                    <Icon size={22} strokeWidth={1.5} />
                  </div>

                  <p
                    className="
                    pt-[2px]
                    text-[12px]
                    leading-[1.6]
                    text-[#243f61]

                    sm:text-[13px]
                  "
                  >
                    {text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          OUR COMMITMENT TO QUALITY
      ========================================================== */}

      <section className="w-full px-3 pb-8 pt-1 sm:px-5 lg:px-6">
        <div className="mx-auto w-full max-w-[1320px] px-6 sm:px-10 lg:px-16">
          {/* Section heading */}
          <div className="text-center">
            <h2
              className="
                text-[20px]
                font-[550]
                text-[#092c5c]

                lg:text-[22px]
              "
            >
              Our Commitment to Quality
            </h2>

            <div className="mx-auto mt-1 h-[2px] w-[35px] bg-[#48a33f]" />

            <p
              className="
                mt-3
                text-[11px]
                text-[#41546a]

                sm:text-[12px]
              "
            >
              We maintain uncompromising standards in every conference we host.
            </p>

            <p
              className="
                mt-1
                text-[12px]
                font-[520]
                text-[#48a33f]

                sm:text-[12px]
              "
            >
              Only high quality conferences are selected and supported.
            </p>
          </div>

          {/* Cards */}
          <div
            className="
              mt-5
              grid
              grid-cols-1
              gap-3

              sm:grid-cols-2

              md:grid-cols-3

              xl:grid-cols-6
            "
          >
            {commitmentItems.map(
              ({ icon: Icon, title, description }, index) => (
                <motion.article
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -6,
                    transition: { duration: 0.2 },
                  }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.05,
                  }}
                  className="
                    group
                    min-h-[230px]
                    rounded-[8px]
                    border
                    border-[#d6e0e9]
                    bg-white
                    px-4
                    py-5
                    text-center
                    shadow-[0_2px_8px_rgba(5,45,83,0.025)]
                    transition-all
                    duration-300

                    hover:border-[#72b766]
                    hover:shadow-[0_10px_25px_rgba(9,44,92,0.10)]

                    xl:min-h-[245px]
                    xl:px-3
                  "
                >
                  <Icon
                    size={35}
                    strokeWidth={1.45}
                    className="
                      mx-auto
                      mb-4
                      text-[#45a13e]
                      transition-transform
                      duration-300

                      group-hover:scale-110
                    "
                  />

                  <h3
                    className="
                      text-[12px]
                      font-[550]
                      leading-[1.35]
                      text-[#0b2e5e]
                    "
                  >
                    {title}
                  </h3>

                  <p
                    className="
                      mt-3
                      text-[11.5px]
                      leading-[1.65]
                      text-[#3b506b]

                      sm:text-[10.5px]
                    "
                  >
                    {description}
                  </p>
                </motion.article>
              ),
            )}
          </div>
        </div>
      </section>

      {/* =========================================================
          WHY AUTHORS CHOOSE INNOVATION CONFERENCES
      ========================================================== */}

      <section className="w-full px-3 py-3 sm:px-5 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          className="
      mx-auto
      w-full
      max-w-[1320px]
      overflow-hidden
      rounded-[13px]
      bg-gradient-to-r
      from-[#f7faf6]
      via-[#f6f9f6]
      to-[#f1f6f2]
      px-6
      pb-5
      pt-4

      sm:px-10

      lg:px-16
      lg:pb-5
      lg:pt-4
    "
        >
          {/* ==================== HEADING ==================== */}
          <motion.h2
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.45,
              delay: 0.1,
            }}
            className="
        text-center
        text-[20px]
        font-[550]
        leading-[1.25]
        tracking-[-0.15px]
        text-[#082f63]

        sm:text-[20px]

        lg:text-[22px]
      "
          >
            Why Authors Choose Innovation Conferences
          </motion.h2>

          {/* ==================== CONTENT ==================== */}
          <div
            className="
        mt-4
        grid
        grid-cols-1
        gap-y-5

        sm:grid-cols-2
        sm:gap-y-6

        md:grid-cols-3

        lg:mt-[15px]
        lg:grid-cols-[repeat(5,minmax(0,1fr))_1.18fr]
        lg:gap-0
      "
          >
            {authorBenefits.map(({ icon: Icon, text }, index) => (
              <motion.div
                key={text}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.25,
                }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.07,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -5,
                }}
                className={`
            group
            relative
            flex
            min-h-[105px]
            flex-col
            items-center
            justify-center
            px-4
            py-3
            text-center
            sm:min-h-[110px]
            lg:min-h-[98px]
            lg:py-1

            ${
              index !== authorBenefits.length - 1
                ? "lg:border-r lg:border-[#cbd7d2]"
                : ""
            }
          `}
              >
                {/* Icon */}
                <motion.div
                  whileHover={{
                    scale: 1.08,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 280,
                    damping: 18,
                  }}
                  className="
              mb-[9px]
              flex
              h-[45px]
              w-[45px]
              items-center
              justify-center
              text-[#3c963c]

              sm:h-[47px]
              sm:w-[47px]
            "
                >
                  <Icon
                    size={40}
                    strokeWidth={1.35}
                    className="
                transition-all
                duration-300
                group-hover:drop-shadow-[0_4px_5px_rgba(60,150,60,0.15)]
              "
                  />
                </motion.div>

                {/* Text */}
                <p
                  className="
              max-w-[125px]
              text-[12px]
              font-medium
              leading-[1.45]
              text-[#17365f]

              sm:text-[12px]

              lg:text-[12px]
            "
                >
                  {text}
                </p>
              </motion.div>
            ))}

            {/* ==================== SDG SECTION ==================== */}
            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                duration: 0.45,
                delay: 0.35,
              }}
              whileHover={{
                y: -5,
              }}
              className="
          group
          relative
          flex
          min-h-[115px]
          flex-col
          items-center
          justify-center
          px-4
          py-3
          text-center

          sm:min-h-[110px]

          lg:min-h-[98px]
          lg:border-l
          lg:border-[#cbd7d2]
          lg:px-5
          lg:py-1
        "
            >
              {/* SDG Image */}
              <motion.img
                src={sdgImg}
                alt="United Nations Sustainable Development Goals"
                whileHover={{
                  scale: 1.04,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="
            mb-[7px]
            h-[48px]
            w-auto
            max-w-[135px]
            object-contain

            sm:h-[52px]

            lg:h-[55px]
            lg:max-w-[145px]
          "
              />

              <p
                className="
            max-w-[160px]
            text-[12px]
            font-medium
            leading-[1.4]
            text-[#17365f]

            sm:text-[12px]

            lg:text-[12px]
          "
              >
                We align with all 17 UN Sustainable Development Goals (SDGs).
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* =========================================================
          OUR CONFERENCE EVALUATION PROCESS
      ========================================================== */}

      <section
        className="
    w-full
    bg-white
    px-3
    pb-9
    pt-5

    sm:px-5
    sm:pb-10
    sm:pt-6

    lg:px-6
    lg:pb-11
    lg:pt-6
  "
      >
        <div className="mx-auto w-full max-w-[1320px] px-6 sm:px-10 lg:px-16">
          {/* ================= HEADING ================= */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{
              duration: 0.45,
              ease: "easeOut",
            }}
            className="text-center"
          >
            <h2
              className="
          text-[18px]
          font-[550]
          leading-tight
          tracking-[-0.2px]
          text-[#082d60]

          sm:text-[19px]

          lg:text-[20px]
        "
            >
              Our Conference Evaluation Process
            </h2>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 27 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: 0.15,
              }}
              className="
          mx-auto
          mt-[7px]
          h-[1.5px]
          bg-[#42a247]
        "
            />
          </motion.div>

          {/* ================= PROCESS GRID ================= */}
          <div
            className="
        mt-6
        grid
        grid-cols-1
        gap-x-4
        gap-y-8

        sm:grid-cols-2

        md:grid-cols-3

        xl:mt-[22px]
        xl:grid-cols-6
        xl:gap-x-[22px]
        xl:gap-y-0
      "
          >
            {processItems.map(
              ({ number, icon: Icon, title, description }, index) => (
                <motion.div
                  key={number}
                  initial={{
                    opacity: 0,
                    y: 18,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.25,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.07,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    y: -4,
                  }}
                  className="
              group
              relative
              mx-auto
              w-full
              max-w-[250px]

              sm:mx-0

              xl:max-w-none
            "
                >
                  {/* ================= DESKTOP CONNECTOR ================= */}
                  {index !== processItems.length - 1 && (
                    <div
                      className="
                  pointer-events-none
                  absolute
                  left-[64px]
                  top-[22px]
                  z-0
                  hidden
                  w-[calc(100%-47px)]
                  items-center

                  xl:flex
                "
                    >
                      <div
                        className="
                    h-[1px]
                    flex-1
                    border-t-[2px]
                    border-dotted
                    border-[#32984a]
                  "
                      />

                      <ArrowRight
                        size={12}
                        strokeWidth={2.1}
                        className="
                    -ml-[2px]
                    shrink-0
                    text-[#32984a]
                  "
                      />
                    </div>
                  )}

                  {/* ================= ICON ================= */}
                  <motion.div
                    whileHover={{
                      scale: 1.08,
                      rotate: 1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 280,
                      damping: 18,
                    }}
                    className="
                relative
                z-10
                flex
                h-[47px]
                w-[47px]
                items-center
                justify-center
                rounded-full
                bg-[#052f61]
                text-white
                shadow-[0_3px_8px_rgba(0,35,75,0.12)]
                transition-shadow
                duration-300

                group-hover:shadow-[0_8px_18px_rgba(0,39,82,0.20)]

                sm:h-[48px]
                sm:w-[48px]

                lg:h-[49px]
                lg:w-[49px]
              "
                  >
                    <Icon
                      size={23}
                      strokeWidth={1.55}
                      className="
                  transition-transform
                  duration-300
                  group-hover:scale-[1.04]
                "
                    />
                  </motion.div>

                  {/* ================= STEP NUMBER ================= */}
                  <p
                    className="
                mt-[9px]
                text-[13px]
                font-[550]
                leading-none
                text-[#2e983f]
              "
                  >
                    {number}
                  </p>

                  {/* ================= TITLE ================= */}
                  <h3
                    className="
                mt-[5px]
                max-w-[130px]
                text-[11px]
                font-[550]
                leading-[1.25]
                tracking-[-0.05px]
                text-[#092e61]

                sm:text-[11px]

                lg:text-[12px]
              "
                  >
                    {title}
                  </h3>

                  {/* ================= DESCRIPTION ================= */}
                  <p
                    className="
                mt-[7px]
                max-w-[150px]
                text-[11px]
                font-normal
                leading-[1.55]
                text-[#324b68]

                sm:text-[11px]

                lg:text-[11.5px]
              "
                  >
                    {description}
                  </p>

                  {/* ================= MOBILE/TABLET ACCENT ================= */}
                  {index !== processItems.length - 1 && (
                    <div
                      className="
                  mt-5
                  flex
                  w-[75px]
                  items-center
                  xl:hidden
                "
                    >
                      <div
                        className="
                    h-0
                    flex-1
                    border-t
                    border-dashed
                    border-[#32984a]/60
                  "
                      />

                      <ArrowRight
                        size={11}
                        className="-ml-[1px] text-[#32984a]"
                      />
                    </div>
                  )}
                </motion.div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* =========================================================
          BOTTOM CTA SECTION
      ========================================================== */}

      <section className="w-full px-3 pb-5 sm:px-5 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          viewport={{ once: true }}
          className="
      relative
      mx-auto
      w-full
      max-w-[1440px]
      overflow-hidden
      rounded-[10px]
      bg-[#00305d]
      py-2
    "
        >
          {/* ================= FULL BACKGROUND ================= */}
          <img
            src={ctaBg}
            alt=""
            aria-hidden="true"
            className="
        pointer-events-none
        absolute
        inset-0
        h-full
        w-full
        select-none
        object-cover
        object-center
      "
          />

          {/* ================= LEFT IMAGE ================= */}
          <img
            src={ctaimg}
            alt=""
            aria-hidden="true"
            className="
        pointer-events-none
        absolute
        z-[2]
        hidden
        select-none
        object-contain

        sm:block
        sm:left-[24px]
        sm:top-1/2
        sm:h-[68px]
        sm:w-[68px]
        sm:-translate-y-1/2

        md:left-[38px]
        md:h-[72px]
        md:w-[72px]

        lg:left-[52px]
        lg:h-[88px]
        lg:w-[88px]

        xl:left-[64px]
        xl:h-[92px]
        xl:w-[92px]
      "
          />

          {/* ================= CONTENT ================= */}
          <div
            className="
        relative
        z-10
        flex
        w-full
        flex-col
        items-center
        justify-center
        gap-4
        px-5
        py-7
        text-center

        sm:min-h-[82px]
        sm:items-start
        sm:pl-[92px]
        sm:pr-6
        sm:text-left

        md:min-h-[82px]
        md:flex-row
        md:items-center
        md:justify-between
        md:gap-6
        md:py-0
        md:pl-[108px]
        md:pr-[80px]

        lg:min-h-[96px]
        lg:pl-[130px]
        lg:pr-[110px]

        xl:min-h-[98px]
        xl:pl-[150px]
        xl:pr-[130px]
      "
          >
            {/* ================= TEXT ================= */}
            <div
              className="
          min-w-0
          flex-1
          px-4
        "
            >
              <h3
                className="
            m-0
            text-[16px]
            font-[550]
            leading-[1.25]
            tracking-[-0.1px]
            text-white

            sm:text-[16px]

            md:text-[17px]

            lg:text-[18px]
          "
              >
                Quality is Our Promise. Impact is Our Purpose.
              </h3>

              <p
                className="
            mx-auto
            mt-[5px]
            max-w-[520px]
            text-[12px]
            font-normal
            leading-[1.4]
            text-white/90

            sm:mx-0
            sm:text-[12px]

            md:text-[13px]
          "
              >
                Join us in building a better future through high quality
                research and collaboration.
              </p>
            </div>

            {/* ================= BUTTON ================= */}
            <motion.div
              whileHover={{
                y: -2,
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
              transition={{
                duration: 0.2,
              }}
              className="
          relative
          z-20
          shrink-0
        "
            >
              <Link
                to="/conferences"
                className="
            group
            inline-flex
            h-[34px]
            min-w-[150px]
            items-center
            justify-center
            gap-[8px]
            rounded-[4px]
            bg-[#3c9635]
            px-4
            text-[12px]
            font-semibold
            text-white
            shadow-[0_3px_8px_rgba(0,0,0,0.15)]
            transition-all
            duration-300

            hover:bg-[#31872c]
            hover:shadow-[0_5px_12px_rgba(0,0,0,0.2)]

            sm:h-[35px]
            sm:min-w-[155px]

            md:h-[36px]
            md:min-w-[160px]
            md:text-[12px]

            lg:h-[38px]
            lg:min-w-[170px]
          "
              >
                <span>Explore Conferences</span>

                <ArrowRight
                  size={16}
                  strokeWidth={2}
                  className="
              shrink-0
              transition-transform
              duration-300
              group-hover:translate-x-[3px]
            "
                />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default About;