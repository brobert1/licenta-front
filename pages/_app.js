import { ErrorBoundary, ScreenSizeInfo, Toaster } from '@components';
import PlayOnlineSocketGate from '@components/Client/PlayOnlineSocketGate';
import { AnalysisEngineProvider, BotEngineProvider } from '@contexts';
import { seedChessgroundDefaults } from '@lib';
import { sitename } from '@site.config';
import Head from 'next/head';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../css/index.css';

seedChessgroundDefaults();

const Root = (props) => {
  const { Component, pageProps } = props;
  const queryClient = new QueryClient();

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return;
    }
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }, []);

  return (
    <>
      <Head>
        <title>{sitename}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, viewport-fit=cover"
        />
      </Head>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <AnalysisEngineProvider>
            <BotEngineProvider>
              <PlayOnlineSocketGate>
                <Component {...pageProps} />
              </PlayOnlineSocketGate>
              <Toaster />
              <ScreenSizeInfo />
            </BotEngineProvider>
          </AnalysisEngineProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </>
  );
};

export default Root;
