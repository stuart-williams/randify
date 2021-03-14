// TODO: UPDATE TESTS!

import { getPlaylists } from "common/spotify";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { Session } from "next-auth/client";
import { PartialDeep } from "type-fest";

const session: Session = {
  user: {
    name: "stuart",
  },
  expires: "",
  accessToken: "access_token_1",
};

const playlistsResponse: PartialDeep<SpotifyApi.ListOfCurrentUsersPlaylistsResponse> = {
  items: [
    {
      id: "playlist_1",
      name: "Playlist 1",
      external_urls: {
        spotify: "playlist/playlist_1",
      },
      images: [
        {
          url: "640.png",
        },
        {
          url: "300.png",
        },
      ],
      owner: {
        display_name: "stuart",
      },
      tracks: {
        total: 32,
      },
    },
    {
      id: "playlist_2",
      name: "Playlist 2",
      external_urls: {
        spotify: "playlist/playlist_2",
      },
      images: [
        {
          url: "300.png",
        },
      ],
      owner: {
        display_name: "stuart",
      },
      tracks: {
        total: 10,
      },
    },
    {
      id: "playlist_3",
      name: "Not my Playlist",
      external_urls: {
        spotify: "playlist/playlist_3",
      },
      images: [
        {
          url: "640.png",
        },
      ],
      owner: {
        display_name: "someoneelse",
      },
      tracks: {
        total: 10,
      },
    },
    {
      id: "playlist_4",
      name: "Empty Playlist",
      external_urls: {
        spotify: "playlist/playlist_4",
      },
      images: [
        {
          url: "640.png",
        },
      ],
      owner: {
        display_name: "stuart",
      },
      tracks: {
        total: 0,
      },
    },
    {
      id: "playlist_5",
      name: "No Images Playlist",
      external_urls: {
        spotify: "playlist/playlist_5",
      },
      images: [],
      owner: {
        display_name: "stuart",
      },
      tracks: {
        total: 10,
      },
    },
  ],
};

describe("getPlaylists", () => {
  const server = setupServer(
    rest.get(`${process.env.SPOTIFY_API_URL}/me/playlists`, (req, res, ctx) => {
      // Assert required headers
      expect(req.headers.getAllHeaders()).toEqual(
        expect.objectContaining({
          authorization: "Bearer access_token_1",
        })
      );

      return res(ctx.json(playlistsResponse));
    })
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should return playlists as expected", async () => {
    expect.assertions(2);

    const playlists = await getPlaylists(session);

    expect(playlists).toEqual([
      {
        id: "playlist_1",
        name: "Playlist 1",
        imageUrl: "640.png",
        spotifyUrl: "playlist/playlist_1",
        numberOfTracks: 32,
      },
      {
        id: "playlist_2",
        name: "Playlist 2",
        imageUrl: "300.png",
        spotifyUrl: "playlist/playlist_2",
        numberOfTracks: 10,
      },
    ]);
  });

  it("should handle http errors", async () => {
    expect.assertions(2);

    server.use(
      rest.get(
        `${process.env.SPOTIFY_API_URL}/me/playlists`,
        (req, res, ctx) => {
          return res(ctx.status(401, "Unauthorized"));
        }
      )
    );

    try {
      await getPlaylists(session);
    } catch (error) {
      expect(error.status).toEqual(401);
      expect(error.message).toEqual("Unauthorized");
    }
  });
});
