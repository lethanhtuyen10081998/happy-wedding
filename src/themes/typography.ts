/**
 * Typography used in theme
 * @param {JsonObject} theme theme customization object
 */
import { TypographyOptions } from '@mui/material/styles/createTypography';

import { IThemeOption } from './types';
import variables from './variables';

export default function themeTypography(theme: IThemeOption): TypographyOptions {
  return {
    fontFamily: variables.fontFamily,
    h6: {
      color: theme.heading,
      fontWeight: 400,
      fontSize: '0.925rem',
    },

    h5: {
      color: theme.heading,
      fontWeight: 700,
      fontSize: '1rem',
    },

    h4: {
      color: theme.heading,
      fontWeight: 700,
      fontSize: '1.25rem',
    },
    h3: {
      color: theme.heading,
      fontWeight: 400,
      fontSize: '1.625rem',
    },

    h2: {
      color: theme.heading,
      fontWeight: 400,
      fontSize: '1.77689rem',
      lineHeight: 1.25,
    },

    h1: {
      fontSize: '2.5rem',
      color: theme.heading,
      fontWeight: 400,
      lineHeight: 1.25,
    },

    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
    },

    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },

    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      color: '#718d8e',
    },

    overline: {
      fontSize: '0.85rem',
      fontWeight: 400,
      color: '#718d8e',
      lineHeight: 1.66,
      textTransform: 'capitalize',
    },

    body1: {
      fontSize: '0.955rem',
      fontWeight: 400,
      lineHeight: '1.225em',
    },

    body2: {
      fontSize: '0.955rem',
      fontWeight: 400,
      lineHeight: '1.5em',
    },

    button: {
      textTransform: 'capitalize',
      fontSize: '0.955rem',
    },
  };
}
