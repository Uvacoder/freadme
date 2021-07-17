<script>
  import { authed } from '$lib/stores/user.store.js';
  import Logo from '$lib/components/Logo.svelte';


  async function handleSignup() {
    $authed = !$authed;
  }
</script>

<section id="sign-up">
  <Logo scale={2} />
  {#if !$authed}
  <div class="input-group">
    <label for="sign-up-input">Enter an email address to sign up.</label>
    <input type="email" id="sign-up-input" placeholder="Email" >
    <button on:click={handleSignup}>Sign Up</button>
  </div>
  {:else}
  <div class="input-group">
    <button on:click={handleSignup}>Sign Out</button>
  </div>

  {/if}
</section>

<style>
  #sign-up {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-700);
    min-height: 100%;
    margin-top: var(--space-700);
    color: var(--primary-light);
  }
  #sign-up  svg {
    width: 7rem;
    fill: currentColor;
  }
  .input-group {
    display: flex;
    flex-direction: column;
    gap: var(--space-500);
  }
  .input-group input {
    order: 1;
  }
  button {
    order: 3;
    font-size: var(--font-3);
  }
  .input-group label {
    order: 2;
    font-size: var(--font-3);
  }

</style>