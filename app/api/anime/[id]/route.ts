// import { NextRequest, NextResponse } from "next/server";
// // import { kaa } from "@/lib/anime-conf";
// // import axios from "axios";
// // import { ANIME } from "@consumet/extensions";

// export async function GET(
//   req: NextRequest,
//   context: { params: Promise<{ id: number }> },
// ) {
//   const { id } = await context.params;
//   const url = new URL(req.url);
//   const page = url.searchParams.get("page") || "1";
//   console.log(page);
//   const x = await fetch(
//     `https://anilist-to-animepahe-delta.vercel.app/api/${id}`,
//   );

//   const idd_x = await x.json();

//   const pahe_id = idd_x.episodes[0].id.split("/")[0];

//   const a = await fetch(`https://aph-alpha.vercel.app/api/${pahe_id}`);
//   const idd_a = await a.json();
//   // const pahe_epid = idd_x.episodes[0].id.split("/")[1];

//   // const d = await fetch(
//   //   `https://aph-alpha.vercel.app/api/play/${pahe_id}?episodeId=${pahe_epid}`,
//   // );
//   // const data = await d.json();

//   // const mlsnc = await fetch(`https://api.malsync.moe/mal/anime/${id}`);
//   // const ms = await mlsnc.json();
//   // const kaa_ = ms.Sites.KickAssAnime;
//   // const keykaa = Object.keys(kaa_)[0];
//   // const entrykaa = kaa_[keykaa].identifier;
//   // // const kaa_ep = (await kaa.fetchAnimeInfo(entrykaa)).episodes[ep - 1].id;
//   // const kaa_ep_title = (await kaa.fetchAnimeInfo(entrykaa)).episodes[ep - 1]
//   //   .title;

//   return NextResponse.json(idd_a);
// }
