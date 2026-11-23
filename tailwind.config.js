/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FAF7F2', // Primary Background
          200: '#F5EFE6',
          300: '#EBDDCB',
        },
        latte: {
          50: '#F7F3ED',
          100: '#F0E8DC', // Secondary Surface
          200: '#E5D6C2',
          300: '#D5C0A5',
        },
        espresso: {
          900: '#23150F',
          800: '#3B261D', // Primary Accent
          700: '#4E3429',
          600: '#644436',
          500: '#7E5745',
        },
        terracotta: {
          light: '#DE8B72',
          DEFAULT: '#C86D51', // Secondary Accent
          dark: '#A9543B',
        },
        caramel: '#D97706',
        food: {
          veg: '#2E7D32',
          nonVeg: '#C62828',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'warm-sm': '0 2px 8px -2px rgba(59, 38, 29, 0.06), 0 1px 4px -1px rgba(59, 38, 29, 0.04)',
        'warm-md': '0 8px 24px -4px rgba(59, 38, 29, 0.08), 0 4px 12px -2px rgba(59, 38, 29, 0.05)',
        'warm-lg': '0 16px 36px -6px rgba(59, 38, 29, 0.12), 0 8px 18px -4px rgba(59, 38, 29, 0.07)',
        'warm-xl': '0 24px 48px -8px rgba(59, 38, 29, 0.16), 0 12px 24px -4px rgba(59, 38, 29, 0.1)',
        'glow': '0 0 25px rgba(200, 109, 81, 0.35)',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1', boxShadow: '0 0 0 0 rgba(198, 40, 40, 0.6)' },
          '50%': { transform: 'scale(1.08)', opacity: '0.9', boxShadow: '0 0 0 14px rgba(198, 40, 40, 0)' },
        },
        floatSubtle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s infinite cubic-bezier(0.4, 0, 0.6, 1)',
        'float-subtle': 'floatSubtle 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
