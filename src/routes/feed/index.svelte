<script context="module">
  export const ssr = false;
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
        feed
      }
    }
  }
</script>

<script>
  // import { PostList } from '$lib/components/PostList.svelte';

  export let feed;
  export let feedName;

  console.log(feed);
</script>

<section tabindex="0">
  <h2>
    <a href="{feed.link}">
      {feedName}
    </a>
  </h2>
  
</section>
