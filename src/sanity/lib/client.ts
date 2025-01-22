// @/sanity/lib/client.ts
import { createClient as sanityClient } from 'next-sanity';

export const createClient = () =>
  sanityClient({
    projectId: '15hm7ok6', // Replace with your actual project ID
    dataset: 'production',
    token: 'skyEDFMwmS8Y9laviQSbbXOzFxEe1MNwZvgnWURpuUWm5qnn7lmRSltk7tgcClGe4N0m7i8kGAllFLhMg8Ww1A27O49uWYW7EdWLy8Jabhy6Eesk9hGMgvijMDnbsYCIdXajOsrSmxg42pUIXv8YOwkVetGVFv7KqChA4QwWXRCZuV3uaZJr', // Replace with your actual token
    useCdn: true,
  });



