import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    extend: {
      colors: {
        theme: '#fca211',
        'theme-light': '#FFFBEA',

        'base-50': '#F6F6F6',
        'base-100': '#E7E7E7',
        'base-200': '#D1D1D1',

        primary: '#0D6EFD',
        success: '#22BB33',
        danger: '#DC3545',

        disabled: '#E5E5ED',
        'disabled-dark': '#6B6E78',
      },
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
      },
    },
  },
  plugins: [],
}
export default config
