import * as log from "common/logger";
import { randomisePlaylist } from "common/spotify";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const id = String(req.query.id);
  const url = `${process.env.API_URL}/randomise/${id}`;
  const session = await getSession({ req });

  log.http(`--> ${url}`);

  if (!session) {
    log.http(`<-- ${url} 401 Unauthorized`);
    res.status(401).end();
    return;
  }

  try {
    await randomisePlaylist(id, session);

    log.http(`<-- ${url} 204 No Content`);
    res.status(204).end();
  } catch (error) {
    const status = error.status || 500;

    log.http(`<-- ${url} ${status} ${error.message}`);
    res.status(status).end();
  }
};
