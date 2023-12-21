/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    'index.html',
    './node_modules/@material-tailwind/react/**/*.{html,js}',
    './node_modules/tailwind-datepicker-react/dist/**/*.js',
  ],
  plugins: [require('daisyui')],
};
