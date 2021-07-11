<script>
  import '../lib/style/global.css';
  import Sidebar from '../lib/partials/Sidebar.svelte';
  import Header from '../lib/partials/Header.svelte';

</script>

<Header />

<main id="main-content" tabindex="0">
  <slot></slot>
</main>

<Sidebar />

<style>
  main {
    order: 2;
  }
</style>