/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Urbanist', 'sans-serif'], // Agrega Urbanist como fuente sans
      },
      fontSize: {
        'xs': '0.75rem',    // 12px
        'sm': '0.875rem',   // 14px
        'base': '1rem',     // 16px
        'lg': '1.125rem',   // 18px
        'xl': '1.25rem',    // 20px
        '2xl': '1.5rem',    // 24px
        '3xl': '1.875rem',  // 30px
        '4xl': '2.25rem',   // 36px
        '5xl': '3rem',      // 48px
        '6xl': '3.75rem',   // 60px
        '7xl': '4.5rem',    // 72px
        '8xl': '6rem',      // 96px
        '9xl': '8rem',      // 128px
      },
    },
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
