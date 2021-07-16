<script>
  import Icon from './Icon.svelte';
  // buttonType:
  // 'button': will be an actual button element,
  // 'link': an anchor tag, styled like a button
  export let buttonType = 'button';

  //buttonStyle:
  // 'icon': just the icon, no text,
  // 'iconText': icon and text
  // 'text': just the text
  export let buttonStyle = 'text';
  export let title = '';
  export let iconName;
  export let href;
  export let order = 'reversed';

</script>

{#if buttonType === 'button'}
  <button aria-label="{title}">
    <span class="button-inner">
      {#if buttonStyle === 'icon'}
        <Icon name={iconName} />
      {:else if buttonStyle === 'iconText'}
      <span class="text" style="{order === 'reversed' ? 2 : 1}">
        {title}
      </span>
      <div class="icon" style="order:{order === 'reversed' ? 1 : 2}">
        <Icon name={iconName} />
      </div>
      {:else}
        {title}
      {/if}
    </span>
  </button>
{:else}
  <a href="{href}" class="button">
    <span class="button-inner">
      {#if buttonStyle === 'icon'}
        <Icon name={iconName} />
      {:else if buttonStyle === 'iconText'}
      <span class="text" style="{order === 'reversed' ? 2 : 1}">
        {title}
      </span>
      <div class="icon" style="order:{order === 'reversed' ? 1 : 2}">
        <Icon name={iconName} />
      </div>
      {:else}
        {title}
      {/if}
    </span>
  </a>
{/if}

<style>
  .button-inner {
    display: flex;
    justify-content: space-between;
    gap: 1em;
    color: currentColor;
  }
</style>