<script>
  import Post from './Post.svelte';
  export let feed;
</script>


{#each feed as post}
  <Post {post} feedImage={feed.image.link}/>
{/each}