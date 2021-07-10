<script>
  export let post;
  export let feedTitle;
  export let feedDescription;
  export let feedLink;
  export let feedImage;
</script>


<details class="post">
  <summary class="post-header">
    <h2 class="post-title">{post.title}</h2>
    <section class="post-info">
      <section class="post-image">
        <img src="{feedImage.url}" alt="{feedDescription}" class="feed-image">
      </section>
      <section class="post-meta">{feedTitle}: <time>{new Date(post.pubDate).toLocaleString()}</time></section>
    </section>
  </summary>
  <section class="content flow">{@html post["content:encoded"]}</section>
</details>

<style>
   .post {
    --flow-space: var(--size-700);
    border-bottom: 1px solid var(--primary);
    padding: 1rem;
  }

  .post-header {
    font-family: var(--sans);
    display: flex;
    flex-direction: column;
  }
  .post-header > * + * {
    margin-top: 1rem;
  }

  .post-info {
    order: 1;
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  .feed-image {
    width: 1.33rem;
    height: 1.33rem;
  }
  .post-meta {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .post-title, .content {
    margin-inline: 2.33rem;
  }
  .post-title {
    order: 2;
    font-size: var(--size-600);
    margin-top: 0;
    line-height: 1.5;
  }
  time {
    font-family: var(--sans);
  }
  a {
    color: var(--light);
  }

  details > summary {
    list-style: none;
  }

  details > summary::-webkit-details-marker {
    display: none;
  }
</style>