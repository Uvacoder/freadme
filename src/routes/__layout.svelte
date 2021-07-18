<script>
  import { browser } from '$app/env';
  import { session } from '$app/stores';
  import { goto } from '$app/navigation';
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
    
    goto('/');
    console.log($session);
  }

</script>

<Header />
<section class="app">
  <main id="main-content" class="posts" tabindex="0" aria-label="All Posts" role="main">
    <slot></slot>
  </main>
  <aside id="sidebar">
    <Sidebar />
  </aside>
</section>

<style>
  .app {
    grid-area: app;
    position: relative;
    /* display: flex;
    flex-direction: column; */
  }
  main {
    position: absolute;
    top: calc(var(--ui-header-height) * 2);
    left: 0;
    right: 0;
    bottom: 0;
  }

  #sidebar {
    position: absolute;
    top: calc(var(--ui-header-height) * 2);
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--dark);
    order: 1;
    border-inline-end: 1px solid rgb(var(--primary-rgb), 0.5);
    display: flex;
    flex-direction: column;
    transform: translateX(-100%);
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

  @media screen and (min-width: 768px) {
    .app {
      display: flex;
      flex-wrap: wrap;
    }
    main {
      position: unset;
      order: 2;
      flex-basis: 0;
      flex-grow: 999;
      min-width: 50%;
      max-height: 100%;
      margin-top: var(--ui-header-height);
    }
    #sidebar {
      position: unset;
      flex-basis: 20rem;
      flex-grow: 1;
      transform: unset;
    }
  }
</style>