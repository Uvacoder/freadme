<script>
  import { onMount } from 'svelte';
  import { authed } from '$lib/stores/user.store.js';
  import supabase from '$lib/db.js';
  import Logo from '$lib/components/Logo.svelte';
  let email = '';
  let password = '';
  let session = supabase.auth.session();
  let user = supabase.auth.user();


  async function handleSignup() {
    const { user, session, error } = await supabase.auth.signUp({
      email: email,
      password: password
    })

    console.log('error', error);
    $authed = !$authed;
  }
  onMount(() => {
    console.log('user: ', user);
    console.log('session: ', session);
  })

</script>

<section id="sign-in">
  <Logo scale={4} />
  <div class="form">
    <div class="input-group">
      <label for="sign-in-email" id="email-label">Enter an email address</label>
      <input type="email" id="sign-in-email" placeholder="Email" bind:value={email}>
    </div>
    <div class="input-group">
      <label for="sign-in-password" id="password-label">Enter a password</label>
      <input type="password" id="sign-in-password" placeholder="Password" bind:value={password}>
    </div>
    <button on:click={handleSignup}>Sign In</button>
  </div>
</section>

<style>
  #sign-in {
    display: flex;
    flex-direction: column;
    gap: var(--space-700);
    align-items: center;
    min-height: 100%;
    margin-top: var(--space-700);
    color: var(--primary-light);
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--space-600);
  }
  .input-group {
    display: flex;
    flex-direction: column;
    gap: var(--size-500);
  }
  button {
    order: 5;
    font-size: var(--font-3);
  }

  .input-group input {
    order: 1;
  }
  .input-group label {
    order: 2;
    font-size: var(--font-3);
  }

</style>