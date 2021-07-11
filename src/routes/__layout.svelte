<script>
  import '../lib/style/global.css';
  import Sidebar from '../lib/partials/Sidebar.svelte';
  import Header from '../lib/partials/Header.svelte';
  import FeedHeader from '../lib/partials/FeedHeader.svelte';

</script>

<Header />

<main id="main-content" class="posts" tabindex="0" aria-label="All Posts" role="main">
  <FeedHeader />
  <slot></slot>
</main>

<Sidebar />

<style>
  main {
    order: 1;
  }
  #main-content:focus, #main-content:focus-within {
    outline: 2px solid var(--darkdark);
  }
  .posts:focus, .posts:focus-within {
    background: rgb(var(--darkdark-rgb), 0.5);
  }
  
  .posts:focus {
    /* outline: 2px solid var(--accent-primary); */
    outline-offset: -2px;
  }
</style>