import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#3772ff',
        skySoft: '#eef5ff',
        slateSoft: '#0f172a'
      },
      boxShadow: {
        soft: '0 25px 80px rgba(15, 23, 42, 0.08)'
      },
      backgroundImage: {
        'hero-fade': 'linear-gradient(180deg, rgba(15,23,42,0.08) 0%, rgba(255,255,255,0.85) 100%)'
      }
    }
  },
  plugins: []
};

export default config;
