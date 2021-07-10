import fetch from 'node-fetch';

const baseUrl = 'https://css-tricks.com/feed/';

export async function getFeed(address) {
    const response = await fetch(address);

    if(!response.ok) {
      return {
        status: response.status,
        error: new Error(`Could not find a proper feed at ${address}`),
      };
    }

    const data = await response.text();
    
    return data;
}
export const get = async() => {
  const feed = await getFeed(baseUrl);

  return {body: feed};
};