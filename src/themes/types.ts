export interface IThemeOption {
  colors: Color;
  heading: string;
  paper: string;
  background: string;
  textPrimary: string;
  textSecondary: string;
  divider: string;
}

export type Color = {
  primary: {
    light: string;
    main: string;
    dark: string;
    text: string;
  };
  secondary: {
    light: string;
    main: string;
    dark: string;
    text: string;
  };
  error: {
    light: string;
    main: string;
    dark: string;
    text: string;
  };
  warning: {
    light: string;
    main: string;
    dark: string;
    text: string;
  };
  success: {
    light: string;
    main: string;
    dark: string;
    text: string;
  };
  info: {
    light: string;
    main: string;
    dark: string;
    text: string;
  };
  orange?: {
    light: string;
    main: string;
    dark: string;
    text: string;
  };
  grey: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  common: {
    white: string;
    black: string;
  };
  divider: string;
  transparent: string;
  disable: string;
  action: {
    active: string;
    disabled: string;
  };
};
