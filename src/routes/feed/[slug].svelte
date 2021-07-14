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
  $: feedUrl = '';
  $: feedObject = {};
  $: slug = '';
  $: feed = [];

  const feedData = JSON.parse(window.localStorage.getItem('savedAddresses'));
  
  function updateFeedObject() {
    if(slug === '' || slug === undefined) {
      const location = window.location.toString();
      const split = location.split('/');
      slug = split[split.length - 1];
    }

    feedObject = {...feedData.filter((obj) => obj.slug === slug)[0]};
    name = feedObject.name;
    feedUrl = feedObject.url;
    slug = feedObject.slug;
  }

  async function getFeed() {
    const response = await fetch(`/feed/${slug}`);
    
    if(!response.ok) {
      return {
        error: new Error(`Could not get feed at ${slug}`), 
        status: response.status
      }
    } else {
      const data = await response.text();
      // console.log(data);
    }
  }

  console.log($page.query);
  
  onMount(() => {
    updateFeedObject();
    getFeed();
  });
  window.addEventListener('sveltekit:navigation-start', (event) =>{
    updateFeedObject();
    getFeed();
  });
  
  window.addEventListener('sveltekit:navigation-end', (event) =>{
    updateFeedObject();
    getFeed();
  });
</script>

<section tabindex="0">
  <h2 aria-label="Feed list: {name}">{name}</h2>
  <a href="{feedUrl}">
    <h3>{feedObject?.url}</h3>
  </a>
</section>
