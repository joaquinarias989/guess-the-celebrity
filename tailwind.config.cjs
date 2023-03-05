/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      keyframes: {
        shake: {
          '10%,90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' },
        },
        'pulse-zoom': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '.7', transform: 'scale(1.05)' },
        },
        answer: {
          '75%, 100%': {
            width: '100%',
            transform: 'scale(2)',
            opacity: '0.1',
            filter: 'drop-shadow(0 0 1px rgba(0, 0, 0, 0.5))',
          },
        },
      },
      animation: {
        shake: 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
        'pulse-zoom': 'pulse-zoom 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        answer: 'answer .7s ease-in-out 1',
      },
    },
  },
  plugins: [],
};
