/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        foreground: '#DAE2E4',  // Text
        background: '#0F0F0F',  // Background
        primary: '#0AC694',     // Primary (zielony/turkusowy)
        secondary: '#2F2F2F',   // Secondary (ciemny szary)
        accent: '#F4D35E',      // Accent (złoty/żółty)
      },
    },
  },
  plugins: [],
}
