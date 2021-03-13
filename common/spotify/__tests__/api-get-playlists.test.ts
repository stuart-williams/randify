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
          height: 640,
          url: "lg.png",
          width: 640,
        },
        {
          height: 300,
          url: "md.png",
          width: 300,
        },
        {
          height: 60,
          url: "sm.png",
          width: 60,
        },
      ],
      owner: {
        id: "stuart",
        display_name: "Stuart Williams",
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
          height: 640,
          url: "lg.png",
          width: 640,
        },
        {
          height: 300,
          url: "md.png",
          width: 300,
        },
      ],
      owner: {
        id: "stuart",
        display_name: "Stuart Williams",
      },
      tracks: {
        total: 10,
      },
    },
    {
      id: "playlist_3",
      name: "Playlist 3",
      external_urls: {
        spotify: "playlist/playlist_3",
      },
      images: [
        {
          height: 640,
          url: "lg.png",
          width: 640,
        },
      ],
      owner: {
        id: "someoneelse",
        display_name: "Someone Else",
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
        imageUrl: "sm.png",
        spotifyUrl: "playlist/playlist_1",
        numberOfTracks: 32,
      },
      {
        id: "playlist_2",
        name: "Playlist 2",
        imageUrl: "md.png",
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
