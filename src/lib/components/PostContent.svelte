<script>
  import '../style/prism-atom-dark.css';
  import { onMount } from 'svelte';
  import { headDown } from '../utils/headDown.js';
  import { highlight } from '../utils/highlight.js'
  import { strToHTML } from '../utils/strToHTML.js';
  export let content;
  let highlightedContent;

  onMount(() => {
    // parser = new DOMParser();
    const cleanedContent = headDown(content);
    const DOMContent = strToHTML(cleanedContent);
    // console.log('DOMContent: ', DOMContent.childNodes);
    const highlighted = highlight(DOMContent.childNodes);
    // const
    highlightedContent = highlighted.innerHTML;
  });
</script>

<section class="content flow" tabindex="0">
  {@html highlightedContent}
</section>

<style>
  .content {
    order: 2;
    padding: 1rem;
    border-top: 1px solid rgb(var(--primary-rgb), 0.5);
  }
</style>