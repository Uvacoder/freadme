<script>

</script>

<aside id="sidebar">
  <header class="sidebar-header">
    <input type="text" aria-label="New Feed URL" class="subscribe-input" id="subscribe-input">
    <label id="subscribe-label" for="subscribe-input" class=sr-only>New Feed URL</label>
    <button type="button" class="subscribe-submit">Save</button>
  </header>
</aside>

<style>
#sidebar {
  order: 1;
  height: 100%;
  border-inline-end: 1px solid rgb(var(--primary-rgb), 0.3);
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-areas: "subscribe-input subscribe-submit";
  grid-gap: 0.5rem;
  padding: 1rem;
  border-block-end: 1px solid rgb(var(--primary-rgb), 0.3);
  overflow: visible;
}

.subscribe-input {
  grid-area: subscribe-input;
  background-color: rgb(var(--primary-rgb), 0.1);
}

.subscribe-submit {
  grid-area: subscribe-submit;
}
</style>