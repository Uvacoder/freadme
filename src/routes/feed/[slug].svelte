<script context="module">
  export const ssr = false;

  export const load = ({page, fetch, session, context}) => {
    const { slug } = page.params;

    return {
      props: {
        slug
      }
    }
  }
</script>

<script>
  import { onMount } from 'svelte';
  import { feeds } from '$lib/stores/feeds.store.js';
  import { sortByPubDate } from '$lib/utils/sortByPubDate.js';
  import PostList from '$components/PostList.svelte';
  import FeedHeader from '$lib/partials/FeedHeader.svelte';
  export let slug;

  // api reqs here
  const getAllFeeds = async() => {
    const response = await fetch(`http://localhost:8080/feeds/${slug}`);

    if(response.ok) {
      
      const feedPosts = [];
      const data = await response.json();
      
      data.items.forEach((item) => {
        const postItem = {
          ...item,
          feedImage: data.image?.url || '',
          feedLink: data.link,
          feedTitle: data.title,
        }

        feedPosts.push(postItem);
      });

      return sortByPubDate(feedPosts);
    } else {
      throw new Error(response);
    }
  };

  let promise;
  
  
  window.addEventListener('sveltekit:navigation-end', (event) => {
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