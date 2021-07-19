import supabase from '../db.js';

export const addFeed = async (feedInfo) => {
  const { data, error } = await supabase()
    .from('feeds')
    .upsert(feed);

  if(error) {
    return {
      ok: false,
      error: new Error(error.message)
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