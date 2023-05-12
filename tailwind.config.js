/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
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
      },
    },
  },
  plugins: [],
}
