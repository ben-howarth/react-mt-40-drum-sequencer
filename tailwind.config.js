/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        16: "repeat(16, minmax(0, 1fr))",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "synth-body-cream": "#F7E8BD",
        "synth-red": {
          600: "#98271A",
          400: "#B24134",
          200: "#CB5A4D",
          100: "#E57467",
        },
        "synth-brown": {
          600: "#6B4723",
          400: "#84603C",
          200: "#B7936F",
          100: "#9E7A56",
        },
        "bright-blue": "#7DF9FF",
        "bright-yellow": "#FFDB98",
        "bright-green": "#90EE90",
        "bright-purple": "#9723C9",
        "bright-pink": "#FF00F5",
      },
      dropShadow: {
        "2xl": "8px 8px rgba(0, 0, 0, 255)",
        "3xl": "16px 16px rgba(0, 0, 0, 255)",
        "4xl": "32px 32px rgba(0, 0, 0, 255)",
      },
    },
  },
  plugins: [],
};
