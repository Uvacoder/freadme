<script>
  import Post from './Post.svelte';
  export let feed = [];
</script>


{#each feed as post}
  <Post {post} feedDescription={post.feedDescription} feedImage={post.feedImage} feedTitle={post.feedTitle} feedLink={post.feedLink} />
{/each}