import { randomisingState } from "common/atoms";
import * as log from "common/logger";
import { Playlist } from "common/spotify";
import createError from "http-errors";
import { useRecoilState } from "recoil";

const useRandomise = (
  playlist: Playlist
): {
  error: Error | null;
  isLoading: boolean;
  randomise: () => Promise<void>;
} => {
  const [state, setState] = useRecoilState(randomisingState);

  const randomise = async () => {
    if (state.isLoading) {
      return;
    }

    setState({
      playlist,
      isLoading: true,
      error: null,
    });

    try {
      const url = `${process.env.API_URL}/randomise/${playlist.id}`;

      log.http(`--> ${url}`);

      const res = await fetch(url, { method: "PUT" });

      log.http(`<-- ${url} ${res.status} ${res.statusText}`);

      if (!res.ok) {
        throw createError(res.status, res.statusText);
      }

      setState({
        playlist,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState({
        playlist,
        isLoading: false,
        error,
      });
    }
  };

  return {
    error: state.error,
    isLoading: state.isLoading && state.playlist?.id === playlist.id,
    randomise,
  };
};

export default useRandomise;
