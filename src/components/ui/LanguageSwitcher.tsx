import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import setLanguage from 'next-translate/setLanguage';
import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';
import { LANGUAGE_EN, LANGUAGE_VN } from 'src/constants/constants';
import { setLocale } from 'src/libs/languageUtils';

import { Icon } from '../icons';

export default function LanguageSwitcher() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { t, lang } = useTranslation('common');
  const handleChangeLanguage = React.useCallback((language: string) => {
    setLanguage(language);
    setLocale(language);
  }, []);

  return (
    <Box>
      <div>
        <Button
          id='basic-button'
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          startIcon={<Icon name='language' />}
        >
          {t(lang)}
        </Button>
        <Menu
          id='basic-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem
            onClick={() => {
              handleChangeLanguage(LANGUAGE_VN);
              handleClose();
            }}
          >
            Tiếng việt
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleChangeLanguage(LANGUAGE_EN);
              handleClose();
            }}
          >
            English
          </MenuItem>
        </Menu>
      </div>
    </Box>
  );

  // return (
  //   // <PopupState variant='popover' popupId='demo-popup-menu'>
  //   //   {(popupState) => (
  //   //     <React.Fragment>
  //   //       <Button variant='text' {...bindTrigger(popupState)} endIcon={<Icon name='language' />}>
  //   //         {t(lang)}
  //   //       </Button>
  //   //       <Menu {...bindMenu(popupState)}>
  //   //         <MenuItem
  //   //           onClick={() => {
  //   //             handleChangeLanguage(LANGUAGE_VN);
  //   //             popupState.close();
  //   //           }}
  //   //         >
  //   //           Tiếng việt
  //   //         </MenuItem>
  //   //         <MenuItem
  //   //           onClick={() => {
  //   //             handleChangeLanguage(LANGUAGE_EN);
  //   //             popupState.close();
  //   //           }}
  //   //         >
  //   //           English
  //   //         </MenuItem>
  //   //       </Menu>
  //   //     </React.Fragment>
  //   //   )}
  //   // </PopupState>
  // );
}
