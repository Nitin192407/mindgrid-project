/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        calm: {
          50: '#f4f9f8',
          100: '#e5f3f0',
          200: '#cee7e1',
          300: '#a7d5cc',
          400: '#79bdaf',
          500: '#529f90',
          600: '#3e8174',
          700: '#33685f',
          800: '#2b544e',
          900: '#264642',
        },
        serene: {
          50: '#f5f6ff',
          100: '#ebedff',
          200: '#dbdfff',
          300: '#bfc5ff',
          400: '#9ca2ff',
          500: '#797bff',
          600: '#5e54f7',
          700: '#5041dd',
          800: '#4236b3',
          900: '#38308d',
        },
        lavender: {
          50: '#faf8ff',
          100: '#f3eeff',
          200: '#e9e0ff',
          300: '#d7c7ff',
          400: '#bda2ff',
          500: '#a17aff',
          600: '#8953f6',
          700: '#783ee0',
          800: '#6433be',
          900: '#532b9c',
        },
        warmth: {
          50: '#fffbf5',
          100: '#fff6ea',
          200: '#ffecd0',
          300: '#fedaa8',
          400: '#fdbf72',
          500: '#f99d3d',
          600: '#ea7f21',
          700: '#c26218',
          800: '#9b4d1a',
          900: '#7d401a',
        },
        care: {
          50: '#fff5f5',
          100: '#ffe8e8',
          200: '#ffd6d6',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
        'soft-lg': '0 10px 25px -3px rgba(0, 0, 0, 0.05), 0 4px 10px -2px rgba(0, 0, 0, 0.03)',
        'calm-glow': '0 0 20px rgba(82, 159, 144, 0.15)',
        'crisis-glow': '0 0 25px rgba(239, 68, 68, 0.2)',
      },
      animation: {
        'breathe-in-out': 'breathe 19s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '21%': { transform: 'scale(1.45)', opacity: '1' },
          '58%': { transform: 'scale(1.45)', opacity: '0.95' },
          '100%': { transform: 'scale(1)', opacity: '0.8' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
