const fastify = require('fastify');
const cors = require('cors');
const Parser = require('rss-parser');

/* Dummy feed addresses until we setup some sort of DB */
const subscriptions = [
  {
    name: 'CSS Tricks',
    slug: 'css-tricks',
    url: 'https://css-tricks.com/feed',
    image: 'https://i1.wp.com/css-tricks.com/wp-content/uploads/2021/07/star.png?fit=32%2C32&ssl=1',
  },
  {
    name: 'The A11y Project',
    slug: 'a11y-project',
    url: 'https://www.a11yproject.com/feed/feed.xml',
    image: ''
  },
  {
    name: 'Smashing Magazine',
    slug: 'smashing-magazine',
    url: 'http://www.smashingmagazine.com/feed/',
    image: 'https://www.smashingmagazine.com/images/favicon/app-icon-512x512.png',
  },
  {
    name: 'Piccalilli',
    slug: 'piccalilli',
    url: 'https://piccalil.li/feed.xml',
    image: ''
  },
];


const parser = new Parser();

const app = fastify();
// const app = express();

// app.use(cors({orogin: true}));

app.register(require('fastify-cors'), {origin: true});


/* GET Requests */
app.get('/feeds', async (request, reply) => {
  console.log('headers: ', request.headers);
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

app.post('/feeds', async (request, reply) => {
  
  try {

    const feedResponse = await parser.parseURL(request.body.url);
    const name = request.body.name !== '' || request.body.name !== undefined ? request.body.name : feedResponse.name;
    
    return {
      name: name,
      image: feedResponse.image?.url,
      description: feedResponse?.description,
      link: feedResponse?.link,
      categories: feedResponse?.entries,
      slug: feedResponse.title.toLowerCase().replace(' ', '-')
    };
    
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