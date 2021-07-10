<script>
  export let post;
  export let feedTitle;
  export let feedDescription;
  export let feedLink;
  export let feedImage;
</script>


<details class="post">
  <summary class="post-header">
    <h2 class="post-title"><a href="{post.link}">{post.title}</a></h2>
    <section class="post-info">
      <section class="post-image">
        <a href={feedLink}>
          <img src="{feedImage.url}" alt="{feedDescription}" class="feed-image">
        </a>
      </section>
      <section class="post-meta"><a href="{feedLink}">{feedTitle}</a>: <time>{new Date(post.pubDate).toLocaleString()}</time></section>
    </section>
  </summary>
  <section class="content flow">{@html post["content:encoded"]}</section>
</details>

<style>
   .post {
    --flow-space: var(--size-700);
    border-bottom: 1px solid rgb(var(--primary-rgb), 0.5);
    padding: 1rem;
  }

  .post-header {
    font-family: var(--sans);
    display: flex;
    flex-direction: column;
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
</style>