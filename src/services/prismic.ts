import * as Prismic from '@prismicio/client';
import {} from '@prismicio/client';

export const repositoryName = 'Posts';

export const client = Prismic.createClient(repositoryName, {
  accessToken: process.env.PRISMIC_API_TOKEN,
});

export function getPrismicClient(req?: unknown): any {
  const prismic = Prismic.createClient(process.env.PRISMIC_API_ENDPOINT, {
    // req,
    accessToken: process.env.PRISMIC_API_TOKEN,
  });

  return prismic;
}
