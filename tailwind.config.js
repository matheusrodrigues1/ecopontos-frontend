/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'shrikhand': ['Shrikhand', 'cursive'],
        'roboto-black': ['Roboto Black', 'sans-serif'],
      },
      letterSpacing: {
        'custom': '-0.04em',
      },
      colors: {
        'primary': '#093A3E',
      },
    },
  },
};
