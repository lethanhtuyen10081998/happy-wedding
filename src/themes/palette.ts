/**
 * Color intention that you want to used in your theme
 * @param {JsonObject} theme Theme customization object
 */

import { PaletteOptions } from '@mui/material';

import { IThemeOption } from './types';

export default function themePalette(theme: IThemeOption): PaletteOptions {
  return {
    mode: 'light',
    common: {
      black: theme.colors.common.black,
      white: theme.colors.common.white,
    },
    primary: {
      main: theme.colors.primary.main,
      dark: theme.colors.primary.dark,
      light: theme.colors.primary.light,
      contrastText: theme.colors.primary.text,
    },
    secondary: {
      main: theme.colors.secondary.main,
      light: theme.colors.secondary.light,
      dark: theme.colors.secondary.dark,
      contrastText: theme.colors.secondary.text,
    },
    error: {
      light: theme.colors.error.light,
      main: theme.colors.error.main,
      dark: theme.colors.error.dark,
    },
    warning: {
      light: theme.colors.warning.light,
      main: theme.colors.warning.main,
      dark: theme.colors.warning.dark,
    },
    success: {
      light: theme.colors.success.light,
      main: theme.colors.success.main,
      dark: theme.colors.success.dark,
    },
    info: {
      light: theme.colors.info.light,
      main: theme.colors.info.main,
      dark: theme.colors.info.dark,
    },
    grey: {
      50: theme.colors.grey[50],
      100: theme.colors.grey[100],
      200: theme.colors.grey[200],
      300: theme.colors.grey[300],
      400: theme.colors.grey[400],
      500: theme.colors.grey[500],
      600: theme.colors.grey[600],
      700: theme.colors.grey[700],
      800: theme.colors.grey[800],
      900: theme.colors.grey[900],
    },
    text: {
      primary: theme.textPrimary,
      secondary: theme.textSecondary,
      disabled: theme.colors.disable,
    },
    background: {
      default: theme.background,
      paper: '#E6E6E6',
    },
    divider: theme.divider,
    action: {
      active: theme.colors.action.active,
      disabled: theme.colors.action.disabled,
    },
  };
}
