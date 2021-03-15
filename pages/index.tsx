import Layout from "components/Layout";
import SpotifyAuthButton from "components/SpotifyAuthButton";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/client";
import React from "react";

const Page: NextPage = () => (
  <Layout flex={1} display="flex" alignItems="center" justifyContent="center">
    <SpotifyAuthButton />
  </Layout>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/playlists",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Page;
