import request from "common/spotify/request";
import { sortBy } from "lodash";
import { Session } from "next-auth/client";

export interface Playlist {
  id: string;
  name: string;
  imageUrl: string;
  spotifyUrl: string;
  numberOfTracks: number;
}

export const getPlaylists = async (session: Session): Promise<Playlist[]> => {
  const data = await request<SpotifyApi.ListOfCurrentUsersPlaylistsResponse>({
    path: "me/playlists",
    session,
  });

  return data.items.reduce<Playlist[]>((accum, item) => {
    if (item.owner.id === session.user.name) {
      const playlist: Playlist = {
        id: item.id,
        name: item.name,
        imageUrl: sortBy(item.images, "width")[0].url,
        spotifyUrl: item.external_urls.spotify,
        numberOfTracks: item.tracks.total,
      };

      return [...accum, playlist];
    }

    return accum;
  }, []);
};
