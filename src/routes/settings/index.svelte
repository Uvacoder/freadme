<script context="module">
  export const ssr = false;
</script>

<script>
  import { addFeed } from '$lib/services/feeds.service.js';

  let url;

  const newFeed = async () => {
    const response = await fetch('http://localhost:8080/feeds', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        url: url
      })
    });

    console.log(response);

    if(!reponse.ok) {
      return {
        ok: false,
        error: new Error(response.error?.message)
      }
    }

    const data = await response.json();

    console.log(data);

  }
</script>

  <form on:submit|preventDefault={newFeed}>
      <label for="url-input">Feed URL</label>
      <div class="form-control">
        <input type="text" id="url-input" placeholder="https://example.com/feed/" bind:value={url}>
        <input type="submit" value="Save">
      </div>
  </form>

<style>
  form {
    margin-top: var(--space-700);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .form-control {
    display: flex;
  }
  label {
    font-size: var(--font-2);
  }
</style>
