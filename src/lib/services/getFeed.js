import Parser from 'rss-parser';

const parser = new Parser({
  customFields: {
    item: ['enclosure']
  }
});

export const getFeed = async(address) => {
  // const response = await parser.parseURL(address);
  // console.log(response);
  // if(!response.ok) {
  //   return { 
  //     status: response.status,
  //     error: new Error(`${address} returned an error.`)
  //   }
  // }
  return {feedFromGetFeed: {}};

  // return response;
} 