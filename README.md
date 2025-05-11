# Google Reviews Library

A simple Node.js library to fetch Google Maps reviews.

## Installation

To install the library, run the following command:

`npm install google-reviews-api`

## Usage

<pre>
const { fetchGoogleMapsReviews } = require('google-reviews-library');

(async () => {

  const placeId = '0x47e66e2964e34e2d:0x8ddca9ee380ef7e0';
  const options = {
    hl: 'en',  // Language (e.g., 'en' for English)
    gl: 'tr',  // Region (e.g., 'tr' for Turkey)
    targetReviews: 50  // The total number of reviews you want to fetch
  };

  const result = await fetchGoogleMapsReviews(placeId, '', options);
  console.log(result.reviews);
})();
</pre>

### Options

Sample Place ID
For example, to fetch reviews for the Eiffel Tower, the Place ID can be found in the Google Maps URL:

[Google Maps - Eiffel Tower](https://www.google.com/maps/place/Eiffel+Tower/@48.8583736,2.2919064,17z/data=!4m8!3m7!1s0x47e66e2964e34e2d:0x8ddca9ee380ef7e0!8m2!3d48.8583701!4d2.2944813!9m1!1b1!16zL20vMDJqODE?entry=ttu)

The Place ID for the Eiffel Tower is: 0x47e66e2964e34e2d:0x8ddca9ee380ef7e0

**placeId**: The Google Maps Place ID for the location.

**nextPageToken**: For pagination. You can leave it as an empty string ('') to start from the first page.

**hl**: Language for the reviews (default: 'en').

**gl**: Region for the reviews (default: 'us').

**targetReviews**: The maximum number of reviews to fetch. This will stop fetching once the target number is reached (default: 50).