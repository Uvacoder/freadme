<script context="module">
  export const load = async({page, fetch, session, context}) => {
    
    const name = page.params.name;
    
    return {
      props: {
        name,
      }
    }
  }
</script>

<script>
  export let name;
</script>

<h2>{name}</h2>