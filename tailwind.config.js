/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ai: {
          50: '#eef4ff',
          100: '#d9e7ff',
          500: '#5b8dff',
          700: '#3568f0',
          900: '#183480'
        }
      },
      boxShadow: {
        soft: '0 12px 30px -12px rgba(22, 52, 144, 0.28)'
      }
    }
  },
  plugins: []
};
