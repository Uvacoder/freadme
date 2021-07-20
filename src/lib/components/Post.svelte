<script>
  import PostContent from './PostContent.svelte';
  export let post;
  let open = false;

  function handleToggle(event) {
    open = event.target.open;
  }
</script>


<details class="post" on:toggle={handleToggle}>
  <summary 
    class="post-header" 
    aria-label="{post.title || ''}. Press space or click to open content."
  >
  <div class="post-image">
    {#if post.feedImage}
    <a href={post.feedLink || ''} tabindex="-1">
      <img src="{post.feedImage || ''}" alt="{post.feedTitle || ''}" class="feed-image" tabindex="-1">
    </a>
    {/if}
  </div>
  <div class="post-header-content">
    <div class="post-header-control">
      <!-- <a href="#post-{post.guid}" class="button focused-only post-skip-content">Skip to Post Content</a> -->
      <h2 class="post-title">
        {post.title || ''}
      </h2>
    </div>
    <div class="post-info">
      <div class="post-meta"><a href="{post.feedLink || ''}" tabindex="-1">{post.feedTitle || ''}</a>: <time>{new Date(post.pubDate).toLocaleString()}</time></div>
    </div>
  </div>
  </summary>
  {#if open}
  <PostContent content={post["content:encoded"] || post.content} />
  {/if}
</details>

<style>
   .post {
    --flow-space: var(--size-700);
    display: flex;
    flex-direction: column;
    /* padding: var(--space-500); */
  }
  .post:focus-within, .post:focus {
    outline-color: transparent;
  }
  .post *:focus {
    outline: 2px solid var(--accent-primary);
    outline-offset: -2px;
  }

  .post  * {
    background: transparent;
  }

  .post-header {
    font-family: var(--sans);
    display: flex;
    flex-direction: row;
    order: 1;
    padding: 0.5rem;
    gap: 0.5rem;
  }
  .post-header-content {
    display: flex;
    flex-direction: column;
  }
  .post-header-control {
    order: 2;
    display: flex;
    gap: 3rem;
    justify-content: space-between;
  }

  .post-info {
    order: 1;
    display: flex;
    gap: 1rem;
    font-size: var(--font-1);
    width: 0;
    height: 0;
    overflow: hidden;
  }
  .feed-image {
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--space-500);
    height: var(--space-500);
  }
  .post-meta {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-weight: 600;
    letter-spacing: 0.125rem;
  }
  .post-title {
    order: 1;
    font-size: var(--font-2);
    margin-top: 0;
    line-height: 1.5;
  }
  time {
    font-family: var(--sans);
    color: rgb(var(--light-rgb), 0.8);
    font-weight: 500;
  }
  details > summary {
    list-style: none;
  }

  details > summary::-webkit-details-marker {
    display: none;
  }
  summary a {
    color: var(--primary-light);
    text-decoration: none;
    }
    summary a:hover {
    text-decoration: underline;
    color: var(--primary-light-hover);
  }

  :global(.post ul li), :global(.post ol li) {
    margin-inline-start: 1rem;
  }
  :global(.post ul li li), :global(.post ol li li) {
    margin-inline-start: 2rem;
  }

  @media screen and (min-width: 768px) {
    .post {
      padding: 0.5rem 0 0.5rem 1rem;
    }
    .post-info {
      width: unset;
      height: unset;
      overflow: auto;
    }
  }
</style>