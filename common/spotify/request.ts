import * as log from "common/logger";
import createError from "http-errors";
import { merge } from "lodash";
import { Session } from "next-auth/client";

interface ApiOptions {
  path: string;
  session: Session;
  init?: RequestInit;
  debug?: boolean;
}

const request = async <T>({
  path,
  session,
  init = {},
  debug = true,
}: ApiOptions): Promise<T> => {
  const url = `${process.env.SPOTIFY_API_URL}/${path}`;

  if (debug) {
    log.http(`--> ${url}`);
  }

  const res = await fetch(
    url,
    merge(init, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    })
  );

  if (debug) {
    log.http(`<-- ${url} ${res.status} ${res.statusText}`);
  }

  if (res.ok) {
    return res.json() as Promise<T>;
  }

  throw createError(res.status, res.statusText);
};

export default request;
