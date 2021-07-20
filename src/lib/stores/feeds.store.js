import { writable, get } from 'svelte/store';
import supabase from '../db.js';

export const feeds = writable([]);

export const feedObjects = writable({});

// supabase.from('feeds').on('*', payload => {
//   console.log('feeds changed: ', payload);
//   const oldFeeds = get(feeds);
//   let oldFeed = oldFeeds.filter((feed) => feed.link === payload.new.link);
//   oldFeed = payload.new;
//   feeds.update((feeds) => feeds = [...oldFeeds]);
// }).subscribe();