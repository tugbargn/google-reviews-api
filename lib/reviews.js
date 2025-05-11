// lib/reviews.js
const axios = require('axios');

async function fetchGoogleMapsReviews(placeId, nextPageToken = '', options = {}) {
  const {
    hl = 'en',
    gl = 'us',
    targetReviews = 50 // the number of reviews to fetch in total
  } = options;

  const reviews = [];
  let token = nextPageToken;
  let totalReviewsFetched = 0;

  do {
    const url = `https://www.google.com/maps/rpc/listugcposts?authuser=0&hl=${hl}&gl=${gl}&pb=!1m6!1s${placeId}!6m4!4m1!1e1!4m1!1e3!2m2!1i20!2s${token || ''}!5m2!1ss3TaZ_DqBe-J7NYPuLvk-A0!7e81!8m9!2b1!3b1!5b1!7b1!12m4!1b1!2b1!4m1!1e1!11m0!13m1!1e2`;

    const headers = {
      'referer': 'https://www.google.com/',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 OPR/117.0.0.0'
    };

    const response = await axios.get(url, { headers });
    let content = response.data;

    if (content.startsWith(")]}'")) {
      content = content.substring(5);
    }

    const json = JSON.parse(content);
    const nextPage = json[1] || null;
    const reviewArray = json[2] || [];

    const newReviews = reviewArray.map(item => {
      const data = item[0];
      const getPath = (...path) => path.reduce((acc, index) =>
        Array.isArray(acc) && acc[index] !== undefined ? acc[index] : '', data
      );

      const content = getPath(2, 15, 0, 0);
      if (!content) return null;

      return {
        content,
        url: getPath(4, 3, 0),
        date: (() => {
          const ts = parseInt(getPath(1, 2), 10);
          return !isNaN(ts) ? new Date(ts / 1000) : null;
        })(),
        attributes: {
          rating: getPath(2, 0, 0),
          'user-name': getPath(1, 4, 5, 0),
          'user-image-url': getPath(1, 4, 5, 1),
          'user-url': getPath(1, 4, 5, 2, 0)
        }
      };
    }).filter(Boolean);

    reviews.push(...newReviews);
    totalReviewsFetched += newReviews.length;

    token = nextPage;

  } while (token && totalReviewsFetched < targetReviews);

  return {
    reviews,
    nextPageToken: token
  };
}

module.exports = { fetchGoogleMapsReviews };