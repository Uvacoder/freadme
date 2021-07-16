<script>
  import { getStores, navigating, page, session } from '$app/stores';
  import { onMount } from 'svelte';
  import Logo from '../components/Logo.svelte';
  let namePromise;

  const getFeedName = async () => {
    const pathArray = $page.path.split('/');
    const slug = pathArray[pathArray.length - 1];
    const response = await fetch(`http://localhost:8080/subscriptions/${slug}`);

    if(response.ok) {
      const data = await response.json();
      return data.name;
    } else {
      throw new Error(response);
    }
  };

  onMount(() => {
    if($page.path !== '/') {
      namePromise = getFeedName();
    }
  });

  window.addEventListener('sveltekit:navigation-end', (event) => {
    console.log($page.path);
    if($page.path !== '/') {
      namePromise = getFeedName();
    }
  });
</script>

<header>
  <div class="main-section">
    <div class="skip-section">
      <a href="#main-content" class="button focused-only" id="skip-link">Skip to Content</a>
      <h1 class="sr-only" id="page-label">FreedMe - The Easy Feed Reader</h1>
    </div>
    {#if $page.path !== '/'}
    {#await namePromise}
      <h2>&nbsp;</h2>
      {:then name}
      <h2>{name}</h2>
      {:catch error}
      <h2>{error.message}</h2>
      {/await}
    {:else}
    <h2>All Posts</h2>
    {/if}
  </div>
  <div class="sidebar-section">
    <a href="/" aria-labelledby="page-label" id="brand">
      <Logo />
    </a>
  </div>
</header>

<style>
  header {
    grid-area: header;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    border-bottom: 1px solid rgb(var(--primary-rgb), 0.5);
    height: var(--ui-header-height);
    overflow: hidden;
  }
  .main-section, .sidebar-section {
    padding: 0.5rem;
  }
  .main-section {
    display: flex;
    order: 2;
    flex-basis: 0;
    flex-grow: 999;
    min-width: 50%;
  }
  .sidebar-section {
    order: 1;
    flex-basis: 20rem;
    flex-grow: 1;
    border-right: 1px solid rgb(var(--primary-rgb), 0.5);
  }
  .skip-section {
    order: 2;
  }
  .title {
    order: 1;
  }
  nav {
    order: 3;
  }
</style>