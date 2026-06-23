import { vars } from 'nativewind';

export const THEME_CSS_VARS = {
  '--color-background': '253 248 247',
  '--color-surface-low': '247 243 241',
  '--color-surface-container': '241 237 236',
  '--color-surface-high': '236 231 230',
  '--color-on-surface': '28 27 27',
  '--color-on-surface-variant': '77 69 64',
  '--color-primary': '24 21 18',
  '--color-on-primary': '255 255 255',
  '--color-outline': '126 117 111',
  '--color-outline-variant': '207 196 189',
} as const;

export const themeVars = vars(THEME_CSS_VARS);
