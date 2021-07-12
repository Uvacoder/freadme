<script>

</script>

<header id="feed-header" tabindex="0" labeledby="all-posts-title">
  <label for="feed-filter-select">Feed Type</label>
  <div class="select">
    <select name="feed-filter-select" id="feed-filter-select">
      <option value="all">All</option>
      <option value="unread">Unread</option>
      <option value="read">Read</option>
      <option value="favorites">Favorites</option>
    </select>
  </div>
</header>

<style>
  #feed-header {
    display: flex;
    gap: 2rem;
    padding: 0.5rem 2rem ;
    border-bottom: 1px solid rgb(var(--primary-rgb), 0.5);
  }
  label {
    font-size: var(--size-600);
    font-weight: 600;
    letter-spacing: 0.125rem;
    color: rgb(var(--light-rgb), 0.8);
  }
  #feed-header:focus {
    outline: 2px solid var(--accent-primary);
    outline-offset: -2px;
    background-color: rgb(var(--darkdark), 0.5);
  }
</style>