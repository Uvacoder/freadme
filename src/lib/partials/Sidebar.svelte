<script>
  import { feeds } from '$data/feeds.js';
  import Button from '$lib/components/Button.svelte';
</script>

<aside id="sidebar">
  <div class="sidebar-header">
    <a href="/settings/feeds">Edit Feeds</a>
    <button class="button-icon">
      <Button 
        buttonStyle="iconText"
        buttonType="button"
        title="Add Feed"
        iconName="plus"
      />
    </button>
  </div>
  <ul class="sidebar-menu">
    <li><a href="/">All Feeds</a></li>
    {#each feeds as feed}
      <li><a href="/feed/{feed.slug}">{feed.name}</a></li>
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

}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid rgb(var(--primary-rgb), 0.5);
  overflow: visible;
  height: var(--ui-header-height);
}

.button-icon {
  padding: 0;
  background: transparent;
}

.subscribe-input {
  grid-area: subscribe-input;
  background-color: rgb(var(--primary-rgb), 0.1);
  outline-offset: 0;
  color: var(--light);
  padding: 0.25rem 0.5rem;
  font-size: 1.25rem;
}

.subscribe-submit {
  grid-area: subscribe-submit;
  padding: 0.25rem 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  border-radius: 0 0.125rem 0.125rem 0;
  outline-offset: 0;
  border: 1px solid rgb(var(--primary-rgb), 0.5);
  border-inline-start: none;
}
.subscribe-submit:hover {
  background: var(--primary-light);
}
</style>