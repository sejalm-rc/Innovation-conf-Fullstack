import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Clock3,
  FileSearch,
  Globe2,
  Grid2X2,
  Leaf,
  Network,
  Search,
  Send,
  ShieldCheck,
  Sprout,
  Users,
} from "lucide-react";
import homeBg from "../assets/img/home.png";
import goal from "../assets/img/goal.png";
import { fetchUpcomingConferences } from "../services/conferenceService";
import { resolveUploadUrl } from "../services/api";
import { useFetch } from "../hooks/useFetch";
import {
  LoadingGrid,
  EmptyState,
  ErrorState,
} from "../components/StatusStates";
import fallbackCover from "../assets/img/j1.png";

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
import sdgLogo from "../assets/img/sd18.png";
import networkBg from "../assets/img/network-bg.jpg";

const trust = [
  [ShieldCheck, "Scopus Indexed", "Conferences & Proceedings"],
  [Users, "Rigorous Peer Review", "& High Quality Standards"],
  [Globe2, "Global Visibility", "& Academic Recognition"],
  [Leaf, "Aligned with", "Sustainable Development Goals"],
];
const stats = [
  [Users, "500+", "International Conferences Hosted"],
  [BookOpen, "Scopus Indexed", "Proceedings & Journals"],
  [Globe2, "10,000+", "Authors from 120+ Countries"],
  [BarChart3, "High Impact", "Research. Real World Change."],
];
const reasons = [
  [
    ShieldCheck,
    "text-green-700 border-green-200",
    "Quality You Can Trust",
    "All conferences follow strict peer review and quality evaluation to ensure high academic standards.",
  ],
  [
    FileSearch,
    "text-sky-600 border-sky-200",
    "Scopus Indexed Publications",
    "Publish in Scopus indexed proceedings and journals for greater visibility and credibility.",
  ],
  [
    Users,
    "text-violet-600 border-violet-200",
    "For Authors, By Researchers",
    "Designed to support authors at every step – from discovery to publication.",
  ],
  [
    Clock3,
    "text-sky-700 border-sky-200",
    "Timely & Efficient Process",
    "Transparent timeline and smooth process from submission to publication.",
  ],
  [
    Sprout,
    "text-green-600 border-green-200",
    "Sustainable Future Together",
    "We promote research and innovation that contributes to achieving the UN Sustainable Development Goals.",
  ],
];
const features = [
  [
    ShieldCheck,
    "Transparent Process",
    "Clear guidelines and transparent communication at every step.",
  ],
  [
    Clock3,
    "Timely Publication",
    "We value your time and ensure timely reviews and publications.",
  ],
  [
    Network,
    "Global Networking",
    "Connect with researchers, innovators and experts worldwide.",
  ],
  [
    Grid2X2,
    "Open to All Disciplines",
    "From engineering to social sciences, life sciences to arts – all research areas are welcome.",
  ],
];
const show = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
};

const sdgImages = [
  sdg1,
  sdg2,
  sdg3,
  sdg4,
  sdg5,
  sdg6,
  sdg7,
  sdg8,
  sdg9,
  sdg10,
  sdg11,
  sdg12,
  sdg13,
  sdg14,
  sdg15,
  sdg16,
  sdg17,
  sdgLogo,
];

export default function Home() {
  const [currentConference, setCurrentConference] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);

  const {
    data: conferencesData,
    status: conferencesStatus,
    retry: retryConferences,
  } = useFetch(fetchUpcomingConferences, []);

  const conferences = Array.isArray(conferencesData)
    ? conferencesData
    : Array.isArray(conferencesData?.conferences)
      ? conferencesData.conferences
      : Array.isArray(conferencesData?.data)
        ? conferencesData.data
        : Array.isArray(conferencesData?.data?.conferences)
          ? conferencesData.data.conferences
          : [];

  useEffect(() => {
    const updateVisibleCards = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setVisibleCards(1);
      } else if (width < 768) {
        setVisibleCards(2);
      } else if (width < 1024) {
        setVisibleCards(3);
      } else {
        setVisibleCards(4);
      }
    };

    updateVisibleCards();

    window.addEventListener("resize", updateVisibleCards);

    return () => {
      window.removeEventListener("resize", updateVisibleCards);
    };
  }, []);

  const maxConferenceIndex = Math.max(0, conferences.length - visibleCards);

  useEffect(() => {
    setCurrentConference((current) => Math.min(current, maxConferenceIndex));
  }, [maxConferenceIndex]);

  const nextConference = () => {
    setCurrentConference((current) =>
      current >= maxConferenceIndex ? 0 : current + 1,
    );
  };

  const previousConference = () => {
    setCurrentConference((current) =>
      current <= 0 ? maxConferenceIndex : current - 1,
    );
  };

  const [subscriberEmail, setSubscriberEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState("");
  const [subscribeLoading, setSubscribeLoading] = useState(false);

  // Keep the remaining Home component code here

  const handleSubscribe = async (event) => {
    event.preventDefault();

    const cleanEmail = subscriberEmail.trim().toLowerCase();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!cleanEmail) {
      setSubscribeStatus("Please enter your email address.");
      return;
    }

    if (!emailPattern.test(cleanEmail)) {
      setSubscribeStatus("Please enter a valid email address.");
      return;
    }

    setSubscribeLoading(true);
    setSubscribeStatus("");

    try {
      /*
      Replace this localStorage section with your backend API
      when your newsletter API is available.
    */
      const savedSubscribers = JSON.parse(
        localStorage.getItem("conferenceSubscribers") || "[]",
      );

      const alreadySubscribed = savedSubscribers.some(
        (email) => email === cleanEmail,
      );

      if (alreadySubscribed) {
        setSubscribeStatus("This email is already subscribed.");
        return;
      }

      savedSubscribers.push(cleanEmail);

      localStorage.setItem(
        "conferenceSubscribers",
        JSON.stringify(savedSubscribers),
      );

      setSubscribeStatus("Thank you! You have successfully subscribed.");
      setSubscriberEmail("");
    } catch (error) {
      setSubscribeStatus("Subscription failed. Please try again.");
    } finally {
      setSubscribeLoading(false);
    }
  };

  return (
    <main className="overflow-hidden bg-white font-sans text-[#071f46]">
      {/* ==================== HERO SECTION ==================== */}
      <section
        className="
    relative
    mx-auto
    min-h-[500px]
    w-full
    max-w-[1848px]
    overflow-hidden
    bg-white

    sm:min-h-[510px]

    
    lg:min-h-[510px]
  "
      >
        {/* Complete background image — no desktop cropping */}
        <img
          src={homeBg}
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
      object-[65%_center]

      sm:object-[62%_center]

      lg:object-contain
      lg:object-center
    "
        />

        {/* Mobile readability overlay */}
        <div
          className="
      pointer-events-none
      absolute
      inset-0
      bg-gradient-to-r
      from-white
      via-white/95
      to-white/20
      sm:via-white/95
      lg:hidden
    "
        />

        {/* Hero content */}
        <div
          className="
      relative
      z-10
      mx-auto
      w-full
      max-w-[1170px]
      px-5
      pb-14
      pt-6

      sm:px-8
      sm:pt-10

      lg:px-10
      lg:pb-10
      lg:pt-12

      xl:px-0
    "
        >
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full max-w-[555px]"
          >
            <h1
              className="
          text-[32px]
          font-[600]
          leading-[1.12]
          tracking-tight
          text-[#082f63]

          min-[400px]:text-[34px]
          sm:text-[38px]
        "
            >
              High Quality Conferences.
              <br />
              Scopus Indexed.
              <br />
              <span className="text-[#318b32]">Global Impact.</span>
            </h1>

            <p
              className="
          mt-5
          max-w-[480px]
          text-[13px]
          leading-[1.65]
          text-[#243954]
          sm:text-[15px]
        "
            >
              A trusted platform for researchers and innovators to publish in
              high quality Scopus indexed conferences, proceedings and journals
              driving sustainable development worldwide.
            </p>

            {/* Trust features */}
            <div
              className="
          mt-7
          grid
          grid-cols-2
          gap-y-4
          text-center

          sm:grid-cols-4
          sm:gap-0
        "
            >
              {trust.map(([Icon, title, text], index) => (
                <motion.div
                  key={title}
                  whileHover={{ y: -5 }}
                  className={`
              flex
              min-h-[108px]
              flex-col
              items-center
              px-2
              text-center

              sm:border-r
              sm:border-slate-200

              ${index === 0 ? "sm:pl-0" : ""}
              ${index === trust.length - 1 ? "sm:border-r-0" : ""}
            `}
                >
                  <Icon
                    size={31}
                    strokeWidth={1.6}
                    className="mb-2 text-[#318b32]"
                  />

                  <b className="block text-[11px] font-[600] leading-5">
                    {title}
                  </b>

                  <span className="block text-[11px] leading-5">{text}</span>
                </motion.div>
              ))}
            </div>

            {/* Buttons */}
            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:gap-7">
              <Link
                to="/conferences"
                className="
            flex
            min-h-[48px]
            items-center
            justify-center
            gap-2
            rounded-lg
            bg-[#082f63]
            px-5
            py-3.5
            text-[13px]
            font-[550]
            text-white
            shadow-lg
            transition
            hover:-translate-y-1
            hover:bg-[#0b417f]
          "
              >
                <Search size={18} />
                Explore Conferences
              </Link>

              <Link
                to="/about"
                className="
            flex
            min-h-[48px]
            items-center
            justify-center
            gap-2
            rounded-lg
            border
            border-[#7d96b8]
            bg-white
            px-5
            py-3.5
            text-[13px]
            font-[550]
            transition
            hover:-translate-y-1
            hover:border-[#318b32]
            hover:text-[#318b32]
          "
              >
                <BookOpen size={18} />
                About Innovation Conference 
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== STATISTICS SECTION ==================== */}
      <section className="relative z-10">
        <motion.div
          {...show}
          transition={{ duration: 0.55 }}
          className="mx-auto grid w-[calc(100%-40px)] max-w-[1170px] grid-cols-1 gap-6 rounded-xl bg-gradient-to-r from-[#082f63] to-[#004272] px-6 py-6 text-white shadow-xl sm:w-[calc(100%-64px)] sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:gap-0 lg:px-10 xl:w-full"
        >
          {stats.map(([Icon, value, text], i) => (
            <motion.div
              key={value}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              className={`flex min-h-[75px] items-center justify-center gap-4 px-3 text-left sm:justify-start lg:min-h-[62px] lg:border-r lg:border-white/30 lg:px-8 ${
                i === 0 ? "lg:pl-0" : ""
              } ${i === 3 ? "lg:border-r-0 lg:pr-0" : ""}`}
            >
              {/* Statistics icon */}
              <Icon
                size={40}
                strokeWidth={1.5}
                className="shrink-0 text-white"
              />

              {/* Statistics content */}
              <div className="w-full max-w-[145px]">
                <strong className="block text-[19px] font-[550] leading-tight text-[#73d637]">
                  {value}
                </strong>

                <span className="mt-1 block text-[11px] leading-[1.65] text-white">
                  {text}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
      {/* ==================== WHY CHOOSE US SECTION ==================== */}
      <section className="mx-auto max-w-[1170px] px-5 pb-7 pt-7 sm:px-8 lg:px-10 xl:px-0">
        <h2 className="text-center text-[22px] font-[550]">
          Why Choose Innovation Conference Hub?
        </h2>
        <i className="mx-auto mt-1 block h-0.5 w-14 bg-[#318b32]" />
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {reasons.map(([Icon, color, title, text], i) => (
            <motion.article
              {...show}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              whileHover={{ y: -8 }}
              key={title}
              className="min-h-[245px] rounded-[10px] border border-slate-200 bg-white px-4 py-4 text-center transition-shadow hover:border-green-300 hover:shadow-xl"
            >
              <div
                className={`mx-auto mb-4 grid h-[66px] w-[66px] place-items-center rounded-full border ${color}`}
              >
                <Icon size={36} />
              </div>
              <h3 className="mx-auto mb-3 max-w-[155px] text-[13px] font-[550] leading-[1.45]">
                {title}
              </h3>
              <p className="text-[12px] leading-[1.65]">{text}</p>
            </motion.article>
          ))}
        </div>
      </section>
      {/* ==================== SDG CTA SECTION ==================== */}
      <motion.section
        {...show}
        transition={{ duration: 0.6 }}
        className="
    mx-auto
    mb-5
    w-[calc(100%-32px)]
    max-w-[1170px]
    overflow-hidden
    rounded-xl
    bg-[#f4f7f4]
    px-4
    py-5
    shadow-sm
    sm:px-6
    lg:px-7
  "
      >
        <div
          className="
      grid
      grid-cols-1
      items-center
      gap-6
      lg:grid-cols-[315px_minmax(0,1fr)]
      lg:gap-7
    "
        >
          {/* Left text content */}
          <div className="text-center lg:text-left">
            <h2 className="text-[16px] font-[550] leading-snug text-[#2d8733]">
              Driving Research for a Sustainable World
            </h2>

            <p
              className="
          mx-auto
          mt-2
          max-w-[310px]
          text-[12px]
          leading-[1.65]
          text-[#1c3048]
          lg:mx-0
        "
            >
              Our conferences and publications support all 17 Sustainable
              Development Goals of the United Nations.
            </p>

            <Link
              to="/sdg-impact"
              className="
          mt-3
          inline-flex
          min-h-[35px]
          items-center
          justify-center
          gap-2
          rounded-md
          border
          border-[#8099b7]
          bg-white
          px-4
          text-[12px]
          font-[550]
          text-[#082f63]
          transition
          duration-300
          hover:-translate-y-1
          hover:border-[#318b32]
          hover:text-[#318b32]
          hover:shadow-md
        "
            >
              Learn More About Our SDG Impact
              <Leaf size={16} strokeWidth={1.8} className="text-[#318b32]" />
            </Link>
          </div>

          {/* Right 18 SDG images */}
          <div
            className="
        grid
        min-w-0
        grid-cols-3
        gap-2
        min-[420px]:grid-cols-4
        sm:grid-cols-6
        lg:grid-cols-9
        lg:gap-[7px]
      "
          >
            {sdgImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.025,
                }}
                whileHover={{
                  y: -4,
                  scale: 1.06,
                }}
                className="
            flex
            aspect-square
            items-center
            justify-center
            overflow-hidden
            rounded-[2px]
            bg-white
            transition-shadow
            duration-300
            hover:z-10
            hover:shadow-lg
          "
              >
                <img
                  src={image}
                  alt={
                    index < 17
                      ? `Sustainable Development Goal ${index + 1}`
                      : "Sustainable Development Goals logo"
                  }
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      {/* ==================== UPCOMING CONFERENCES SECTION ==================== */}
      <section className="mx-auto max-w-[1170px] px-5 pb-4 sm:px-8 lg:px-10 xl:px-0">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-[22px] font-[550]">Upcoming Conferences</h2>

          <Link
            to="/conferences"
            className="group flex shrink-0 items-center gap-1 text-[12px] font-[550] text-[#318b32]"
          >
            View All Conferences
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {conferencesStatus === "loading" && (
          <LoadingGrid count={visibleCards} />
        )}

        {conferencesStatus === "error" && (
          <ErrorState
            title="Couldn't load upcoming conferences"
            message="Please check your connection and try again."
            onRetry={retryConferences}
          />
        )}

        {conferencesStatus === "success" && conferences.length === 0 && (
          <EmptyState
            title="No upcoming conferences right now"
            message="Please check back soon, or browse our previous conferences."
          />
        )}

        {conferencesStatus === "success" && conferences.length > 0 && (
          <div className="relative">
            {/* Previous button */}
            {conferences.length > visibleCards && (
              <button
                type="button"
                onClick={previousConference}
                aria-label="Previous conference"
                className="absolute -left-4 top-1/2 z-20 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-[#082f63] text-white shadow-lg transition duration-300 hover:scale-110 hover:bg-[#318b32] sm:-left-5 xl:-left-9"
              >
                <ChevronLeft size={20} />
              </button>
            )}

            {/* Carousel viewport */}
            <div className="overflow-hidden">
              <motion.div
                className="flex items-stretch"
                animate={{
                  x: `-${currentConference * (100 / visibleCards)}%`,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 30,
                }}
              >
                {conferences.map((conference, index) => (
                  <div
                    key={conference._id}
                    className="h-auto shrink-0 px-2"
                    style={{
                      width: `${100 / visibleCards}%`,
                    }}
                  >
                    <motion.article
                      {...show}
                      transition={{
                        delay: index * 0.07,
                      }}
                      whileHover={{
                        y: -7,
                      }}
                      className="h-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-md transition-shadow duration-300 hover:shadow-xl"
                    >
                      <Link
                        to={`/conferences/${conference.slug || conference._id}`}
                        className="block"
                      >
                        <div
                          className="relative h-[105px] bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${resolveUploadUrl(conference.coverImage, fallbackCover)})`,
                          }}
                        >
                          <div className="absolute left-3 top-0 rounded-b-md bg-[#318b32] px-3 py-2 text-center text-[7px] text-white shadow-md">
                            <b className="block text-[17px] leading-none">
                              {(conference.dateLabel || "").split(" ")[0]}
                            </b>

                            <span>
                              {(conference.dateLabel || "")
                                .split(" ")
                                .slice(1)
                                .join(" ")}
                            </span>

                            <span className="block">
                              {conference.city}
                              {conference.country
                                ? `, ${conference.country}`
                                : ""}
                            </span>
                          </div>
                        </div>

                        <div className="px-4 py-3">
                          <h3 className="min-h-[36px] text-[12px] font-[550] leading-[1.45]">
                            {conference.title} ({conference.acronym})
                          </h3>

                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="rounded-full bg-blue-50 px-3 py-1.5 text-[10px] text-blue-700">
                              Scopus Indexed Proceedings
                            </span>

                            <span className="rounded-full bg-green-50 px-3 py-1.5 text-[10px] text-green-700">
                              {conference.mode}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Next button */}
            {conferences.length > visibleCards && (
              <button
                type="button"
                onClick={nextConference}
                aria-label="Next conference"
              className="absolute -right-2 top-1/2 z-20 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-[#082f63] text-white shadow-lg transition duration-300 hover:scale-110 hover:bg-[#318b32] sm:-right-1 xl:-right-9"
              >
                <ChevronRight size={20} />
              </button>
            )}

            {/* Carousel dots */}
            {conferences.length > visibleCards && (
              <div className="mt-5 flex justify-center gap-2">
                {Array.from({
                  length: maxConferenceIndex + 1,
                }).map((_, index) => (
                  <button
                    type="button"
                    key={index}
                    onClick={() => setCurrentConference(index)}
                    aria-label={`Open conference slide ${index + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentConference === index
                        ? "w-7 bg-[#318b32]"
                        : "w-2 bg-slate-300 hover:bg-[#082f63]"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </section>
      {/* ==================== PLATFORM FEATURES SECTION ==================== */}
      <section
        className="relative mt-2 overflow-hidden bg-[#04366a] bg-cover bg-center text-white"
        style={{
          backgroundImage: `url(${networkBg})`,
        }}
      >
        {/* Dark blue overlay */}
        <div className="absolute inset-0 bg-[#032f61]/75" />

        {/* Features */}
        <div
          className="
      relative
      z-10
      mx-auto
      grid
      min-h-[130px]
      max-w-[1170px]
      grid-cols-1
      px-5
      py-6

      sm:grid-cols-2
      sm:px-8

      lg:grid-cols-4
      lg:px-10
      lg:py-7

      xl:px-0
    "
        >
          {features.map(([Icon, title, text], index) => (
            <motion.div
              {...show}
              transition={{
                duration: 0.45,
                delay: index * 0.08,
              }}
              whileHover={{
                y: -4,
              }}
              key={title}
              className={`
          group
          flex
          min-h-[105px]
          items-start
          gap-5
          border-b
          border-white/25
          px-2
          py-6

          sm:px-6

          lg:min-h-[78px]
          lg:border-b-0
          lg:border-r
          lg:px-8
          lg:py-0

          ${index === 0 ? "lg:pl-0" : ""}
          ${index === 3 ? "border-b-0 lg:border-r-0 lg:pr-0" : ""}
        `}
            >
              {/* Feature icon */}
              <Icon
                size={44}
                strokeWidth={1.5}
                className="
            mt-0.5
            shrink-0
            text-white
            transition
            duration-300
            group-hover:scale-110
            group-hover:text-[#74d83c]
          "
              />

              {/* Feature content */}
              <div>
                <h3 className="text-[14px] font-[550] leading-5 text-white">
                  {title}
                </h3>

                <p className="mt-1.5 max-w-[190px] text-[12px] leading-[1.75] text-white/95 sm:text-[10.5px]">
                  {text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      {/* ==================== NEWSLETTER CTA SECTION ==================== */}
      <section className="-mt-4">
        <div
          className="
      relative
      mx-auto
      max-w-[1440px]
      overflow-hidden
      rounded-t-[22px]
      rounded-b-none
      bg-[#075585]
      bg-cover
      bg-center
      text-white
    "
          style={{
            backgroundImage: `url(${networkBg})`,
            backgroundPosition: "center 63%",
          }}
        >
          {/* Background overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#075b98]/95 via-[#09658b]/92 to-[#15977b]/80" />
          <div className="absolute inset-0 bg-[#043b6b]/25" />

          <div
            className="
        relative
        z-10
        mx-auto
        grid
        max-w-[1170px]
        grid-cols-1
        px-6
        py-6

        sm:px-8

        md:grid-cols-[1.15fr_1fr_.78fr]
        md:items-center
        md:px-10
        md:py-5

        lg:px-5

        xl:px-0
      "
          >
            {/* Submit paper */}
            <div
              className="
          border-b
          border-white/35
          pb-6

          md:min-h-[100px]
          md:border-b-0
          md:border-r
          md:pb-0
          md:pr-10
        "
            >
              <h3 className="text-[18px] font-[550] leading-tight sm:text-[20px]">
                Be Part of Innovation. Be Part of Impact.
              </h3>

              <p className="mt-2 text-[12px] leading-relaxed text-white/95 sm:text-[13px]">
                Share your research. Inspire change. Build a better future.
              </p>

              <Link
                to="/contact"
                className="
            mt-3
            inline-flex
            min-h-[34px]
            items-center
            justify-center
            gap-3
            rounded-[4px]
            bg-[#50a92f]
            px-5
            text-[12px]
            font-[550]
            text-white
            shadow-md
            transition
            duration-300

            hover:-translate-y-1
            hover:bg-[#5fbb38]
            hover:shadow-lg
          "
              >
                Submit Your Paper
                <Send size={14} strokeWidth={1.8} />
              </Link>
            </div>

            {/* Newsletter form */}
            <div
              className="
          border-b
          border-white/35
          py-6

          md:min-h-[100px]
          md:border-b-0
          md:border-r
          md:px-10
          md:py-0
        "
            >
              <h3 className="text-[14px] font-[550] sm:text-[15px]">
                Stay Updated
              </h3>

              <p className="mt-1 max-w-[290px] text-[12px] sm:text-[13px] leading-[1.6] text-white/95">
                Subscribe to get latest conference updates and important
                announcements.
              </p>

              <form onSubmit={handleSubscribe} className="mt-2.5" noValidate>
                <div className="flex w-full max-w-[320px] overflow-hidden rounded-[3px] bg-white shadow-sm">
                  <input
                    type="email"
                    value={subscriberEmail}
                    onChange={(event) => {
                      setSubscriberEmail(event.target.value);

                      if (subscribeStatus) {
                        setSubscribeStatus("");
                      }
                    }}
                    placeholder="Enter your email"
                    aria-label="Email address"
                    disabled={subscribeLoading}
                    className="
                min-h-[32px]
                min-w-0
                flex-1
                bg-white
                px-3
                text-[12px]
                text-slate-900
                outline-none
                placeholder:text-slate-400

                focus:ring-2
                focus:ring-inset
                focus:ring-green-500
              "
                  />

                  <button
                    type="submit"
                    disabled={subscribeLoading}
                    className="
                min-h-[32px]
                shrink-0
                bg-[#4da52d]
                px-5
                text-[12px]
                font-[550]
                text-white
                transition
                duration-300

                hover:bg-[#5cba35]
                disabled:cursor-not-allowed
                disabled:opacity-70
              "
                  >
                    {subscribeLoading ? "Please wait..." : "Subscribe"}
                  </button>
                </div>

                {/* Fixed-height status prevents layout movement */}
                <p
                  aria-live="polite"
                  className={`mt-1.5 min-h-[14px] text-[12px] ${
                    subscribeStatus.includes("successfully")
                      ? "text-[#a9f58d]"
                      : "text-yellow-200"
                  }`}
                >
                  {subscribeStatus}
                </p>
              </form>
            </div>

            {/* Social media */}
            <div className="pt-6 md:min-h-[100px] md:pl-10 md:pt-0">
              <h3 className="text-[14px] font-[550] sm:text-[15px]">
                Connect With Us
              </h3>

              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  {
                    label: "LinkedIn",
                    href: "https://www.linkedin.com/",
                    icon: "in",
                  },
                  {
                    label: "Twitter",
                    href: "https://twitter.com/",
                    icon: "𝕏",
                  },
                  {
                    label: "Facebook",
                    href: "https://www.facebook.com/",
                    icon: "f",
                  },
                  {
                    label: "YouTube",
                    href: "https://www.youtube.com/",
                    icon: "▶",
                  },
                  {
                    label: "Instagram",
                    href: "https://www.instagram.com/",
                    icon: "◎",
                  },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className="
                grid
                h-8
                w-8
                place-items-center
                rounded-full
                border
                border-white/70
                bg-white/5
                text-[16px]
                font-[550]
                text-white
                transition
                duration-300

                hover:-translate-y-1
                hover:border-white
                hover:bg-white
                hover:text-[#075181]
              "
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
