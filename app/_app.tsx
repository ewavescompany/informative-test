import { AppProps } from "next/app";

import "../styles/globals.css"; // Import global styles (if any)

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
