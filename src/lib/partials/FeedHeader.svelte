<script>
  export let title;
</script>

<header id="feed-header" labeledby="all-posts-title">
  <h2>{title}</h2>
  <label for="feed-filter-select" class="sr-only">Feed Type</label>
  <div class="select">
    <select name="feed-filter-select" id="feed-filter-select">
      <option value="all">All Posts</option>
      <option value="unread">Unread Posts</option>
      <option value="read">Read Posts</option>
      <option value="favorites">Favorite Posts</option>
    </select>
    <span class="focus"></span>
  </div>
</header>

<style>
  #feed-header {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 2rem ;
    border-bottom: 1px solid rgb(var(--primary-rgb), 0.5);
    height: var(--ui-header-height);
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