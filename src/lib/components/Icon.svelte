<script>
  export let name;

  const iconPaths = {
    plus: [
      "M12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V11.25H16C16.4142 11.25 16.75 11.5858 16.75 12C16.75 12.4142 16.4142 12.75 16 12.75H12.75V16C12.75 16.4142 12.4142 16.75 12 16.75C11.5858 16.75 11.25 16.4142 11.25 16V12.75H8C7.58579 12.75 7.25 12.4142 7.25 12C7.25 11.5858 7.58579 11.25 8 11.25H11.25V8C11.25 7.58579 11.5858 7.25 12 7.25Z", 
      "M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.937 1.25 22.75 6.06293 22.75 12C22.75 17.937 17.937 22.75 12 22.75C6.06293 22.75 1.25 17.937 1.25 12ZM12 2.75C6.89136 2.75 2.75 6.89136 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75Z"
    ],
    feed: [
      "M3 4h18v2H3V4zm0 7h12v2H3v-2zm0 7h18v2H3v-2z"
    ],
    home: [],
    tag: [],
  }

  $: paths = iconPaths[name] || [];

</script>

<svg
  class="c"
  viewBox="0 0 24 24"
  fill-rule="evenodd"
  clip-rule="evenodd"
>
{#each paths as path}
  <path d="{path}"></path>
{/each}
</svg>

<style>
  .c {
    width: 1em;
    height: 1em;
    fill: currentColor;
    transition: all 300ms ease-out;
    overflow: visible;    
  }
</style>