<script context="module">

  export const load = async ({fetch}) => {
    const response = await fetch('/feed.json');
    const allFeedsResponse = await fetch('/allfeeds.json');

    if(!response.ok) {
      return {
        status: response.status,
        error: new Error(`Could not find a proper feed...`),
      };
    }

    const data = await response.json();
    const allData = await allFeedsResponse.json();
    
    const bigFeed = [];

    allData.forEach((feed) => {
      feed.items.forEach((item) => {
        bigFeed.push({
          ...item,
          feedDescription: feed.description,
          feedTitle: feed.title,
          feedImage: feed.image?.url,
          feedImageTitle: feed.image?.title,
          feedLink: feed.link,
        });
      })
    });

    return {
      props: {
        bigFeed: bigFeed
        // data
      }
    };
  };

</script>
<script>
  import { sortByPubDate } from '../lib/utils/sortByPubDate.js';
  import Post from '../lib/components/Post.svelte';
  // export let data;
  export let bigFeed;
  // const feed = sortByPubDate([...data.items]);
  const feed = sortByPubDate(bigFeed);

</script>
    {#each feed as post}
      <!-- <Post {post} feedDescription={data.description} feedImage={data.image} feedTitle={data.title} feedLink={data.link} /> -->
      <Post {post} feedDescription={post.feedDescription} feedImage={post.feedImage} feedTitle={post.feedTitle} feedLink={post.feedLink} />
    {/each}

<style>
</style>