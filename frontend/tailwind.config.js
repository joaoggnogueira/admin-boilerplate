/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: "JIT",

  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.js",
    "./nuxt.config.ts",
  ],

  theme: {
    fontFamily: {
      gruppo: ['"Gruppo"'],
    },
    colors: {
      black: '#000',
      white: '#fff',
      'gray': "#999",
      'gray-dark': '#444',
      'gray-bright': '#EFEEEE',
      "blue": "#63B3ED",
      "blue-light-100": "#EDF2F7",
      "blue-bright-100": "#F7FAFC",
      "blue-dark-100": "#2A4365",
      "blue-dark-200": "#183762",
      "blue-darker-100": "#141f2f"
    },
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        'home': 'repeat(7, minmax(0, 1fr))',
      },
      gridTemplateRows: {
        'home': 'repeat(7, minmax(0, 1fr))',
      },
      fontSize: {
        h1: ["60px", "60px"],
      },
      screens: {
        xxs: "400px",
        xs: "520px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
}
