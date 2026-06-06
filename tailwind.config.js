/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        heavenly: {
          pearl: '#F2F6F0', // Soft mint cream
          rose: '#7B9E87', // Sage green (New primary)
          mauve: '#6A8A75', // Darker sage
          cream: '#F2F6F0',
          pink: '#E8EFE7', // Very light sage
          gold: '#C4A46C',
          dark: '#2D3A2E', // Deep forest/charcoal
          accent: '#7B9E87',
        },
        primary: {
          light: '#F2F6F0',
          DEFAULT: '#7B9E87',
          dark: '#6A8A75',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Inter', 'sans-serif'], // Redirecting serif to sans as requested
        accent: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 1.5s infinite linear',
        'bounce-subtle': 'bounceSubtle 2s infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-3px)' },
        }
      },
    },
  },
  plugins: [],
}
