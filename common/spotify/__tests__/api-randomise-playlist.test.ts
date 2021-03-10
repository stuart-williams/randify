/* eslint-disable camelcase */
import { randomisePlaylist } from "common/spotify";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { Session } from "next-auth/client";
import { PartialDeep } from "type-fest";

jest.mock("lodash", () => ({
  ...(jest.requireActual("lodash") as any),
  shuffle: jest.fn(() => [
    "track_5",
    "track_1",
    "track_4",
    "track_3",
    "track_2",
  ]),
}));

const session: Session = {
  user: {
    name: "stuart",
  },
  expires: "",
  accessToken: "access_token_1",
};

const playlistResponse: PartialDeep<SpotifyApi.PlaylistObjectFull> = {
  tracks: {
    items: [
      { track: { id: "track_1" } },
      { track: { id: "track_2" } },
      { track: { id: "track_3" } },
      { track: { id: "track_4" } },
      { track: { id: "track_5" } },
    ],
  },
};

describe("randomisePlaylist", () => {
  let bodies: string[] = [];

  const server = setupServer(
    rest.get(
      `${process.env.SPOTIFY_API_URL}/playlists/playlist_1`,
      (req, res, ctx) => {
        // Assert required headers
        expect(req.headers.getAllHeaders()).toEqual(
          expect.objectContaining({
            authorization: "Bearer access_token_1",
          })
        );

        return res(ctx.json(playlistResponse));
      }
    ),
    rest.put(
      `${process.env.SPOTIFY_API_URL}/playlists/playlist_1/tracks`,
      (req, res, ctx) => {
        bodies.push(String(req.body));

        return res(
          ctx.json({
            snapshot_id: `snaphot_1`,
          })
        );
      }
    )
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should randomise playlist as expected", async () => {
    expect.assertions(2);

    bodies = [];

    await randomisePlaylist("playlist_1", session);

    expect(bodies).toEqual([
      JSON.stringify({
        range_start: 0,
        insert_before: 2,
      }),
      JSON.stringify({
        range_start: 1,
        insert_before: 1,
        snapshot_id: "snaphot_1",
      }),
      JSON.stringify({
        range_start: 2,
        insert_before: 4,
        snapshot_id: "snaphot_1",
      }),
      JSON.stringify({
        range_start: 3,
        insert_before: 3,
        snapshot_id: "snaphot_1",
      }),
      JSON.stringify({
        range_start: 4,
        insert_before: 0,
        snapshot_id: "snaphot_1",
      }),
    ]);
  });

  it("should handle http errors", async () => {
    expect.assertions(2);

    server.use(
      rest.get(
        `${process.env.SPOTIFY_API_URL}/playlists/playlist_1`,
        (req, res, ctx) => {
          return res(ctx.status(401, "Unauthorized"));
        }
      )
    );

    try {
      await randomisePlaylist("playlist_1", session);
    } catch (error) {
      expect(error.status).toEqual(401);
      expect(error.message).toEqual("Unauthorized");
    }
  });
});
