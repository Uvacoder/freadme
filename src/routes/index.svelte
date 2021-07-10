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

    const data = await response.text();

    return {
      props: {
        data
      }
    };
  };

</script>
<script>
  import {onMount} from 'svelte';
  export let data;

  let feed = [];

  function getCdataContent(node) {
    const nodeContent = Array.from(node.childNodes).map((child) => child);
    return nodeContent[0].data;
  }

  onMount(() => {
    const parsed = new window.DOMParser().parseFromString(data, 'text/xml');
    const items = parsed.querySelectorAll('item');
    items.forEach((item) => {
      const description = item.querySelector('description');
      const descriptionContent = Array.from(description.childNodes).map((child) => child);
      const descriptionDom = descriptionContent[0].data

      const feedObject = {
        link: item.querySelector('link').innerHTML,
        title: item.querySelector('title').innerHTML,
        pubDate: item.querySelector('pubDate').innerHTML,
        description: getCdataContent(item.querySelector('description')),
        content: item.getElementsByTagNameNS('*', 'encoded').item(0).textContent,
        creator: getCdataContent(item.querySelector('creator')),
      };
      feed = [...feed, feedObject];
    })
    console.log(feed);
  });
</script>
<section class="posts flow">
  {#each feed as post}
  <article class="post">
    <header class="post-header">
      <h2 class="post-title"><a href="{post.link}">{post.title}</a></h2>
      <p class="post-meta"><time>{new Date(post.pubDate).toLocaleString()}</time> by {post.creator}</p>
    </header>
    <section class="content flow">{@html post.content}</section>
  </article>
  {/each}
</section>

<style>
  .posts > * + * {
    margin-top: calc(var(--size-900) * var(--scale-up));
  }
  .post {
    --flow-space: var(--size-700);
    width: 70vw;
    width: clamp(16rem, 70vw, 70rem);
    padding-inline: var(--flow-space);
  }

  time {
    font-family: var(--sans);
    --flow-space: var(--size-400);
    display: block;
  }

  .post-header {
    font-family: var(--sans);
  }
  .post-header > * + * {
    margin-top: 1rem;
  }

  a {
    color: var(--light);
  }
</style>