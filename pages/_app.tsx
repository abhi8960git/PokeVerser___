import { useState, useEffect } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import Loader from '@/components/Loader';

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(
    (): ReturnType<React.EffectCallback> => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 3000);

      const handleRouteChangeStart = () => {
       
          setLoading(true);
      
      };

      const handleRouteChangeComplete = () => {
        setLoading(false);
      };

      Router.events.on('routeChangeStart', handleRouteChangeStart);
      Router.events.on('routeChangeComplete', handleRouteChangeComplete);

      return () => {
        clearTimeout(timer);
        Router.events.off('routeChangeStart', handleRouteChangeStart);
        Router.events.off('routeChangeComplete', handleRouteChangeComplete);
      };
    },
    []
  );

  return (
    <NextUIProvider>
      {loading ? (
        <Loader/>
      ) : (
        <Component {...pageProps} />
      )}
    </NextUIProvider>
  );
}

export default MyApp;
