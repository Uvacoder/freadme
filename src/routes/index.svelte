<script context="module">
  export const ssr = false;
</script>

<script>
  import { onMount } from 'svelte';
  import { sortByPubDate } from '$lib/utils/sortByPubDate.js';
  import PostList from '$components/PostList.svelte';

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

{#await promise}
<div class="center">
  <h3>Loading...</h3>
</div>
{:then posts}
  <PostList {posts} />
{:catch error}
<div class="center">
  <p>{error}</p>
</div>
{/await}
<style>

</style>