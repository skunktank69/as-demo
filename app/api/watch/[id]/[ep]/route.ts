import { NextRequest, NextResponse } from "next/server";
import { kaa } from "@/lib/anime-conf";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string; ep: number }> },
) {
  const { id, ep } = await context.params;
  const idd = await fetch(
    `https://anime-mapper-coral.vercel.app/hianime/${id}`,
  );

  const idd_x = await idd.json();

  const hia_id = idd_x.hianimeId;
  // ).hianimeId;

  const eid = idd_x.episodes[ep - 1].episodeId.split(`${hia_id}?ep=`)[1];

  const res = await fetch(
    `https://consumet-woad-beta.vercel.app/anime/hianime/watch/${idd}$episode$${eid}`,
  );
  const data = await res.json();

  // Extract the first source and subtitle
  const source = data.sources[0]?.url;
  const subtitle = data.subtitles?.[0]?.url ?? "";

  // const kaa_data = kaa.fetchEpisodeSources();

  return NextResponse.json({ source, subtitle });
}
