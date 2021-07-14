import { getFeed } from '$services/getFeed.js';

export const get = async({params}) => {
  console.log('Hello, slug!');
  console.log(params);
}