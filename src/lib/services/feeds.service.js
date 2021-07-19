import supabase from '../db.js';

export const addFeed = async (feedInfo) => {

  const { data, error } = await supabase()
    .from('feeds')
    .insert(feedInfo);
  
  console.table(data);
  
  if(error) {
    console.error(error.message);
    return {
      ok: false,
      error
    }
  }
  
  return data;
};

export const getFeeds = async () => {
  const { data, error } = await supabase.from('feeds').select();

  if(error) {
    console.error(error);
  }

  return data
};