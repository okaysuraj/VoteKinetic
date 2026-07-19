/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "on-surface": "#1a1c1e",
        "primary": "#001b44",
        "secondary": "#115cb9",
        "surface": "#f9f9fc",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f3f3f6",
        "outline": "#747781",
        "outline-variant": "#c4c6d2",
        "on-surface-variant": "#434750",
        "on-primary": "#ffffff",
      },
      spacing: {
        "stack-md": "16px",
        "stack-lg": "32px",
        "container-max": "800px",
        "margin-desktop": "40px",
        "gutter": "24px",
        "unit": "8px",
        "stack-sm": "8px",
        "margin-mobile": "16px"
      }
    },
  },
  plugins: [],
}
