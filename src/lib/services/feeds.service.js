import supabase from '../db.js';

export const addFeed = async (feedInfo) => {

  const { link, name, image, description, categories, slug } = feedInfo;
  const newFeed = {
    link,
    name,
    image: image || null,
    description: description || null,
    categories: categories || null,
    slug,
  };

  console.log('newFeed: ', newFeed);

  const { data, error } = await supabase().from('feeds').insert([newFeed], {returning: 'minimal'});
  
  // console.log(data);
  
  // if(error) throw error;
  
  // return data;
};

export const getFeeds = async () => {
  const { data, error } = await supabase.from('feeds').select();

  if(error) {
    if(error.status === 'Invalid authentication credentials') {
      
    }
  }

  return data
};