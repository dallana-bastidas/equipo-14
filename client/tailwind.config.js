/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#2563EB",
          "primary-content": "#FFFFFF",
          secondary: "#FFC358",
          "secondary-content": "#160E03",
          accent: "#22D3EE",
          "accent-content": "#001014",
          neutral: "#011132",
          "neutral-content": "#c4c9ce",
          "base-100": "#FFFFFF",
          "base-200": "#F2F2F2",
          "base-300": "#BEBEBE",
          "base-content": "#011132",
          info: "#00a6ff",
          "info-content": "#000a16",
          success: "#34d399",
          "success-content": "#011008",
          warning: "#facc15",
          "warning-content": "#150f00",
          error: "#E11D48",
          "error-content": "#FFD8D9",
        },
      },
    ],
  },
};
