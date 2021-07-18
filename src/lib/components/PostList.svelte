<script>
  import Post from './Post.svelte';
  export let posts = [];
</script>
<div class="post-list">
  {#each posts as post}
  <Post {post} />
  {/each}
</div>

<style>
  :global(.post-list details:nth-child(2n)) {
    background-color: var(--darkdark);
  }
</style>