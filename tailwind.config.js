/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cr: "#FC4444",
        cb: {
          neon: "#3FEEE7",
          bluegreen: "#55BDCA",
          skyblue: "#96CAEF",
          lightblue: "#CAFAFE"
        }
      }
    },
  },
  plugins: [],
}
