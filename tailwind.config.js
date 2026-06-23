/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--color-background) / <alpha-value>)',
        surface: 'rgb(var(--color-background) / <alpha-value>)',
        'surface-low': 'rgb(var(--color-surface-low) / <alpha-value>)',
        'surface-container': 'rgb(var(--color-surface-container) / <alpha-value>)',
        'surface-high': 'rgb(var(--color-surface-high) / <alpha-value>)',
        'on-surface': 'rgb(var(--color-on-surface) / <alpha-value>)',
        'on-surface-variant': 'rgb(var(--color-on-surface-variant) / <alpha-value>)',
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        'on-primary': 'rgb(var(--color-on-primary) / <alpha-value>)',
        outline: 'rgb(var(--color-outline) / <alpha-value>)',
        'outline-variant': 'rgb(var(--color-outline-variant) / <alpha-value>)',
        error: '#ba1a1a',
      },
      fontFamily: {
        garamond: ['EBGaramond_500Medium'],
        'garamond-italic': ['EBGaramond_500Medium_Italic'],
        franklin: ['LibreFranklin_400Regular'],
        'franklin-medium': ['LibreFranklin_500Medium'],
        work: ['WorkSans_400Regular'],
        'work-medium': ['WorkSans_500Medium'],
      },
      borderRadius: {
        interactive: '4px',
      },
    },
  },
  plugins: [],
};
