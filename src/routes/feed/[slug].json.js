import { getFeed } from '$services/getFeed.js';
import { feeds } from '$data/feeds.js';
import Parser from 'rss-parser';

const parser = new Parser();

export const get = async({params}) => {
  const { slug } = params;

  const feedInfo = feeds.filter((feedObj) => {
    return feedObj.slug === slug;
  })[0];

  let feed = await parser.parseURL(feedInfo.url);

  return {
    body:{
      feed
    }
  }
}