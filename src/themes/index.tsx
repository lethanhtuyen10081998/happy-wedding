import { createTheme, ThemeOptions } from '@mui/material/styles';
import { TypographyOptions } from '@mui/material/styles/createTypography';
import colors from 'src/assets/_themes-vars.module.scss';

import componentStyleOverrides from './compStyleOverride';
import { IThemeOption } from './types';
import themeTypography from './typography';

const theme = () => {
  const color = colors;

  const themeOption: IThemeOption = {
    colors: {
      common: {
        white: color.white,
        black: color.black,
      },
      primary: {
        dark: color.primaryDark,
        light: color.primaryLight,
        main: color.primaryMain,
        text: color.textPrimary,
      },
      secondary: {
        dark: color.secondaryDark,
        light: color.secondaryLight,
        main: color.secondaryMain,
        text: color.textSecondary,
      },
      error: {
        dark: color.errorDark,
        light: color.errorLight,
        main: color.errorMain,
        text: color.textError,
      },
      success: {
        dark: color.successDark,
        light: color.successLight,
        main: color.successMain,
        text: color.textSuccess,
      },
      warning: {
        dark: color.warningDark,
        light: color.warningLight,
        main: color.warningMain,
        text: color.textWarning,
      },
      info: {
        dark: color.infoDark,
        light: color.infoLight,
        main: color.infoMain,
        text: color.textInfo,
      },
      orange: {
        dark: color.infoDark,
        light: color.infoLight,
        main: color.infoMain,
        text: color.textInfo,
      },
      grey: {
        50: color.grey50,
        100: color.grey100,
        200: color.grey200,
        300: color.grey300,
        400: color.grey400,
        500: color.grey500,
        600: color.grey600,
        700: color.grey700,
        800: color.grey800,
        900: color.grey900,
      },
      divider: color.divider,
      transparent: color.transparent,
      disable: color.disable,
      action: {
        active: color.actionActive,
        disabled: color.actionDisabled,
      },
    },
    paper: color.paper,
    divider: color.divider,
    heading: color.text,
    textPrimary: color.text,
    textSecondary: color.textSecondary,
    background: color.backgroundDefault,
  };

  const themeOptions: ThemeOptions = {
    direction: 'ltr',
    palette: {
      common: {
        white: color.white,
        black: color.black,
      },
      primary: {
        dark: color.primaryDark,
        light: color.primaryLight,
        main: color.primaryMain,
        contrastText: color.textPrimary,
      },
      secondary: {
        dark: color.secondaryDark,
        light: color.secondaryLight,
        main: color.secondaryMain,
        contrastText: color.textSecondary,
      },
      error: {
        dark: color.errorDark,
        light: color.errorLight,
        main: color.errorMain,
        contrastText: color.textError,
      },
      success: {
        dark: color.successDark,
        light: color.successLight,
        main: color.successMain,
        contrastText: color.textSuccess,
      },
      warning: {
        dark: color.warningDark,
        light: color.warningLight,
        main: color.warningMain,
        contrastText: color.textWarning,
      },
      text: {
        primary: color.text,
      },
    },
    mixins: {
      toolbar: {
        minHeight: '48px',
        padding: '16px',
        '@media (min-width: 600px)': {
          minHeight: '48px',
        },
      },
    },
    typography: themeTypography(themeOption) as TypographyOptions,
    shape: {
      borderRadius: 5,
    },
  };

  const themes = createTheme(themeOptions);

  // Disable the below line if you want to reject customized style
  themes.components = componentStyleOverrides(themeOption);

  return themes;
};

export default theme;
