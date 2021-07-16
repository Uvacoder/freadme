const fastify = require('fastify');
const Parser = require('rss-parser');

/* Dummy feed addresses until we setup some sort of DB */
const subscriptions = [
  {
    name: 'CSS Tricks',
    slug: 'css-tricks',
    url: 'https://css-tricks.com/feed',
  },
  {
    name: 'The A11y Project',
    slug: 'a11y-project',
    url: 'https://www.a11yproject.com/feed/feed.xml'
  },
  {
    name: 'Smashing Magazine',
    slug: 'smashing-magazine',
    url: 'http://www.smashingmagazine.com/feed/',
  },
  {
    name: 'Piccalilli',
    slug: 'piccalilli',
    url: 'https://piccalil.li/feed.xml',
  },
];


const parser = new Parser();

const app = fastify();

app.register(require('fastify-cors'), {
  origin: false
});


/* GET Requests */
app.get('/feeds', async (request, reply) => {
  const allFeedsPromise = subscriptions.map( async(subscription) => {
    return await parser.parseURL(subscription.url);
  });
  const data =  await Promise.allSettled(allFeedsPromise);
  const allFeeds = data.map((feed) => feed.value);
  return allFeeds;
});

app.get('/feeds/:slug', async (request, reply) => {
  const url = subscriptions.filter((subscription) => subscription.slug === request.params.slug)[0].url;
  return await parser.parseURL(url);
});

app.get('/subscriptions', (request, reply) => {
  return subscriptions;
});

app.get('/subscriptions/:slug', (request, reply) => {
  return subscriptions.filter((subscription) => subscription.slug === request.params.slug)[0];
});

/* POST requests */


/* PUT requests */


/* DELETE requests */

app.listen(8080).then(() => console.log("Server listening at http://localhost:8080\n\n:rocket: LET'S GOOOO :rocket:"));