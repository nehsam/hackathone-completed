import sanityClient, { createClient } from '@sanity/client';

const client = createClient({
  projectId: '15hm7ok6', // Your Sanity project ID
  dataset: 'production', // Dataset, generally 'production' hota hai
  token: 'skyEDFMwmS8Y9laviQSbbXOzFxEe1MNwZvgnWURpuUWm5qnn7lmRSltk7tgcClGe4N0m7i8kGAllFLhMg8Ww1A27O49uWYW7EdWLy8Jabhy6Eesk9hGMgvijMDnbsYCIdXajOsrSmxg42pUIXv8YOwkVetGVFv7KqChA4QwWXRCZuV3uaZJr', // Sanity API token
  useCdn: true, // Use CDN for faster responses
});

