import Parser from 'rss-parser';

let parser = new Parser({
  customFields: {
    item: ['enclosure']
  }
});

const savedAddresses = [
  'https://css-tricks.com/feed/',
  'https://www.a11yproject.com/feed/feed.xml',
  'http://www.smashingmagazine.com/feed/',
  'https://css-weekly.com/feed/',
  'https://cprss.s3.amazonaws.com/javascriptweekly.com.xml',
];

async function getAllFeeds(addresses) {
  const allFeeds = addresses.map(async (address) => {
    return await parser.parseURL(address);
  });
  return Promise.allSettled(allFeeds);
}

export const get = async() => {
  console.log('Incoming request for /allfeeds');
  
  const settledResponses = await getAllFeeds(savedAddresses);
  const values = await settledResponses.map((response) => response.value);
  return {
    body: values
  };
};