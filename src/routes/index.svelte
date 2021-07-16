<script context="module">
  export const ssr = false;
</script>

<script>
  import { onMount } from 'svelte';
  import { sortByPubDate } from '$lib/utils/sortByPubDate.js';
  import FeedHeader from '$lib/partials/FeedHeader.svelte';
  import PostList from '$components/PostList.svelte';


  // $: posts = [];

  // api reqs here
  const getAllFeeds = async() => {
    const response = await fetch('http://localhost:8080/feeds');

    if(response.ok) {
      
      const feedPosts = [];
      const data = await response.json();
      
      data.forEach((feed) => {
        feed.items.forEach((item) => {
          const postItem = {
            ...item,
            feedImage: feed.image?.url || '',
            feedLink: feed.link,
            feedTitle: feed.title,
          }

          feedPosts.push(postItem);
        });
      });

      return sortByPubDate(feedPosts);
    } else {
      throw new Error(response);
    }
  };

  let promise;
  onMount(() => {
    promise = getAllFeeds();
  });
</script>

<FeedHeader title="All Posts" />

{#await promise}
<h3>Loading...</h3>
{:then posts}
  <PostList {posts} />
{:catch error}
<p>{error}</p>
{/await}
<style>
  /* .main-feeds {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    grid-gap: var(--space-500);
    padding: var(--space-500);
  } */

  .feed-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: rgb(var(--primary-rgb), 0.1);
    box-shadow: 10px 10px 5px rgb(var(--darkdark-rgb), 0.5);
    border-radius: 1em;
  }
  .feed-card * {
    padding: 0.5rem;
  }
</style>