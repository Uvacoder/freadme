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
  import { sortByPubDate } from '$lib/utils/sortByPubDate.js';
  import PostList from '$components/PostList.svelte';
  export let slug;

  // api reqs here
  const getAllFeeds = async() => {
    const response = await fetch(`http://localhost:8080/feeds/${slug}`);

    console.log(response);
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

  const getFeedName = async () => {
    const response = await fetch(`http://localhost:8080/subscriptions/${slug}`);

    if(response.ok) {
      const data = await response.json();
      return data.name;
    } else {
      throw new Error(response);
    }
  };

  let promise;
  let namePromise;
  onMount(() => {
    promise = getAllFeeds();
    namePromise = getFeedName();
  });
  
  window.addEventListener('sveltekit:navigation-end', (event) => {
    promise = getAllFeeds();
    namePromise = getFeedName();
  });
</script>

{#await namePromise}
&nbsp;
{:then name}
<h2>{name}</h2>
{:catch error}
<p>{error}</p>
{/await}

{#await promise}
<h3>Loading...</h3>
{:then posts}
  <PostList {posts} />
{:catch error}
  <p>{error}</p>
{/await}

<style>

</style>