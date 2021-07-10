import fetch from 'node-fetch';
import Parser from 'rss-parser';
import { parseContent } from './parse.js';
let parser = new Parser();

const baseUrl = 'https://css-tricks.com/feed/';

export async function getFeed(address) {
  const feed = await parser.parseURL(address);
  
  feed.items.map((item) => {
    return {...item, ["content:encodedSnippet"]: parseContent(item["content:encodedSnippet"])};
  })
    
    return feed;
}
export const get = async() => {
  const feed = await getFeed(baseUrl);

  return {body: feed};
};