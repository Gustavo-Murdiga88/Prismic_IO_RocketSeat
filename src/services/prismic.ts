import * as prismic from '@prismicio/client';
import { HttpRequestLike } from '@prismicio/client';
import { enableAutoPreviews } from '@prismicio/next';

export interface PrismicConfig {
  req?: HttpRequestLike;
}

// export const repositoryName = prismic.getRepositoryName(
//   process.env.PRISMIC_API_ENDPOINT
// );

export function linkResolver(doc) {
  // switch (doc.type) {
  //   case 'homepage':
  //     return '/';
  //   case 'page':
  //     return `/${doc.uid}`;
  //   default:
  //     return null;
  // }
}

export function getPrismicClient(config: PrismicConfig): prismic.Client {
  const client = prismic.createClient(process.env.PRISMIC_API_ENDPOINT, {
    accessToken: process.env.PRISMIC_API_TOKEN,
  });
  enableAutoPreviews({
    client,
    req: config.req,
  });

  return client;
}
