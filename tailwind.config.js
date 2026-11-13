/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        deepNavy: '#0B0F19',
        navyCard: '#111726',
        navyBorder: '#1E293B',
        marsOrange: '#FF6B35',
        marsGlow: 'rgba(255, 107, 53, 0.4)',
        moonSilver: '#E2E8F0',
        earthCyan: '#00B4D8',
        cyanGlow: 'rgba(0, 180, 216, 0.4)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite',
        'radar-spin': 'radarSpin 8s linear infinite',
      },
      keyframes: {
        radarSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
}
