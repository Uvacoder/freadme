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
  border-inline-end: 1px solid rgb(var(--primary-rgb), 0.3);
  display: flex;
  flex-direction: column;
  flex-basis: 20rem;
  flex-grow: 1;
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