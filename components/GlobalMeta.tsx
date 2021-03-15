/* eslint-disable react/jsx-props-no-spreading */
import seo from "common/seo";
import { DefaultSeo } from "next-seo";
import Head from "next/head";
import React, { FunctionComponent } from "react";

const GlobalMeta: FunctionComponent = () => (
  <>
    <Head>
      <link rel="manifest" href="/manifest.json" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#0d0d0d" />
      <link rel="apple-touch-icon" href="/images/maskable_icon_x192.png" />
    </Head>
    <DefaultSeo {...seo} />
  </>
);

export default GlobalMeta;
