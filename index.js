const scrapeTikTok = require('./src/tiktok');
const scrapeInstagram = require('./src/instagram');
const JilpaDl = {
  tiktok: scrapeTikTok,
  tt: scrapeTikTok,
  instagram: scrapeInstagram,
  ig: scrapeInstagram,
};

module.exports = JilpaDl;
