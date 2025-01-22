// @/sanity/lib/sanity.ts
import { defineLive } from 'next-sanity';
import { client } from './client';

// Replace with a valid API version (e.g., '2023-01-01')
export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    apiVersion: '2023-01-01', // Use a valid API version here
  }),
});
