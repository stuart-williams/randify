import * as spotify from "common/spotify";
import createError from "http-errors";
import auth from "next-auth/client";
import { createMocks } from "node-mocks-http";
import handler from "pages/api/randomise/[id]";

jest.mock("next-auth/client");

jest.mock("common/spotify");

describe("/api/randomise/[id]", () => {
  beforeEach(() => {
    auth.getSession = jest.fn().mockResolvedValue("session_1");
    (spotify.randomisePlaylist as jest.Mock) = jest.fn();
  });

  it("should handle successful randomise", async () => {
    expect.assertions(2);

    const { req, res } = createMocks({
      method: "GET",
      query: {
        id: "playlist_1",
      },
    });

    await handler(req, res);

    expect(spotify.randomisePlaylist).toHaveBeenCalledWith(
      "playlist_1",
      "session_1"
    );

    expect(res.statusCode).toEqual(204);
  });

  it("should handle unauthorised", async () => {
    expect.assertions(1);

    auth.getSession = jest.fn().mockResolvedValue(null);

    const { req, res } = createMocks({
      method: "GET",
      query: {
        id: "playlist_1",
      },
    });

    await handler(req, res);

    expect(res.statusCode).toEqual(401);
  });

  it("should handle unsuccessful randomise", async () => {
    expect.assertions(1);

    (spotify.randomisePlaylist as jest.Mock) = jest.fn(() => {
      throw createError(403);
    });

    const { req, res } = createMocks({
      method: "GET",
      query: {
        id: "playlist_1",
      },
    });

    await handler(req, res);

    expect(res.statusCode).toEqual(403);
  });
});
