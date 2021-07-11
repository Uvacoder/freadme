<script>
  import Logo from '../components/Logo.svelte';
</script>

<header>
  <div class="skip-section">
    <a href="#main-content" class="button focused-only" id="skip-link">Skip to Content</a>
    <h1 class="sr-only" id="page-label">FreedMe - The Easy Feed Reader</h1>
  </div>
  <div class="brand-section">
    <a href="/" aria-labelledby="page-label" id="brand">
      <Logo />
    </a>
  </div>

  <nav>

  </nav>
</header>

<style>
  header {
    grid-area: header;
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid rgb(var(--primary-rgb), 0.5);
  }
  .skip-section {
    order: 2;
  }
  .brand-section {
    order: 1;
  }
  nav {
    order: 3;
  }
</style>