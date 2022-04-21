import { AppProps } from 'next/app';
import '../styles/globals.scss';
import { PrismicProvider } from '@prismicio/react';
import { client } from '../services/prismic';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <PrismicProvider client={client}>
      <Component {...pageProps} />
    </PrismicProvider>
  );
}

export default MyApp;
