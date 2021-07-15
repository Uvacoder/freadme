<script context="module">
  import { feeds } from '$data/feeds.js';
  
  export const load = ({page, fetch, session, context}) => {
    return { 
      props: { 
        feeds: feeds || []
      }
    }
  }
</script>

<script>
  export let feeds;
</script>

<h2>All Your Feeds</h2>
<section class="main-feeds">
  {#each feeds as feed}
  <a href="/feed/{feed.slug}">
    <article class="feed-card">
      <header>
        <h3>{feed.name}</h3>
      </header>
      <section class="feed-card-content">
        <p>Something should definitely go here.</p>
      </section>
    </article>
  </a>
  {/each}
</section>

<style>
  .main-feeds {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    grid-gap: var(--space-500);
    padding: var(--space-500);
  }

  .feed-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: rgb(var(--primary-rgb), 0.1);
    box-shadow: 10px 10px 5px rgb(var(--darkdark-rgb), 0.5);
    border-radius: 1em;
  }
  .feed-card * {
    padding: 0.5rem;
  }
</style>