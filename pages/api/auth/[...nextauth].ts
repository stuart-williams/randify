import { getRefreshedToken } from "common/spotify";
import { addSeconds, isAfter, parseISO } from "date-fns";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { User } from "next-auth";
import Providers from "next-auth/providers";

const scopes = [
  "playlist-read-private",
  "playlist-modify-private",
  "playlist-modify-public",
  "playlist-read-collaborative",
];

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> =>
  NextAuth(req, res, {
    providers: [
      Providers.Spotify({
        clientId: String(process.env.SPOTIFY_CLIENT_ID),
        clientSecret: String(process.env.SPOTIFY_CLIENT_SECRET),
        scope: scopes.join(" "),
      }),
    ],
    secret: String(process.env.SECRET),
    session: {
      jwt: true,
    },
    callbacks: {
      async jwt(_token, _, account) {
        const token = _token;

        if (account) {
          token.expiresAt = addSeconds(new Date(), account.expires_in);
          token.accessToken = account.accessToken;
          token.refreshToken = account.refreshToken;
        }

        // Spotify token has expired so attempt to refresh
        if (isAfter(new Date(), parseISO(token.expiresAt))) {
          try {
            const { expiresIn, accessToken } = await getRefreshedToken(
              token.refreshToken
            );

            token.expiresAt = addSeconds(new Date(), expiresIn);
            token.accessToken = accessToken;
          } catch (error) {
            //
          }
        }

        return token;
      },
      async session(session, token: User & { accessToken: string }) {
        if (token) {
          return {
            ...session,
            accessToken: token.accessToken,
          };
        }

        return session;
      },
    },
    pages: {
      signIn: "/signin",
    },
    debug: false,
  });

export default handler;
