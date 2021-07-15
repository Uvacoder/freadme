<script context="module">
  import { feeds } from '$data/feeds.js';

  export const load = async({page, fetch, session, context}) => {
    const slug = page.params.slug;

    const apiURL = `${slug}.json`

    const feedInfo = feeds.filter((feedObject) => feedObject.slug === slug)[0];

    const response = await fetch(apiURL);

    if(!response.ok) {
      return {
        status: response.status,
        error: new Error(`Could not find a feed at ${apiURL}`)
      }
    }

    const data = await response.json();
    const feed = data.feed || [];
    
    return {
      props: {
        feedName: feedInfo?.name,
        feed
      }
    }
  }
</script>

<script>
  import PostContent from '$lib/components/PostContent.svelte';

  export let feed;
  export let feedName;

  let open = false;

  function handleToggle(event) {
    open = event.target.open;
  }
</script>

<section tabindex="0">
  <h2>
    <a href="{feed.link}">
      {feedName}
    </a>
  </h2>
  {#each feed.items as post}
  <details class="post" on:toggle={handleToggle}>
    <summary 
      class="post-header" 
      aria-label="{post.title || ''}. Press space or click to open content."
    >
      <div class="post-header-control">
        <!-- <a href="#post-{post.guid}" class="button focused-only post-skip-content">Skip to Post Content</a> -->
        <h2 class="post-title">
          <a href="{post.link || ''}" tabindex="0">{post.title || ''}</a>
        </h2>
      </div>
      <div class="post-info">
        <div class="post-image">
          {#if feed.image}
          <a href={feed.link || ''} tabindex="-1">
            <img src="{feed.image.url}" alt="{feed.title || ''}" class="feed-image" tabindex="-1">
          </a>
          {/if}
        </div>
        <div class="post-meta"><a href="{feed.link || ''}" tabindex="-1">{feed.link || ''}</a>: <time>{new Date(post.pubDate).toLocaleString()}</time></div>
      </div>
    </summary>
    {#if open}
    <PostContent content={post["content:encoded"] || post.content} />
    {/if}
  </details>
  {/each}
  
</section>


<style>
  .post {
    --flow-space: var(--size-700);
    border-bottom: 1px solid rgb(var(--primary-rgb), 0.5);
    display: flex;
    flex-direction: column;
    padding: 0.5rem 1rem;
  }
  .post:focus-within, .post:focus {
    background: rgb(var(--darkdark-rgb), 0.5);
    outline-color: transparent;
  }
  .post *:focus {
    background: rgb(var(--darkdark-rgb), 0.7);
    outline: 2px solid var(--accent-primary);
    outline-offset: -2px;
  }

  .post-header {
    font-family: var(--sans);
    display: flex;
    flex-direction: column;
    order: 1;
    padding: 0.5rem;
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
    align-items: center;
  }
  .feed-image {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.33rem;
    height: 1.33rem;
  }
  .post-meta {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-weight: 600;
    letter-spacing: 0.125rem;
  }
  .post-title {
    margin-inline: 2.33rem;
  }
  .post-title {
    order: 1;
    font-size: var(--size-600);
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
</style>