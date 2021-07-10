<script context="module">

  const baseUrl = 'https://css-tricks.com/feed/';

  export const load = async ({fetch}) => {
    const response = await fetch('/feed.json');

    if(!response.ok) {
      return {
        status: response.status,
        error: new Error(`Could not find a proper feed...`),
      };
    }

    const data = await response.json();

    return {
      props: {
        data
      }
    };
  };

</script>
<script>
  import {onMount} from 'svelte';
  import Post from '../lib/components/Post.svelte';
  export let data;
  const feed = [...data.items];

</script>
<section class="posts">
  {#each feed as post}
    <Post {post} feedDescription={data.description} feedImage={data.image} feedTitle={data.title} feedLink={data.link} />
  {/each}
</section>

<style>

</style>