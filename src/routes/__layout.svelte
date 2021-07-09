<script>
  import '../lib/style/global.css';

  import Sidebar from '../lib/partials/Sidebar.svelte';
</script>
<main>
  <slot></slot>
</main>

<Sidebar />

<style>
  main {
    order: 2;
  }
</style>