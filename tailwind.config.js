/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#fdf8f7',
        surface: '#fdf8f7',
        'surface-low': '#f7f3f1',
        'surface-container': '#f1edec',
        'surface-high': '#ece7e6',
        'on-surface': '#1c1b1b',
        'on-surface-variant': '#4d4540',
        primary: '#181512',
        'on-primary': '#ffffff',
        outline: '#7e756f',
        'outline-variant': '#cfc4bd',
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
