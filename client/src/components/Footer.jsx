import { Link, useLocation } from "react-router-dom";
import { Mail, Phone, Globe, MapPin } from "lucide-react";
import { motion } from "framer-motion";

import {
  LinkedinIcon,
  TwitterIcon,
  FacebookIcon,
  YoutubeIcon,
  InstagramIcon,
} from "./SocialIcons";

import logo from "../assets/img/footLogo.png";

/* =========================================================
   QUICK LINKS
========================================================= */

const quickLinks = [

  { label: "Conferences", to: "/conferences" },
  
  { label: "For Authors", to: "/associate-conference" },
  { label: "About Us", to: "/about" },
  { label: "SDG Impact", to: "/sdg-impact" },
  { label: "Contact Us", to: "/contact" },
];

/* =========================================================
   CONFERENCE LINKS
========================================================= */

const conferenceLinks = [
  { label: "Upcoming Conferences", to: "/conferences" },
  { label: "Past Conferences", to: "/conferences" },
  { label: "Conference Calendar", to: "/conferences" },
  { label: "Call for Papers", to: "/associate-conference" },
  { label: "Submission Guidelines", to: "/associate-conference" },
];

/* =========================================================
   SOCIAL LINKS
========================================================= */

const socials = [
  {
    Icon: LinkedinIcon,
    label: "LinkedIn",
    href: "#",
  },
  {
    Icon: TwitterIcon,
    label: "Twitter",
    href: "#",
  },
  {
    Icon: FacebookIcon,
    label: "Facebook",
    href: "#",
  },
  {
    Icon: YoutubeIcon,
    label: "YouTube",
    href: "#",
  },
  {
    Icon: InstagramIcon,
    label: "Instagram",
    href: "#",
  },
];

/* =========================================================
   FOOTER
========================================================= */

export default function Footer() {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <footer className="relative overflow-hidden bg-[#002b4c] text-white">
      {/* =====================================================
          SUBTLE BACKGROUND
      ====================================================== */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_85%_10%,rgba(24,111,157,0.18),transparent_28%)]
        "
      />

      {/* =====================================================
          MAIN FOOTER
      ====================================================== */}

      <div
        className="
          relative
          mx-auto
          grid
          w-full
          max-w-[1440px]
          grid-cols-1
          gap-0
          px-5
          py-7

          sm:px-7

          md:grid-cols-2
          md:gap-y-8
          md:px-7

          lg:grid-cols-[1.2fr_0.9fr_1.05fr_1.45fr]
          lg:gap-0
          lg:px-10
          lg:py-7

          xl:px-14
        "
      >
        {/* ===================================================
            1. BRAND COLUMN
        ==================================================== */}

        <div
          className="
            pb-7

            md:pr-8

            lg:min-h-[205px]
            lg:border-r
            lg:border-white/10
            lg:pb-0
            lg:pr-7

            xl:pr-9
          "
        >
          {/* Logo */}

          <Link
            to="/"
            aria-label="Innovation Conference Home"
            className="inline-flex"
          >
            <motion.img
              whileHover={{
                scale: 1.03,
              }}
              transition={{
                duration: 0.25,
              }}
              src={logo}
              alt="Innovation Conference"
              className="
                h-[72px]
                w-auto
                object-contain

                sm:h-[76px]

                lg:h-[88px]
              "
            />
          </Link>

          {/* Description */}

          <p
            className="
              mt-2
              max-w-[205px]
              text-[11.5px]
              font-normal
              leading-[1.45]
              text-white/80
            "
          >
            Advancing research and innovation through high-quality,
            peer-evaluated conferences with global impact.
          </p>

          {/* Social Icons */}

          <div className="mt-4 flex items-center gap-2">
            {socials.map(({ Icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                whileHover={{
                  y: -3,
                  scale: 1.08,
                }}
                whileTap={{
                  scale: 0.93,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="
                  group
                  flex
                
                  items-center
                  justify-center
                
              
           
               
                  text-white
                  transition-all
                  duration-300

               
                  hover:shadow-[0_5px_15px_rgba(70,163,69,0.25)]
                "
              >
                <Icon
                  size={14}
                  className="transition-transform duration-300"
                />
              </motion.a>
            ))}
          </div>
        </div>

        {/* ===================================================
            2. QUICK LINKS
        ==================================================== */}

        <div
          className="
            border-t
            border-white/10
            py-7

            md:border-t-0
            md:py-0
            md:pl-8

            lg:min-h-[205px]
            lg:border-r
            lg:border-white/10
            lg:px-7

            xl:px-9
          "
        >
          <h3
            className="
              mb-3
              text-[14px]
              font-semibold
              tracking-[0.01em]
              text-white
            "
          >
            Quick Links
          </h3>

          <ul className="space-y-[5px]">
            {quickLinks.map((item) => {
              const active = isActive(item.to);

              return (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className={`
                      group
                      relative
                      inline-flex
                      items-center
                      text-[12px]
                      leading-[1.4]
                      transition-all
                      duration-300

                      ${
                        active
                          ? "text-[#51b64e]"
                          : "text-white/90 hover:translate-x-[3px] hover:text-[#51b64e]"
                      }
                    `}
                  >
                    <span
                      className={`
                        mr-0
                        h-[3px]
                        w-0
                        rounded-full
                        bg-[#51b64e]
                        opacity-0
                        transition-all
                        duration-300

                        group-hover:mr-1.5
                        group-hover:w-[3px]
                        group-hover:opacity-100
                      `}
                    />

                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ===================================================
            3. CONFERENCES
        ==================================================== */}

        <div
          className="
            border-t
            border-white/10
            py-7

            md:border-t-0
            md:py-0
            md:pr-8

            lg:min-h-[205px]
            lg:border-r
            lg:border-white/10
            lg:px-7

            xl:px-9
          "
        >
          <h3
            className="
              mb-3
              text-[14px]
              font-semibold
              tracking-[0.01em]
              text-white
            "
          >
            Conferences
          </h3>

          <ul className="space-y-[7px]">
            {conferenceLinks.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  className="
                    group
                    inline-flex
                    items-center
                    text-[12px]
                    leading-[1.4]
                    text-white/90
                    transition-all
                    duration-300

                    hover:translate-x-[3px]
                    hover:text-[#51b64e]
                  "
                >
                  <span
                    className="
                      mr-0
                      h-[3px]
                      w-0
                      rounded-full
                      bg-[#51b64e]
                      opacity-0
                      transition-all
                      duration-300

                      group-hover:mr-1.5
                      group-hover:w-[3px]
                      group-hover:opacity-100
                    "
                  />

                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ===================================================
            4. CONTACT US
        ==================================================== */}

        <div
          className="
            border-t
            border-white/10
            py-7

            md:border-t-0
            md:py-0
            md:pl-8

            lg:min-h-[205px]
            lg:px-7

            xl:px-9
          "
        >
          <h3
            className="
              mb-3
              text-[14px]
              font-semibold
              tracking-[0.01em]
              text-white
            "
          >
            Contact Us
          </h3>

          <ul className="space-y-[10px]">
            {/* Email */}

            <li>
              <a
                href="mailto:support@innovationconferences.org"
                className="
                  group
                  flex
                  items-start
                  gap-2.5
                  text-[12px]
                  leading-[1.45]
                  text-white/90
                  transition-colors
                  duration-300

                  hover:text-[#51b64e]
                "
              >
                <Mail
                  size={12}
                  strokeWidth={1.8}
                  className="
                    mt-[1px]
                    shrink-0
                    text-white/90
                    transition-all
                    duration-300

                    group-hover:scale-110
                    group-hover:text-[#51b64e]
                  "
                />

                <span className="break-all">
                  contact@innovationconferences.org
                </span>
              </a>
            </li>

            {/* Phone */}

            <li>
              <a
                href="tel:+919970294396"
                className="
                  group
                  flex
                  items-center
                  gap-2.5
                  text-[12px]
                  text-white/90
                  transition-colors
                  duration-300

                  hover:text-[#51b64e]
                "
              >
                <Phone
                  size={14}
                  strokeWidth={1.8}
                  className="
                    shrink-0
                    transition-all
                    duration-300

                    group-hover:rotate-12
                    group-hover:text-[#51b64e]
                  "
                />

                <span>+91 99702 94396</span>
              </a>
            </li>

            {/* Website */}

            <li>
              <a
                href="https://www.innovationconferences.org"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  flex
                  items-center
                  gap-2.5
                  text-[12px]
                  text-white/90
                  transition-colors
                  duration-300

                  hover:text-[#51b64e]
                "
              >
                <Globe
                  size={12}
                  strokeWidth={1.8}
                  className="
                    shrink-0
                    transition-all
                    duration-500

                    group-hover:rotate-[25deg]
                    group-hover:text-[#51b64e]
                  "
                />

                <span>www.innovationconferences.org</span>
              </a>
            </li>

            {/* Location */}

            <li
              className="
                group
                flex
                items-center
                gap-2.5
                text-[12px]
                text-white/90
              "
            >
              <MapPin
                size={12}
                strokeWidth={1.8}
                className="
                  shrink-0
                  transition-all
                  duration-300

                  group-hover:-translate-y-0.5
                  group-hover:text-[#51b64e]
                "
              />

              <span>Worldwide</span>
            </li>
          </ul>
        </div>

      </div>
    </footer>
  );
}