<script context="module">

</script>
<script>
  import { onMount } from 'svelte';
  import PostList from '$lib/components/PostList.svelte';
  import { sortByPubDate } from '$utils/sortByPubDate.js';
  import Post from '$lib/components/Post.svelte';

  $: bigFeed = [];

  const getFeeds = async() => {
    const response = await fetch('/allfeeds.json');

    if(!response.ok) {
      return {
        status: response.status,
        error: new Error(`Could not find a proper feed...`),
      };
    }

    const data = await response.json();

    let currentFeed = [];

    data.forEach((feed) => {
      feed.items.forEach((item) => {
        currentFeed.push({
          ...item,
          feedDescription: feed.description,
          feedTitle: feed.title,
          feedImage: feed.image?.url,
          feedImageTitle: feed.image?.title,
          feedLink: feed.link,
        });
      })
    });

    bigFeed = [...currentFeed];
    
  }

  onMount(async () => {
    getFeeds();
    console.log(bigFeed);
  });

  // const feed = bigFeed ? sortByPubDate(bigFeed) : [];
</script>
  {#if bigFeed.length < 1}
    <div class="loading"><h2>Loading</h2></div>
  {:else}
  <PostList feed={bigFeed} />
  {/if}

<style>
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>