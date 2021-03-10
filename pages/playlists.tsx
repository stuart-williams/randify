import { List, ListItem } from "@chakra-ui/react";
import { getPlaylists, Playlist } from "common/spotify";
import Layout from "components/Layout";
import PlaylistItem from "components/PlaylistItem";
import RandomisingModal from "components/RandomisingModal";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/client";
import Error from "next/error";
import React from "react";
import { RecoilRoot } from "recoil";

interface Props {
  playlists?: Playlist[];
  statusCode?: number;
}

const Page: NextPage<Props> = ({ playlists, statusCode }) => {
  if (statusCode || !playlists) {
    return <Error statusCode={statusCode || 500} />;
  }

  return (
    <RecoilRoot>
      <Layout>
        <RandomisingModal />
        <List spacing={3}>
          {playlists.map((playlist) => (
            <ListItem key={playlist.id}>
              <PlaylistItem playlist={playlist} />
            </ListItem>
          ))}
        </List>
      </Layout>
    </RecoilRoot>
  );
};

const redirect = {
  destination: "/",
  permanent: false,
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return { redirect };
  }

  try {
    return {
      props: {
        playlists: await getPlaylists(session),
      },
    };
  } catch (error) {
    if (error.status === 401) {
      return { redirect };
    }

    return {
      props: {
        statusCode: error.status,
      },
    };
  }
};

export default Page;
