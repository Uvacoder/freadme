const fastify = require('fastify');
const cors = require('cors');
const Parser = require('rss-parser');
const supa = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = supa.createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
)

/* Dummy feed addresses until we setup some sort of DB */
const subscriptions = [
  {
    name: 'CSS Tricks',
    slug: 'css-tricks',
    feed_link: 'https://css-tricks.com/feed',
    image: 'https://i1.wp.com/css-tricks.com/wp-content/uploads/2021/07/star.png?fit=32%2C32&ssl=1',
  },
  {
    name: 'The A11y Project',
    slug: 'the-a11y-project',
    feed_link: 'https://www.a11yproject.com/feed/feed.xml',
    image: ''
  },
  {
    name: 'Smashing Magazine',
    slug: 'smashing-magazine',
    feed_link: 'http://www.smashingmagazine.com/feed/',
    image: 'https://www.smashingmagazine.com/images/favicon/app-icon-512x512.png',
  },
  {
    name: 'Piccalilli',
    slug: 'piccalilli',
    feed_link: 'https://piccalil.li/feed.xml',
    image: ''
  },
];


const parser = new Parser();

const app = fastify();

app.register(require('fastify-cors'), {origin: true});


/* Get subscribed feeds from SupaBase */
const getSubscriptions = async() => {
  return await supabase
    .from('feeds')
    .select();
}

const getSubscription = async (slug) => {
  return await supabase
    .from('feeds')
    .select('*')
    .eq('slug', slug);
}


/* GET Requests */
app.get('/feeds', async (request, reply) => {
  const feeds = await (await getSubscriptions());
  
  const allFeedsPromise = feeds.data.map( async(feed) => {
    return await parser.parseURL(feed.feed_link);
  });
  const data =  await Promise.allSettled(allFeedsPromise);
  const allFeeds = data.map((feed) => feed.value);
  return allFeeds;
});

app.get('/feeds/:slug', async (request, reply) => {
  const feed = await getSubscription(request.params.slug);
  
  return await parser.parseURL(feed.data[0].feed_link);
});

app.get('/subscriptions', (request, reply) => {
  return subscriptions;
});

app.get('/subscriptions/:slug', (request, reply) => {
  return subscriptions.filter((subscription) => subscription.slug === request.params.slug)[0];
});

app.post('/feeds', async (request, reply) => {
  
  try {

    const feedResponse = await parser.parseURL(request.body.url);
    const name = request.body.name !== '' || request.body.name !== undefined ? request.body.name : feedResponse.name;

    const feed = {
      feed_link: request.body.url,
      name: name,
      link: feedResponse.link,
      image: feedResponse.image?.url,
      description: feedResponse?.description,
      slug: name.toLowerCase().replace(/\s/g, '-'),
      categories: feedResponse?.categories,
    };

    return feed;
    
  } catch(error) {
    if(!feedResponse.ok) {
      return {
        ok: false,
        error: new Error(feedResponse.error)
      }
    }
  }
});

/* POST requests */


/* PUT requests */


/* DELETE requests */

app.listen(8080, '0.0.0.0').then((address) => console.log(`Server listening at ${address}\n\n🚀 LET'S GOOOO 🚀`));