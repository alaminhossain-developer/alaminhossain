import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          '950': '#0a0e27',
          '900': '#0f1535',
          '850': '#151c3f',
          '800': '#1a2250',
          '700': '#24318f',
        },
        cyan: {
          '400': '#00d9ff',
          '500': '#00c4ff',
          '600': '#0099ff',
        },
        emerald: {
          '400': '#00ff88',
          '500': '#00dd77',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Geist', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['Inter', 'Geist', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['3.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-md': ['2.5rem', { lineHeight: '1.2' }],
        'display-sm': ['2rem', { lineHeight: '1.3' }],
        'heading-xl': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
        'heading-lg': ['1.25rem', { lineHeight: '1.5', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body-md': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
      },
      spacing: {
        gutter: 'clamp(1rem, 5vw, 3rem)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 217, 255, 0.6)' },
        },
      },
      backdropFilter: {
        glass: 'blur(10px)',
      },
      borderWidth: {
        hairline: '0.5px',
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 217, 255, 0.3)',
        'glow-cyan-lg': '0 0 40px rgba(0, 217, 255, 0.4)',
        'inner-glass': 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(0deg, rgba(0, 217, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 217, 255, 0.03) 1px, transparent 1px)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      backgroundSize: {
        grid: '50px 50px',
      },
    },
  },
  plugins: [],
}

export default config
