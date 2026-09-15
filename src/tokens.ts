export const semanticThemes = {
  light: {
    background: '#FFFFFF', foreground: '#0A0A0A',
    card: '#FFFFFF', cardForeground: '#0A0A0A',
    popover: '#FFFFFF', popoverForeground: '#0A0A0A',
    primary: '#ffb224', primaryForeground: '#171717',
    secondary: '#F5F5F5', secondaryForeground: '#171717',
    muted: '#F5F5F5', mutedForeground: '#737373',
    accent: '#F5F5F5', accentForeground: '#171717',
    destructive: '#E7000B', destructiveForeground: '#FFFFFF',
    border: '#E5E5E5', input: '#E5E5E5', ring: '#A1A1A1',
    chart1: '#F54900', chart2: '#009689', chart3: '#104E64', chart4: '#F2B800', chart5: '#E17100',
    sidebar: '#FAFAFA', sidebarForeground: '#0A0A0A',
    sidebarPrimary: '#ffb224', sidebarPrimaryForeground: '#171717',
    sidebarAccent: '#F5F5F5', sidebarAccentForeground: '#171717',
    sidebarBorder: '#E5E5E5', sidebarRing: '#A1A1A1',
  },
  dark: {
    background: '#0A0A0A', foreground: '#FAFAFA',
    card: '#171717', cardForeground: '#FAFAFA',
    popover: '#171717', popoverForeground: '#FAFAFA',
    primary: '#ffb224', primaryForeground: '#171717',
    secondary: '#262626', secondaryForeground: '#FAFAFA',
    muted: '#262626', mutedForeground: '#A1A1A1',
    accent: '#262626', accentForeground: '#FAFAFA',
    destructive: '#FF6467', destructiveForeground: '#171717',
    border: '#262626', input: '#404040', ring: '#737373',
    chart1: '#1447E6', chart2: '#00BC7D', chart3: '#E17100', chart4: '#AD46FF', chart5: '#F6339A',
    sidebar: '#171717', sidebarForeground: '#FAFAFA',
    sidebarPrimary: '#1447E6', sidebarPrimaryForeground: '#FAFAFA',
    sidebarAccent: '#262626', sidebarAccentForeground: '#FAFAFA',
    sidebarBorder: '#262626', sidebarRing: '#737373',
  },
} as const;

export const designTokens = {
  theme: semanticThemes,
  spacing: { xxs: 2, xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48, xxxl: 64 },
  radius: { base: 8, sm: 4, md: 6, lg: 8, xl: 12, pill: 999 },
  typography: { label: 12, body: 16, bodyLarge: 19, title: 40 },
  layout: { webMaxWidth: 1180, contentMaxWidth: 800, mobileGutter: 24, controlHeight: 52 },
  state: { disabledOpacity: 0.55, pressedOpacity: 0.85 },
} as const;

export type DesignTokens = typeof designTokens;
export type SemanticTheme = typeof semanticThemes.light | typeof semanticThemes.dark;

export function tokenNameToCssVariable(name: string): `--${string}` {
  return `--${name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`;
}

export function themeToCssVariables(theme: SemanticTheme): Record<`--${string}`, string> {
  return Object.fromEntries(Object.entries(theme).map(([name, value]) => [tokenNameToCssVariable(name), value]));
}

export function hexToHslChannels(hex: string): string {
  const value = hex.replace('#', '');
  const red = Number.parseInt(value.slice(0, 2), 16) / 255;
  const green = Number.parseInt(value.slice(2, 4), 16) / 255;
  const blue = Number.parseInt(value.slice(4, 6), 16) / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const lightness = (max + min) / 2;
  const delta = max - min;
  if (delta === 0) return `0 0% ${Math.round(lightness * 100)}%`;
  const saturation = delta / (1 - Math.abs(2 * lightness - 1));
  let hue = max === red ? ((green - blue) / delta) % 6 : max === green ? (blue - red) / delta + 2 : (red - green) / delta + 4;
  hue = Math.round(hue * 60);
  if (hue < 0) hue += 360;
  return `${hue} ${Math.round(saturation * 100)}% ${Math.round(lightness * 100)}%`;
}
