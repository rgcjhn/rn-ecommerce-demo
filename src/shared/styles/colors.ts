export const colors = {
  // Base colors
  white: "#ffffff",
  black: "#000000",
  transparent: "transparent",

  // Primary colors (Blue)
  primary: "#3b82f6",
  primaryLight: "#60a5fa",
  primaryDark: "#2563eb",

  // Secondary colors (Violet)
  secondary: "#8b5cf6",
  secondaryLight: "#a78bfa",
  secondaryDark: "#7c3aed",

  // Success colors (Green)
  success: "#22c55e",
  successLight: "#4ade80",
  successDark: "#16a34a",

  // Error/Danger colors (Red)
  error: "#ef4444",
  errorLight: "#f87171",
  errorDark: "#dc2626",

  // Warning colors (Amber)
  warning: "#f59e0b",
  warningLight: "#fbbf24",
  warningDark: "#d97706",

  // Info colors (Cyan)
  info: "#06b6d4",
  infoLight: "#22d3ee",
  infoDark: "#0891b2",

  // Background colors
  background: "#ffffff",
  surface: "#f9f9f9",
  surfaceDark: "#f3f4f6",

  // Text colors
  textPrimary: "#111827",
  textSecondary: "#6b7280",
  textTertiary: "#9ca3af",
  textLight: "#ffffff",
  textDark: "#1f2937",

  // Border colors
  border: "#e5e7eb",
  borderLight: "#f3f4f6",
  borderDark: "#d1d5db",

  // Shadow
  shadow: "#000000",
  shadowLight: "rgba(0, 0, 0, 0.1)",

  // Status colors
  pending: "#f59e0b",
  processing: "#3b82f6",
  completed: "#22c55e",
  cancelled: "#ef4444",

  // Neutral/Gray shades
  gray50: "#f9fafb",
  gray100: "#f3f4f6",
  gray200: "#e5e7eb",
  gray300: "#d1d5db",
  gray400: "#9ca3af",
  gray500: "#6b7280",
  gray600: "#4b5563",
  gray700: "#374151",
  gray800: "#1f2937",
  gray900: "#111827",

  // Slate shades
  slate50: "#f8fafc",
  slate100: "#f1f5f9",
  slate200: "#e2e8f0",
  slate300: "#cbd5e1",
  slate400: "#94a3b8",
  slate500: "#64748b",
  slate600: "#475569",
  slate700: "#334155",
  slate800: "#1e293b",
  slate900: "#0f172a",
} as const;

export type ColorKeys = keyof typeof colors;
