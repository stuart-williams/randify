# Randify

[![Test](https://github.com/stuart-williams/randify/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/stuart-williams/randify/actions/workflows/test.yml)

## Getting Started

Set up your environment:

```bash
cp .env.local.example .env.local
```

Create a [Spotify application](https://developer.spotify.com/dashboard/applications) and add `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` to `.env.local`.

Install dependencies:

```bash
npm install
# or
yarn
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open http://localhost:3000 with your browser to see the result.
