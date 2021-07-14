import Parser from 'rss-parser.js';

const parser = new Parser({
  customFields: {
    item: ['enclosure']
  }
});

export const getFeed = async(address) {
  const response = await parser.parseURL(address);
  if(!response.ok) {
    return { 
      status: response.status,
      error: new Error(`${address} returned an error.`)
    }
  }
} 