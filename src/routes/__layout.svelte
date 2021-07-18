<script>
  import { browser } from '$app/env';
  import { session } from '$app/stores';
  import { authed } from '$lib/stores/user.store.js';
  import '../lib/style/global.css';
  import supabase from '$lib/db.js';
  import Sidebar from '../lib/partials/Sidebar.svelte';
  import Header from '../lib/partials/Header.svelte';

  if(browser) {
    $session = supabase.auth.session();

    supabase.auth.onAuthStateChange((event, supaBaseSession) => {
      $session = supaBaseSession;
    });

    if($session?.user.aud === 'authenticated') {
      $authed = true;
    } else {
      $authed = false;
    }
    
    console.log($session);
  }

</script>

<Header />
<section class="app">
  <main id="main-content" class="posts" tabindex="0" aria-label="All Posts" role="main">
    <slot></slot>
  </main>
  <Sidebar />
</section>

<style>
  .app {
    display: flex;
    flex-wrap: wrap;
    grid-area: app;
  }
  main {
    position: relative;
    order: 2;
    flex-basis: 0;
    flex-grow: 999;
    min-width: 50%;
    max-height: 100%;
    overflow-y: scroll;
  }
  #main-content:focus, #main-content:focus-within {
    outline: 2px solid rgb(var(--primary-rgb), 0.5);
  }
  .posts:focus, .posts:focus-within {
    background: rgb(var(--darkdark-rgb), 0.6);
  }
  
  .posts:focus {
    /* outline: 2px solid var(--accent-primary); */
    outline-offset: -2px;
  }
</style>