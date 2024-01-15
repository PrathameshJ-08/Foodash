/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  //list of files where i csn use tailwind
  // /**/* means anywhere under our src folder
  theme: {
    extend: {},
  },
  plugins: [
    require("tailwind-scrollbar"),
    function plugin({ addUtilities }) {
      const newUtilities = {
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      };

      addUtilities(newUtilities);
    },
  ],
};
