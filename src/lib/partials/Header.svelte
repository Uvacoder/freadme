<script>
  import { getStores, navigating, page, session } from '$app/stores';
  import { goto } from '$app/navigation';
  import { authed } from '$lib/stores/user.store.js';
  import supabase from '$lib/db.js';
  import { onMount } from 'svelte';
  import Logo from '../components/Logo.svelte';
  import Button from '$lib/components/Button.svelte';
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

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if(error) {
      console.log(error);
    } else {
      $authed = false;
    }
    goto('/');
  }

  onMount(() => {
    if($page.path !== '/') {
      namePromise = getFeedName();
    }

    window.addEventListener('sveltekit:navigation-end', (event) => {
      console.log($page.path);
      if($page.path !== '/') {
        namePromise = getFeedName();
      }
    });
  });

</script>

<header>
  <div class="main-section">
    <div class="skip-section">
      <a href="#main-content" class="button focused-only" id="skip-link">Skip to Content</a>
      <h1 class="sr-only" id="page-label">FreedMe - The Easy Feed Reader</h1>
    </div>

    <div class="title">
      {#if $page.path === '/'}
      <h2>All Posts</h2>
      {:else if $page.path === '/settings'}
      <h2>Settings</h2>
      {:else if $page.path === '/login'}
      <h2>Log In</h2>
      {:else}
      {#await namePromise}
      <h2>&nbsp;</h2>
      {:then name}
      <h2>{name}</h2>
      {:catch error}
      <h2>{error.message}</h2>
      {/await}
      {/if}
    </div>

    <div class="control">
      {#if $authed}
      <div class="header-button" on:click={signOut}>
        <Button title="Log Out" buttonType="button" buttonStyle="iconText" iconName="logOut" />
      </div>
      <div class="header-button">
        <Button title="Settings" buttonType="link" href="/settings" buttonStyle="iconText" iconName="settings" />
      </div>
      {:else}
      <div class="header-button" on:click={signOut}>
        <Button title="Log In" buttonType="link" href="/login" buttonStyle="iconText" iconName="logIn" />
      </div>
      {/if}
    </div>

  </div>

  <div class="sidebar-section">
    <a href="/" aria-labelledby="page-label" id="brand">
      <Logo />
    </a>
  </div>

</header>

<style>
  header {
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid rgb(var(--primary-rgb), 0.5);
    overflow: hidden;
    background-color: var(--dark);
  }

  header > * {
    align-items: center;
    height: var(--ui-header-height);
  }
  .main-section, .sidebar-section {
    padding: 0.5rem;
  }
  .main-section {
    display: flex;
    order: 2;
    justify-content: space-between;
    flex-basis: 0;
    flex-grow: 999;
    min-width: 50%;
  }
  .sidebar-section {
    display: flex;
    align-items: flex-start;
    order: 1;
    border-bottom: 1px solid rgb(var(--primary-rgb), 0.5);
  }
  .title {
    order: 1;
  }
  .title h2 {
    font-size: var(--font-2);
  }
  .skip-section {
    order: 2;
  }
  .control {
    order: 3;
    display: flex;
    gap: 1rem;
  }
  @media screen and (min-width: 768px) {
    header {
      /* position: relative; */
      height: var(--ui-header-height);
      grid-area: header;
      flex-direction: row;
      justify-content: space-between;
    }
    .sidebar-section {
      flex-basis: 20rem;
      flex-grow: 1;
      border-bottom: none;
      border-right: 1px solid rgb(var(--primary-rgb), 0.5);
    }
  }
</style>