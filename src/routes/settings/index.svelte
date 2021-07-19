<script context="module">
  export const ssr = false;
</script>

<script>
  import { addFeed } from '$lib/services/feeds.service.js';

  let url;
  let name;
  let error;
  let message;

  const newFeed = async () => {
    try {
      const response = await fetch('http://localhost:8080/feeds', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          url: url,
          name: name,
        })
      });
      // console.log(response);
      const data = await response.json();
      
      addFeed(data);
    } catch(error) {
      console.error(error);
      error = error?.message;
    }
  }
</script>
<div class="form">
  <form on:submit|preventDefault={newFeed}>
    <label for="name-input">Feed Name</label>
    <input type="text" id="name-input" placeholder="Name" bind:value={name}>
    <label for="url-input">Feed URL</label>
    <input type="text" id="url-input" placeholder="https://example.com/feed/" bind:value={url}>
    <input type="submit" value="Save">
  </form>
</div>

<style>
  .form {
    margin-inline: auto;
    margin-top: var(--space-700);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: var(--space-500);
  }
  label {
    font-size: var(--font-2);
  }
</style>
