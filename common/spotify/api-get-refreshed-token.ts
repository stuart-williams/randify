import btoa from "btoa";
import * as log from "common/logger";
import createError from "http-errors";
import qs from "querystring";

interface RefreshedToken {
  expiresIn: number;
  accessToken: string;
}

export const getRefreshedToken = async (
  refreshToken: string
): Promise<RefreshedToken> => {
  const url = String(process.env.SPOTIFY_TOKEN_URL);

  const password = btoa(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  );

  log.http(`--> ${url}`);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${password}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  log.http(`<-- ${url} ${res.status} ${res.statusText}`);

  if (res.ok) {
    const token = await res.json();

    return {
      expiresIn: token.expires_in,
      accessToken: token.access_token,
    };
  }

  throw createError(res.status, res.statusText);
};

export default {};
