const axios = require('axios');
const qs = require('qs');
const cheerio = require('cheerio');

async function scrapeInstagram(igUrl) {
  const url = 'https://fastdl.to/api/ajaxSearch';
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'x-requested-with': 'XMLHttpRequest',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
    'accept': '*/*',
    'sec-ch-ua': '"Not)A;Brand";v="8", "Chromium";v="138", "Brave";v="138"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'origin': 'https://fastdl.to',
    'referer': 'https://fastdl.to/en',
    'accept-language': 'en-US,en;q=0.9',
  };

  const postData = qs.stringify({
    k_exp: '1751434216',
    k_token: '3a3cd0303861547425f4d7b86fe496f12f45d60ef2cc56e7af3f7625093adbed',
    q: igUrl,
    t: 'media',
    lang: 'en',
    v: 'v2',
  });

  try {
    const response = await axios.post(url, postData, { headers });
    const { status, data: html } = response.data;

    if (status !== 'ok') {
      return { status: 'error', message: 'Failed to get valid response from server' };
    }

    const $ = cheerio.load(html);

    const thumbnail = $('.download-items__thumb img').attr('src');

    const links = [];
    $('a.abutton').each((i, el) => {
      const href = $(el).attr('href');
      const title = $(el).attr('title') || $(el).text().trim();
      if (href) {
        links.push({ title, url: href });
      }
    });

    return {
      downloads: links
    };

  } catch (error) {
    return {
      status: 'error',
      message: error.response?.data || error.message
    };
  }
}

module.exports = scrapeInstagram;