import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Send, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import logo from "../assets/images/logo.png";

const navItems = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Conferences",
    to: "/conferences",
  },
  {
    label: "Associate Us",
    to: "/associate-conference",
  },
  {
    label: "About Us",
    to: "/about",
  },
  {
    label: "SDG Impact",
    to: "/sdg-impact",
  },
  {
    label: "Contact Us",
    to: "/contact",
  },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();

  /* =========================================================
     CLOSE MOBILE MENU AFTER ROUTE CHANGE
  ========================================================== */
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  /* =========================================================
     DISABLE BODY SCROLL WHEN MOBILE MENU IS OPEN
  ========================================================== */
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  /* =========================================================
     NAVBAR SCROLL EFFECT
  ========================================================== */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* =========================================================
          FIXED HEADER
      ========================================================== */}
      <header
        className={`
          fixed
          left-0
          right-0
          top-0
          z-[999]
          w-full
         
          bg-white/95
          backdrop-blur-md
          transition-all
          duration-300
          ${
            scrolled
              ? "shadow-[0_5px_25px_rgba(3,42,81,0.12)]"
              : "shadow-[0_1px_8px_rgba(0,0,0,0.025)]"
          }
        `}
      >
        {/* =======================================================
            NAVBAR CONTAINER
        ======================================================== */}
        <div
          className="
            mx-auto
            flex
            min-h-[90px]
            w-full
            max-w-[1600px]
            items-center
            justify-between
            px-4

            sm:px-6

            lg:min-h-[86px]
            lg:px-12

          
          "
        >
          {/* =====================================================
              LOGO
          ====================================================== */}
          <Link
            to="/"
            aria-label="Innovation Conference Home"
            className="
              relative
              z-10
              flex
              shrink-0
              items-center
            "
          >
            <motion.img
              src={logo}
              alt="Innovation Conference"
              whileHover={{
                scale: 1.025,
              }}
              transition={{
                duration: 0.25,
              }}
              className="
                h-[72px]
                w-auto
                object-contain

                sm:h-[80px]

             
              "
            />
          </Link>

          {/* =====================================================
              DESKTOP NAVIGATION
          ====================================================== */}
          <nav
            aria-label="Main Navigation"
            className="
              hidden
              items-center
              justify-center

              lg:flex
              lg:gap-10

            "
          >
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.to === "/"}
                className="group relative flex items-center py-4"
              >
                {({ isActive }) => (
                  <>
                    {/* Nav Text */}
                    <span
                      className={`
                        relative
                        z-10
                        whitespace-nowrap
                        text-[14px]
                        font-semibold
                        tracking-[-0.01em]
                        transition-all
                        duration-300

                        xl:text-[15px]

                        ${
                          isActive
                            ? "text-[#31883a]"
                            : "text-[#092b61] group-hover:text-[#31883a]"
                        }
                      `}
                    >
                      {item.label}
                    </span>

                    {/* Active / Hover Underline */}
                    <span
                      className={`
                        absolute
                        bottom-[12px]
                        left-1/2
                        h-[3px]
                        -translate-x-1/2
                        rounded-full
                        bg-[#31883a]
                        transition-all
                        duration-300
                        ease-out

                        ${
                          isActive
                            ? "w-full"
                            : "w-0 group-hover:w-full"
                        }
                      `}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

        

          {/* =====================================================
              MOBILE MENU BUTTON
          ====================================================== */}
          <motion.button
            type="button"
            whileTap={{
              scale: 0.92,
            }}
            onClick={() =>
              setMobileMenuOpen((previous) => !previous)
            }
            aria-label={
              mobileMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={mobileMenuOpen}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-lg
              border
              border-[#e6ebf1]
              bg-white
              text-[#092b61]
              shadow-sm
              transition-all
              duration-300

              hover:border-[#31883a]/40
              hover:bg-[#f8fbf8]
              hover:text-[#31883a]

              lg:hidden
            "
          >
            <AnimatePresence
              mode="wait"
              initial={false}
            >
              {mobileMenuOpen ? (
                <motion.span
                  key="close"
                  initial={{
                    opacity: 0,
                    rotate: -90,
                    scale: 0.7,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: 90,
                    scale: 0.7,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <X
                    size={25}
                    strokeWidth={2}
                  />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{
                    opacity: 0,
                    rotate: 90,
                    scale: 0.7,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: -90,
                    scale: 0.7,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <Menu
                    size={26}
                    strokeWidth={2}
                  />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </header>

     
     <div
  className="h-[90px] shrink-0 lg:h-[86px]"
  aria-hidden="true"
/>

      {/* =========================================================
          MOBILE BACKDROP
      ========================================================== */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
            }}
            onClick={() => setMobileMenuOpen(false)}
            className="
              fixed
              inset-x-0
              bottom-0
              top-[90px]
              z-[997]
              bg-[#071a33]/40
              backdrop-blur-[2px]

              lg:hidden
            "
          />
        )}
      </AnimatePresence>

      {/* =========================================================
          MOBILE SLIDE MENU
      ========================================================== */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.aside
            initial={{
              x: "100%",
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            exit={{
              x: "100%",
              opacity: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 330,
              damping: 32,
            }}
            className="
              fixed
              bottom-0
              right-0
              top-[90px]
              z-[998]
              w-[86%]
              max-w-[360px]
              overflow-y-auto
              border-l
              border-[#e7ebf0]
              bg-white
              shadow-[-12px_0_35px_rgba(5,37,76,0.12)]

              lg:hidden
            "
          >
            <div className="flex min-h-full flex-col">
              {/* ===============================================
                  MOBILE NAVIGATION LINKS
              ================================================ */}
              <nav
                aria-label="Mobile Navigation"
                className="
                  flex
                  flex-1
                  flex-col
                  px-5
                  pb-7
                  pt-6
                "
              >
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{
                      opacity: 0,
                      x: 30,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: 0.05 + index * 0.045,
                      duration: 0.3,
                    }}
                  >
                    <NavLink
                      to={item.to}
                      end={item.to === "/"}
                      className={({ isActive }) =>
                        `
                          group
                          flex
                          items-center
                          justify-between
                          border-b
                          border-[#edf0f3]
                          py-[17px]
                          text-[15px]
                          font-semibold
                          transition-all
                          duration-300

                          ${
                            isActive
                              ? "pl-2 text-[#31883a]"
                              : "text-[#092b61] hover:pl-2 hover:text-[#31883a]"
                          }
                        `
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <div className="flex items-center gap-3">
                            {/* Active Indicator */}
                            <span
                              className={`
                                h-5
                                w-[3px]
                                rounded-full
                                bg-[#31883a]
                                transition-all
                                duration-300

                                ${
                                  isActive
                                    ? "scale-y-100 opacity-100"
                                    : "scale-y-0 opacity-0 group-hover:scale-y-100 group-hover:opacity-100"
                                }
                              `}
                            />

                            <span>{item.label}</span>
                          </div>

                          <ArrowRight
                            size={17}
                            strokeWidth={1.8}
                            className="
                              -translate-x-2
                              opacity-0
                              transition-all
                              duration-300

                              group-hover:translate-x-0
                              group-hover:opacity-100
                            "
                          />
                        </>
                      )}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              {/* ===============================================
                  MOBILE MENU BOTTOM TEXT
              ================================================ */}
              <div
                className="
                  border-t
                  border-[#edf0f3]
                  px-5
                  py-5
                "
              >
                <p
                  className="
                    text-center
                    text-[11px]
                    leading-5
                    text-slate-400
                  "
                >
                  Ideas. Research. Collaboration. Impact.
                </p>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}