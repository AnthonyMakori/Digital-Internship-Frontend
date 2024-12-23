import { MantineProvider } from '@mantine/core';
import "../styles/globals.css"
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      theme={{
        /** Customize your theme here */
      }}
    >
      <Component {...pageProps} />
    </MantineProvider>
  );
}
