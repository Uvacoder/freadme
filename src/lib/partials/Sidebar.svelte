<script>
  const storage = window.localStorage;
  const savedAddresses = JSON.parse(storage.getItem('savedAddresses')) || [];
</script>

<aside id="sidebar">
  <div class="sidebar-header">
    <a href="/settings/feeds">Edit Feeds</a>
  </div>
  <ul class="sidebar-menu">
    <li><a href="/">All Feeds</a></li>
    {#each savedAddresses as address}
      <!-- <li><a href="/fuck">{address.name}</a></li> -->
      <li><a href="/feed/{address.name.toLowerCase().replace(' ', '-')}">{address.name}</a></li>
      <!-- <li><a href="/feed/[{encodeURIComponent(address.url)}]">{address.name}</a></li> -->
    {/each}
  </ul>
</aside>

<style>
#sidebar {
  order: 1;
  border-inline-end: 1px solid rgb(var(--primary-rgb), 0.3);
  display: flex;
  flex-direction: column;
  flex-basis: 20rem;
  flex-grow: 1;
}
.sidebar-menu {

}

.sidebar-header {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-areas: "subscribe-input subscribe-submit";
  padding: 0.5rem;
  border-block-end: 1px solid rgb(var(--primary-rgb), 0.3);
  overflow: visible;
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