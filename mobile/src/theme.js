export const theme = {
  colors: {
    background: '#0a0a0a',
    surface: '#121212',
    surfaceContainer: 'rgba(255, 255, 255, 0.02)',
    surfaceContainerLow: 'rgba(255, 255, 255, 0.01)',
    primary: '#1c1c1c',
    primaryHover: '#2a2a2a',
    cyanAccent: '#00ffff',
    cyanMuted: 'rgba(0, 255, 255, 0.3)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.6)',
    textMuted: 'rgba(255, 255, 255, 0.4)',
    border: 'rgba(255, 255, 255, 0.1)',
    error: '#ff3333',
    success: '#00cc66',
    tabBackground: 'rgba(10, 10, 10, 0.8)',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 64,
  },
  typography: {
    fontFamily: 'System', // Replace with a custom font if desired
    h1: {
      fontSize: 48,
      fontWeight: '700',
      color: '#ffffff',
      letterSpacing: -1,
    },
    h2: {
      fontSize: 24,
      fontWeight: '600',
      color: '#ffffff',
      letterSpacing: -0.5,
    },
    body: {
      fontSize: 16,
      color: 'rgba(255, 255, 255, 0.6)',
      lineHeight: 24,
    },
    label: {
      fontSize: 12,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 1,
      color: 'rgba(255, 255, 255, 0.4)',
    },
  },
};
