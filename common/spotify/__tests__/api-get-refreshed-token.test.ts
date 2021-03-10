import { getRefreshedToken } from "common/spotify";
import { rest } from "msw";
import { setupServer } from "msw/node";
import qs from "querystring";

describe("getRefreshedToken", () => {
  const server = setupServer(
    rest.post(String(process.env.SPOTIFY_TOKEN_URL), (req, res, ctx) => {
      // Assert required request body
      expect(qs.parse(String(req.body))).toEqual({
        grant_type: "refresh_token",
        refresh_token: "refresh_token_1",
      });

      // Assert required headers
      expect(req.headers.getAllHeaders()).toEqual(
        expect.objectContaining({
          authorization: `Basic c3BvdGlmeV9jbGllbnRfaWQ6c3BvdGlmeV9jbGllbnRfc2VjcmV0`,
          "content-type": "application/x-www-form-urlencoded",
        })
      );

      return res(
        ctx.json({
          expires_in: 999,
          access_token: "access_token_1",
        })
      );
    })
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should refresh access token as expected", async () => {
    expect.assertions(3);

    const token = await getRefreshedToken("refresh_token_1");

    expect(token).toEqual({
      expiresIn: 999,
      accessToken: "access_token_1",
    });
  });

  it("should handle http errors", async () => {
    expect.assertions(2);

    server.use(
      rest.post(String(process.env.SPOTIFY_TOKEN_URL), (req, res, ctx) => {
        return res(ctx.status(401, "Unauthorized"));
      })
    );

    try {
      await getRefreshedToken("refresh_token_1");
    } catch (error) {
      expect(error.status).toEqual(401);
      expect(error.message).toEqual("Unauthorized");
    }
  });
});
