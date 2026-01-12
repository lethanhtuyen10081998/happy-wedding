/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable max-len */
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { Provider } from 'react-redux';
import 'src/assets/themes.scss';
import AlertContainer from 'src/components/material/Alert/alertContainer';
import PageLoading from 'src/components/PageLoading';
import { queryClient } from 'src/config/reactQuery';
import { ProfileContextProvider } from 'src/context/profileContext/provider';
import AdminLayout from 'src/layout/AdminLayout';
import MainLayoutContainer from 'src/layout/MainLayout/MainLayout';
import getLocale, { useSetLocale } from 'src/libs/languageUtils';
import { store } from 'src/redux/store';
import themes from 'src/themes';

import nextI18NextConfig from '../../next-i18next.config.js';

const locale = getLocale();

const PickLayout = ({
  children,
  isPublicLayout,
  isAdminLayout,
}: {
  children: React.ReactChild;
  isPublicLayout?: boolean;
  isAdminLayout?: boolean;
}) => {
  if (isAdminLayout) {
    return <AdminLayout>{children}</AdminLayout>;
  }

  return <MainLayoutContainer>{children}</MainLayoutContainer>;
};

function App({ Component, pageProps, router }: AppProps) {
  useSetLocale();

  return (
    <>
      <Head>
        <link rel='shortcut icon' href='/fav-icon.svg' />
        <link rel='manifest' href='/manifest.json' crossOrigin='use-credentials' />

        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        <link href='https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap' rel='stylesheet'></link>
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        <link href='https://fonts.googleapis.com/css2?family=Atma:wght@300;400;500;600;700&display=swap' rel='stylesheet' />

        <link rel='preconnect' href='https://fonts.googleapis.com' crossOrigin='anonymous' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        <link
          href='https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap'
          rel='stylesheet'
          crossOrigin='anonymous'
        />

        <link rel='preconnect' href='https://fonts.googleapis.com' crossOrigin='anonymous' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        <link
          href='https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&display=swap'
          rel='stylesheet'
          crossOrigin='anonymous'
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} buttonPosition='bottom-left' />

        <Provider store={store}>
          <ProfileContextProvider>
            <ThemeProvider theme={themes()}>
              <CssBaseline />
              <AlertContainer />

              <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <PageLoading />
                <PickLayout isAdminLayout={router.pathname.includes('/admin')}>
                  <Component {...pageProps} />
                </PickLayout>
              </SnackbarProvider>
            </ThemeProvider>
          </ProfileContextProvider>
        </Provider>
      </QueryClientProvider>
    </>
  );
}

export default appWithTranslation(App, { ...nextI18NextConfig, lng: locale });
