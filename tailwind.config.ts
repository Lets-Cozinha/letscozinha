import defaultTheme from 'tailwindcss/defaultTheme';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
    },
    fontFamily: {
      heading: [
        'var(--font-playfair-display)',
        ...defaultTheme.fontFamily.serif,
      ],
      body: ['var(--font-lora)', ...defaultTheme.fontFamily.serif],
    },
    extend: {
      borderRadius: {
        DEFAULT: '4px',
      },
      colors: {
        primary: '#FAB200',
        secondary: '#D8110D',
        accent: '#4CAF50',
        neutral: '#FFFFFF',
        muted: 'rgb(243 244 246)',
        text: {
          light: '#737373',
          dark: '#333333',
        },
      },
      spacing: {
        none: '0',
        xs: '0.25rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '4rem',
        '2xl': '8rem',
        'image-sm': '8rem',
        'image-lg': '42rem',
        article: '800px',
      },
    },
  },
  plugins: [
    function ({ addComponents, theme }: any) {
      addComponents({
        '.container': {
          maxWidth: '80rem', // 1280px
        },
      });
    },
  ],
};

export default config;
