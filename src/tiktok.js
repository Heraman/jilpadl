const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeTikTok(url) {
  try {
    const { data: html } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    const $ = cheerio.load(html);
    const scriptContent = $("#__UNIVERSAL_DATA_FOR_REHYDRATION__").html();
    if (!scriptContent) {
      throw new Error("Script JSON tidak ditemukan di halaman");
    }

    const json = JSON.parse(scriptContent);
    const videoDetail = json?.__DEFAULT_SCOPE__?.["webapp.video-detail"];
    if (!videoDetail) {
      throw new Error("webapp.video-detail tidak ditemukan dalam JSON");
    }

    const item = videoDetail.itemInfo.itemStruct;
    const highestBitrateInfo = item.video.bitrateInfo.reduce((max, current) => {
      return current.Bitrate > max.Bitrate ? current : max;
    }, item.video.bitrateInfo[0]);

    const result = {
      author_name: item.author.nickname,
      author_username: item.author.uniqueId,
      description: item.desc,
      like: item.stats.diggCount,
      share: item.stats.shareCount,
      comment: item.stats.commentCount,
      view: item.stats.playCount,
      download_url_audio: item.music.playUrl,
      download_url_video: highestBitrateInfo.PlayAddr.UrlList.reduce(
        (obj, url, i) => {
          obj[i] = url;
          return obj;
        },
        {}
      ),
    };

    return result;
  } catch (error) {
    console.error("❌ Gagal:", error.message);
  }
}

module.exports = scrapeTikTok;