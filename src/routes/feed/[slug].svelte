<script context="module">
  import { feeds } from '$data/feeds.js';

  export const load = async({page, fetch, session, context}) => {
    const slug = page.params.slug;

    const apiURL = `${slug}.json`

    const feedInfo = feeds.filter((feedObject) => feedObject.slug === slug)[0];

    const response = await fetch(apiURL);

    if(!response.ok) {
      return {
        status: response.status,
        error: new Error(`Could not find a feed at ${apiURL}`)
      }
    }

    const data = await response.json();
    const feed = data.feed || [];
    
    return {
      props: {
        feedName: feedInfo?.name,
        feedUrl: feedInfo?.url,
        feed
      }
    }
  }

  function getFeedInfo(slug) {
    console.log('feeds', feeds);
    return feeds.filter((feed) => feed.slug === slug)[0];
  }
</script>

<script>
  import { PostList } from '$lib/components/PostList.svelte';

  export let feed;
  export let feedName;
  export let feedUrl;
</script>

<section tabindex="0">
  <h2>
    <a href="{feedUrl}">
      {feedName}
    </a>
  </h2>
  <PostList {feed} />
</section>
