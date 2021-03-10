import { Playlist } from "common/spotify";
import { atom } from "recoil";

export interface RandomisingState {
  error: Error | null;
  playlist: Playlist | null;
  isLoading: boolean;
}

export const randomisingState = atom<RandomisingState>({
  key: "randomisingState",
  default: {
    error: null,
    playlist: null,
    isLoading: false,
  },
});
