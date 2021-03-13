import request from "common/spotify/request";
import { Session } from "next-auth/client";

export interface Playlist {
  id: string;
  name: string;
  imageUrl: string;
  spotifyUrl: string;
  numberOfTracks: number;
}

const getAllPlaylists = async (
  session: Session
): Promise<SpotifyApi.PlaylistObjectSimplified[]> => {
  const next = async (
    offset: number,
    playlists: SpotifyApi.PlaylistObjectSimplified[]
  ): Promise<SpotifyApi.PlaylistObjectSimplified[]> => {
    const data = await request<SpotifyApi.ListOfCurrentUsersPlaylistsResponse>({
      path: `me/playlists?limit=50&offset=${offset}`,
      session,
    });

    const items = [...playlists, ...data.items];

    if (data.total > items.length) {
      return next(items.length - 1, items);
    }

    return items;
  };

  return next(0, []);
};

const isValid = (
  item: SpotifyApi.PlaylistObjectSimplified,
  session: Session
): boolean =>
  item.owner.display_name === session.user.name &&
  item.tracks.total > 0 &&
  item.images.length > 0;

export const getPlaylists = async (session: Session): Promise<Playlist[]> => {
  const playlists = await getAllPlaylists(session);

  return playlists.reduce<Playlist[]>((items, item) => {
    if (isValid(item, session)) {
      const playlist: Playlist = {
        id: item.id,
        name: item.name,
        imageUrl: item.images[0].url,
        spotifyUrl: item.external_urls.spotify,
        numberOfTracks: item.tracks.total,
      };

      return [...items, playlist];
    }

    return items;
  }, []);
};
