/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FEF9E7',
          100: '#FDF3D0',
          200: '#FCE7A1',
          300: '#FADB72',
          400: '#F9CF43',
          500: '#F2B700', // Primary button color
          600: '#F2BC20', // Hover state
          700: '#C69500',
          800: '#9A7400',
          900: '#6D5200',
        },
        gray: {
          750: '#555555', // Subheadings
          850: '#333333', // Main headings
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #F0F1F5, #FAFAFA)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};