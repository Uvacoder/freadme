<script context="module">
  export const ssr = false;
</script>
<script>
  import { feeds } from '$data/feeds.js';
  import { authed } from '$lib/stores/user.store.js';
  import Button from '$lib/components/Button.svelte';
</script>

<aside id="sidebar">
  <ul class="sidebar-menu">
    {#if $authed}
    <li class="sidebar-menu-item">
      <Button buttonType="link" buttonStyle="iconText" iconName="listSettings" href="/settings" title="Customize Feed" />
    </li>
    {:else}
    <li class="sidebar-menu-item">
      <Button buttonType="link" buttonStyle="iconText" iconName="bolt" href="/login" title="Login" />
    </li>
    {/if}

    <li class="sidebar-menu-item">
      <Button buttonType="link" buttonStyle="iconText" iconName="feed" href="/" title="All Posts" /> 
    </li>
    {#each feeds as feed}
      <li class="sidebar-menu-item">
        <Button buttonType="link" buttonStyle={feed.image ? 'imageText' : 'text'} image={feed.image ? feed.image : ''} href="/feed/{feed.slug}" title={feed.name} /> 
      </li>
    {/each}
  </ul>
</aside>

<style>
#sidebar {
  order: 1;
  border-inline-end: 1px solid rgb(var(--primary-rgb), 0.5);
  display: flex;
  flex-direction: column;
  flex-basis: 20rem;
  flex-grow: 1;
}
.sidebar-menu {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.sidebar-menu-item {
  padding: 0.5rem;
}
</style>