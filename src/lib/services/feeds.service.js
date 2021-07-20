import supabase from '../db.js';

export const addFeed = async (feedInfo) => {

  const { link, name, image, description, categories, slug, feed_link } = feedInfo;

  const newFeed = {
    feed_link,
    name,
    link,
    image: image || null,
    description: description || null,
    slug,
    categories: categories || null,
  };

  const { data, error } = await supabase
    .from('feeds')
    .upsert(newFeed);
  
  if(error) throw error;
  
  return data;
};

export const getFeeds = async () => {
  const { data, error } = await supabase.from('feeds').select();

  if(error) {
    if(error.status === 'Invalid authentication credentials') {
      // do something!
    }
  }

  return data;
};