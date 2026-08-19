/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0b2545",
          50: "#eef3f8",
          100: "#d7e3ee",
          200: "#aec7dd",
          300: "#7fa6c8",
          400: "#4d7ea8",
          500: "#2f5f8a",
          600: "#1e4770",
          700: "#153458",
          800: "#0f2748",
          900: "#0b2545",
          950: "#071835",
        },
        brandGreen: {
          DEFAULT: "#4a8c2b",
          50: "#f1f8ec",
          100: "#dfefd0",
          200: "#c0dfa4",
          300: "#9bcb72",
          400: "#78b64a",
          500: "#4a8c2b",
          600: "#3d7423",
          700: "#305a1c",
          800: "#274a19",
          900: "#213e17",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 12px rgba(11, 37, 69, 0.08)",
        cardHover: "0 8px 24px rgba(11, 37, 69, 0.14)",
      },
      maxWidth: {
        container: "1280px",
      },
    },
  },
  plugins: [],
};
