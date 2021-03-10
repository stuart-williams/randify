/* eslint-disable react/jsx-props-no-spreading */
import { ChakraProvider } from "@chakra-ui/react";
import seo from "common/seo";
import theme from "common/theme";
import { NextPage } from "next";
import { Provider } from "next-auth/client";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import React from "react";

const App: NextPage<AppProps> = ({ Component, pageProps }) => (
  <Provider session={pageProps.session}>
    <ChakraProvider theme={theme}>
      <DefaultSeo {...seo} />
      <Component {...pageProps} />
    </ChakraProvider>
  </Provider>
);

export default App;
