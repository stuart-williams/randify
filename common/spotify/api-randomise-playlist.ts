import move from "array-move";
import request from "common/spotify/request";
import { shuffle } from "lodash";
import { Session } from "next-auth/client";

export const randomisePlaylist = async (
  id: string,
  session: Session
): Promise<void> => {
  const playlist = await request<SpotifyApi.PlaylistObjectFull>({
    path: `playlists/${id}`,
    session,
    debug: false,
  });

  const origIDs = playlist.tracks.items.map((item) => item.track.id);
  const randIDs = shuffle(origIDs);
  const iterator = origIDs[Symbol.iterator]();

  const next = async (snapshotId?: string): Promise<void> => {
    const { done, value } = iterator.next();

    if (done) {
      return Promise.resolve();
    }

    const fr = origIDs.indexOf(value);
    const to = randIDs.indexOf(value);

    const data = await request<SpotifyApi.ReorderPlaylistTracksResponse>({
      path: `playlists/${id}/tracks`,
      session,
      debug: false,
      init: {
        method: "PUT",
        body: JSON.stringify({
          range_start: fr,
          insert_before: to > fr ? to + 1 : to,
          snapshot_id: snapshotId,
        }),
      },
    });

    move.mutate(origIDs, fr, to);

    return next(data.snapshot_id);
  };

  await next();
};

export default {};
