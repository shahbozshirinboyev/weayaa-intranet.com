/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-green-dark': '#2E6734',
        'custom-green-5': 'rgba(46, 103, 52, 0.05)',
        'custom-green-10': 'rgba(46, 103, 52, 0.10)',
        'custom-green-15': 'rgba(46, 103, 52, 0.15)',
        'custom-green-30': 'rgba(46, 103, 52, 0.30)',
        'custom-green-60': 'rgba(46, 103, 52, 0.60)',
        'custom-green-80': 'rgba(46, 103, 52, 0.80)',
        'custom-green-90': 'rgba(46, 103, 52, 0.90)',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    darkTheme: false, // Disable dark mode - daisyUI - Tailwind CSS
  },
}
