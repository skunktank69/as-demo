import { NextRequest, NextResponse } from "next/server";

// -----------------------------
// STEP 1: ANILIST → MAL
// -----------------------------
async function mapAniListToMal(anilistId: number) {
  const query = `
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        idMal
      }
    }
  `;

  const res = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { id: anilistId } }),
    cache: "force-cache",
  });

  const data = await res.json();
  return data?.data?.Media?.idMal || null;
}

// -----------------------------
// STEP 2: MAL → TMDB
// -----------------------------
async function mapMalToTmdb(malId: number) {
  const res = await fetch(
    `https://api.jikan.moe/v4/mappings?external_id=${malId}&external_site=themoviedb/anime`,
    { cache: "force-cache" },
  );

  const data = await res.json();
  const tmdb = data?.data?.find((m: any) => m?.entry?.tmdb_id);
  return tmdb?.entry?.tmdb_id || null;
}

// -----------------------------
// STEP 3: TMDB EPISODE TITLE
// -----------------------------
async function fetchTmdbEpisodeTitle(
  tmdbId: number,
  season: number,
  episode: number,
) {
  const key = process.env.TMDB_KEY;
  if (!key) return null;

  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${tmdbId}/season/${season}/episode/${episode}?api_key=${key}`,
    { cache: "force-cache" },
  );

  if (!res.ok) return null;

  const data = await res.json();
  return data?.name || null;
}

// -----------------------------
// STEP 4: FALLBACK → ANILIST STREAMING EPISODES
// -----------------------------
async function fallbackAniListTitle(anilistId: number, ep: number) {
  const query = `
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        streamingEpisodes {
          title
          episode
        }
      }
    }
  `;

  const res = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { id: anilistId } }),
    cache: "force-cache",
  });

  const data = await res.json();
  const f = data?.data?.Media?.streamingEpisodes?.find(
    (x: any) => Number(x.episode) === Number(ep),
  );

  return f?.title || null;
}

// -----------------------------
// THE MAIN RESOLVER
// -----------------------------
async function resolveEpisodeTitle(anilistId: number, ep: number, season = 1) {
  // AniList → MAL
  const mal = await mapAniListToMal(anilistId);

  // MAL → TMDB
  let tmdb = null;
  if (mal) tmdb = await mapMalToTmdb(mal);

  // TMDB → title
  if (tmdb) {
    const tmTitle = await fetchTmdbEpisodeTitle(tmdb, season, ep);
    if (tmTitle) return tmTitle;
  }

  // AniList fallback
  const alTitle = await fallbackAniListTitle(anilistId, ep);
  if (alTitle) return alTitle;

  return null;
}

// -----------------------------
// API ROUTE
// -----------------------------
export async function GET(
  req: NextRequest,
  context: { params: { id: string; ep: string } },
) {
  const anilistId = Number(context.params.id);
  const episode = Number(context.params.ep);

  if (!anilistId || !episode) {
    return NextResponse.json(
      { error: "Invalid id or episode." },
      { status: 400 },
    );
  }

  const title = await resolveEpisodeTitle(anilistId, episode);

  return NextResponse.json({
    id: anilistId,
    episode,
    title,
  });
}
