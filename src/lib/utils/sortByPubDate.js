export function sortByPubDate(feed) {
  return feed.sort((a, b) => a.pubDate > b.pubDate ? -1 : 1);
}