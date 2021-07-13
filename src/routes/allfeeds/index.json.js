import Parser from 'rss-parser';

let parser = new Parser({
  customFields: {
    item: ['enclosure']
  }
});

const savedAddresses = ['https://css-tricks.com/feed/', 'https://www.a11yproject.com/feed/feed.xml', 'http://www.smashingmagazine.com/feed/'];

async function getAllFeeds(addresses) {
  const allFeeds = addresses.map(async (address) => {
    return await parser.parseURL(address);
  });
  return Promise.allSettled(allFeeds);
}

export const get = async() => {
  const settledResponses = await getAllFeeds(savedAddresses);
  const values = await settledResponses.map((response) => response.value);
  return {
    body: values
  };
};