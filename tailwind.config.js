/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#04070F',
          900: '#070C18',
          850: '#0A1020',
          800: '#0E1628',
          700: '#152036',
          600: '#1D2B45',
          500: '#2A3A57',
        },
        brand: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },
        jade: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#23B37A',
          600: '#0F9A65',
          700: '#0B7A50',
          800: '#0A5E3F',
          900: '#083F2B',
        },
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['Cairo', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '7.5xl': ['5.5rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
      },
      maxWidth: {
        container: '1200px',
        wide: '1360px',
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(to bottom, transparent, rgba(4,7,15,1)), linear-gradient(to right, rgba(148,163,184,.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,.07) 1px, transparent 1px)',
      },
      keyframes: {
        drift: {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '33%': { transform: 'translate3d(4%,-6%,0) scale(1.08)' },
          '66%': { transform: 'translate3d(-5%,4%,0) scale(0.95)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(.9)', opacity: '.7' },
          '70%': { transform: 'scale(1.6)', opacity: '0' },
          '100%': { opacity: '0' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        drift: 'drift 22s ease-in-out infinite',
        'drift-slow': 'drift 34s ease-in-out infinite',
        shimmer: 'shimmer 3.5s linear infinite',
        marquee: 'marquee var(--marquee-duration, 40s) linear infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(.4,0,.6,1) infinite',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
