import { kaa } from "@/lib/anime-conf";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string; ep: number }> },
) {
  const { id, ep } = await context.params;

  try {
    const anilistPromise = fetch(
      `https://anilist-to-animepahe-delta.vercel.app/api/${id}`,
    ).then((res) => res.json());

    const anilistData = await anilistPromise;
    const episodeData = anilistData.episodes[ep - 1];

    if (!episodeData) {
      return NextResponse.json({ error: "Episode not found" }, { status: 404 });
    }
    const [pahe_id, pahe_epid] = episodeData.id.split("/");

    const aphPromise = fetch(
      `https://aph-alpha.vercel.app/api/play/${pahe_id}?episodeId=${pahe_epid}`,
    ).then((res) => res.json());

    const [aphData] = await Promise.all([aphPromise]);

    // const mlsnc = await fetch(`https://api.malsync.moe/mal/anime/${id}`);
    // const ms = await mlsnc.json();
    // const kaa_ = ms.Sites.KickAssAnime;
    // const keykaa = Object.keys(kaa_)[0];
    // const entrykaa = kaa_[keykaa].identifier;
    // // const kaa_ep = (await kaa.fetchAnimeInfo(entrykaa)).episodes[ep - 1].id;
    // const kaa_ep_title = (await kaa.fetchAnimeInfo(entrykaa)).episodes[ep - 1]
    //   .title;

    // Return consolidated JSON
    return NextResponse.json({
      // title: kaa_ep_title,
      dat: episodeData,
      data: aphData,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch data", details: err },
      { status: 500 },
    );
    console.log(err);
  }
}

// const aall = new Anilist();

// const epx = await aall.fetchEpisodesListById(id);

// const ep_title = epx[ep - 1];

// console.log(
//   `https://aph-alpha.vercel.app/api/play/${pahe_id}?episodeId=${pahe_epid}`,
// );

//

// const data = await axios.get(
//   `https://consumet-woad-beta.vercel.app/anime/animepahe/watch`,
//   {
//     params: {
//       episodeId: pahe_id,
//     },
//   },
// );
// const d = await data.json();
// console.log(d);
// const ap = new ANIME.AnimePahe();
// const data = await ap.fetchAnimeInfo(pahe_id);

// const d = await data.json();

// const d = await data.json()

// const res = await fetch(
//   `https://consumet-woad-beta.vercel.app/anime/animepahe/watch/${idd}$episode$${eid}`,
// );
// const data = await res.json();

// // Extract the first source and subtitle
// const source = data.sources[0]?.url;
// const subtitle = data.subtitles?.[0]?.url ?? "";

// const kaa_ep_image = (await kaa.fetchAnimeInfo(entrykaa)).episodes[ep - 1]
// .image;

// console.log(kaa_eplist);
// const kaa_ep_needed = kaa_eplist;
// console.log({ ep: ep, kaa_ep });
// const ex = await kaa.fetchEpisodeSources(kaa_ep);
// const kaa_source = await ex.json();
// console.log(ex.json());
//   return NextResponse.json({
//     // source,
//     // title: kaa_ep_title || "",
//     // image: kaa_ep_image,
//     // subtitle: ex.subtitles,
//     data,
//     // title: ep_title,
//     dat: idd_x.episodes[ep - 1],
//   });
// }
