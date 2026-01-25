import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
  content: {
    filesystem: [
      'src/**/*.{ts,tsx,js,jsx}',
      'index.html',
    ],
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
  ],
  theme: {
    colors: {
      // ADE 5-Color Gradient System
      amber: {
        DEFAULT: '#F59E0B',
        50: '#FEF3C7',
        100: '#FDE68A',
        200: '#FCD34D',
        300: '#FBBF24',
        400: '#F59E0B',
        500: '#D97706',
        600: '#B45309',
        700: '#92400E',
        800: '#78350F',
        900: '#451A03',
      },
      teal: {
        DEFAULT: '#14B8A6',
        50: '#F0FDFA',
        100: '#CCFBF1',
        200: '#99F6E4',
        300: '#5EEAD4',
        400: '#2DD4BF',
        500: '#14B8A6',
        600: '#0D9488',
        700: '#0F766E',
        800: '#115E59',
        900: '#134E4A',
      },
      cyan: {
        DEFAULT: '#06B6D4',
        50: '#ECFEFF',
        100: '#CFFAFE',
        200: '#A5F3FC',
        300: '#67E8F9',
        400: '#22D3EE',
        500: '#06B6D4',
        600: '#0891B2',
        700: '#0E7490',
        800: '#155E75',
        900: '#164E63',
      },
      purple: {
        DEFAULT: '#A855F7',
        50: '#FAF5FF',
        100: '#F3E8FF',
        200: '#E9D5FF',
        300: '#D8B4FE',
        400: '#C084FC',
        500: '#A855F7',
        600: '#9333EA',
        700: '#7E22CE',
        800: '#6B21A8',
        900: '#581C87',
      },
      pink: {
        DEFAULT: '#EC4899',
        50: '#FDF2F8',
        100: '#FCE7F3',
        200: '#FBCFE8',
        300: '#F9A8D4',
        400: '#F472B6',
        500: '#EC4899',
        600: '#DB2777',
        700: '#BE185D',
        800: '#9F1239',
        900: '#831843',
      },
      dark: {
        900: 'rgb(10 10 15)',
        800: 'rgb(15 15 25)',
        700: 'rgb(20 20 35)',
        600: 'rgb(30 30 50)',
        500: 'rgb(40 40 65)',
      },
    },
  },
  shortcuts: [
    // Glassmorphism
    ['glass-card', 'bg-white/3 backdrop-blur-2xl border border-white/8 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 hover:bg-white/5 hover:border-white/12 hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)] hover:-translate-y-0.5'],
    ['glass-card-premium', 'glass-card bg-gradient-to-br from-amber-500/5 via-teal-500/5 to-purple-500/5'],

    // Buttons
    ['btn-primary', 'px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-amber-500 to-teal-500 shadow-lg shadow-amber-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/50 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-500/50'],
    ['btn-secondary', 'px-8 py-4 rounded-xl font-semibold text-white bg-white/5 backdrop-blur-xl border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-teal-500/50'],
    ['btn-ghost', 'px-6 py-3 rounded-lg font-medium text-white/80 transition-all duration-300 hover:text-white hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/20'],

    // Inputs
    ['input-modern', 'w-full px-4 py-3.5 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-white placeholder:text-white/40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 hover:bg-white/8'],

    // Badges
    ['badge', 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 backdrop-blur-xl border border-white/10'],
    ['badge-gradient', 'badge bg-gradient-to-r from-amber-500/20 to-teal-500/20 border-amber-500/30'],

    // Text gradients
    ['text-gradient-amber-teal', 'bg-gradient-to-r from-amber-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent'],
    ['text-gradient-purple-pink', 'bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent'],

    // Layout
    ['container-custom', 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'],
    ['section-padding', 'py-12 sm:py-16 lg:py-24'],

    // 3D Card
    ['card-3d', 'glass-card transform-gpu transition-transform duration-600 hover:rotate-y-5 hover:rotate-x-5'],
  ],
  rules: [
    // Custom gradient mesh background
    ['gradient-mesh-bg', {
      'position': 'fixed',
      'inset': '0',
      'z-index': '0',
      'background': `
        radial-gradient(circle at 20% 50%, rgba(245, 158, 11, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(20, 184, 166, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 40% 20%, rgba(6, 182, 212, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 20% 80%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)
      `,
      'animation': 'gradient-rotate 20s ease infinite',
    }],
  ],
  safelist: [
    'text-amber-400',
    'text-teal-400',
    'text-purple-400',
    'text-cyan-400',
    'text-pink-400',
  ],
})
