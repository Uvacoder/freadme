import Parser from 'rss-parser';
import { parseContent } from './parse.js';

let parser = new Parser({
  customFields: {
    item: ['enclosure']
  }
});

// const baseUrl = 'https://css-tricks.com/feed/';
const baseUrl = 'https://www.a11yproject.com/feed/feed.xml';

export async function getFeed(address) {
    return await parser.parseURL(address);
}

export const get = async() => {
  return {body: await getFeed(baseUrl)};
};