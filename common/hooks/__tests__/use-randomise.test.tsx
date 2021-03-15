import { act, renderHook } from "@testing-library/react-hooks";
import useRandomise from "common/hooks/use-randomise";
import { Playlist } from "common/spotify";
import { rest } from "msw";
import { setupServer } from "msw/node";
import React, { FunctionComponent } from "react";
import { RecoilRoot } from "recoil";

const playlist: Playlist = {
  id: "playlist_1",
  name: "Playlist 1",
  imageUrl: "sm.png",
  spotifyUrl: "playlist/playlist_1",
  numberOfTracks: 32,
};

const wrapper: FunctionComponent = ({ children }) => (
  <RecoilRoot>{children}</RecoilRoot>
);

describe("useRandomise", () => {
  const server = setupServer(
    rest.put(`${process.env.API_URL}/randomise/playlist_1`, (req, res, ctx) => {
      return res(ctx.status(204));
    })
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should randomise as expected", async () => {
    expect.assertions(4);

    const { result, waitForNextUpdate } = renderHook(
      () => useRandomise(playlist),
      {
        wrapper,
      }
    );

    expect(result.current.isLoading).toEqual(false);

    act(() => {
      result.current.randomise();
    });

    expect(result.current.isLoading).toEqual(true);

    await waitForNextUpdate();

    expect(result.current.isLoading).toEqual(false);
    expect(result.current.error).toEqual(null);
  });

  it("should handle http errors", async () => {
    expect.assertions(2);

    server.use(
      rest.put(
        `${process.env.API_URL}/randomise/playlist_1`,
        (req, res, ctx) => {
          return res(ctx.status(401));
        }
      )
    );

    const { result, waitForNextUpdate } = renderHook(
      () => useRandomise(playlist),
      {
        wrapper,
      }
    );

    act(() => {
      result.current.randomise();
    });

    await waitForNextUpdate();

    expect(result.current.isLoading).toEqual(false);
    expect(result.current.error?.message).toEqual("Unauthorized");
  });
});
