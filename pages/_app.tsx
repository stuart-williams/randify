/* eslint-disable react/jsx-props-no-spreading */
import { ChakraProvider } from "@chakra-ui/react";
import theme from "common/theme";
import Analytics from "components/Analytics";
import GlobalMeta from "components/GlobalMeta";
import { NextPage } from "next";
import { Provider } from "next-auth/client";
import { AppProps } from "next/app";
import React from "react";

const App: NextPage<AppProps> = ({ Component, pageProps }) => (
  <Provider session={pageProps.session}>
    <ChakraProvider theme={theme}>
      <GlobalMeta />
      <Analytics />
      <Component {...pageProps} />
    </ChakraProvider>
  </Provider>
);

export default App;
