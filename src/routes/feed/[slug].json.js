import { getFeed } from '$services/getFeed.js';

export const get = async({params}) => {
  const { slug } = params;

  return JSON.stringify({
    body:{
      requestedSlug: slug
    }
  })
}