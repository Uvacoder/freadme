<script context="module">
  export const load = async({page, fetch, session, context}) => {
    
    const slug = page.params.slug;
    
    return {
      props: {
        slug,
      }
    }
  }
</script>

<script>
  import { page, navigating } from '$app/stores';
  import { onMount } from 'svelte';
  export let slug;
  $: name = '';
  $: feedObject = {};
  const feedData = JSON.parse(window.localStorage.getItem('savedAddresses'));

  window.addEventListener('sveltekit:navigation-start', (event) =>{
    
  });
  
  window.addEventListener('sveltekit:navigation-end', (event) =>{
    updateFeedObject();
  });
  
  function updateFeedObject() {
    feedObject = {...feedData.filter((obj) => obj.slug === slug)[0]};
    name = feedObject.name;
  }
  
  onMount(() => {
    updateFeedObject();
  });
</script>

<section tabindex="0">
  <h2 aria-label="Feed list: {name}">{name}</h2>
  <h3>{feedObject?.url}</h3>
</section>
