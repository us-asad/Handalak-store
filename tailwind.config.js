module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./subcomponents/**/*.{js,jsx}",
    "./containers/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        red: "#eb1537"
      },
      boxShadow: {
        1: "0 2px 15px rgba(0,0,0,0.2)"
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
}