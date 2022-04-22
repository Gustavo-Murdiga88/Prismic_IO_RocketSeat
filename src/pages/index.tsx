import { GetStaticProps } from 'next';
import { RiUser3Line, RiCalendarLine } from 'react-icons/ri';
import { format } from 'date-fns';

import Prismic, { createClient } from '@prismicio/client';
import { useAllPrismicDocumentsByType } from '@prismicio/react';
import { ptBR } from 'date-fns/locale';
import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import Header from '../components/Header';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Home({ postsPagination }: HomeProps): JSX.Element {
  console.log(postsPagination);

  return (
    <section className={styles.home}>
      <Header />

      {postsPagination.results.map(items => (
        <>
          <h2>{items.data.title}</h2>
          <p> {items.data.subtitle}</p>
          <div>
            <RiCalendarLine />
            <time>
              {' '}
              {format(new Date(items.first_publication_date), 'dd MMM yyyy', {
                locale: ptBR,
              })}
            </time>
            <RiUser3Line />
            <span> {items.data.author} </span>
          </div>
        </>
      ))}
    </section>
  );
}

export async function getStaticProps() {
  const prismic = getPrismicClient({});
  const postsPagination = await prismic.getByUID(
    'Posts',
    'como-utilizar-hooks',
    {
      accessToken: process.env.PRISMIC_API_TOKEN,
      pageSize: 5,
    }
  );
  // const client = createClient(process.env.PRISMIC_API_ENDPOINT, {
  //   accessToken: process.env.PRISMIC_API_TOKEN,
  // });
  // const postsPagination = await client.getByUID(
  //   'Posts',
  //   'npm-pacotes-pacotes-e-pacotes',
  //   {
  //     accessToken: process.env.PRISMIC_API_TOKEN,
  //   }
  // );

  return {
    props: {
      postsPagination: {
        results: [
          {
            data: {
              title: postsPagination.data.slices[0].items[0].title[0].text,
              subtitle:
                postsPagination.data.slices[0].items[0].subtitle[0].text,
              author: postsPagination.data.slices[0].items[0].author[0].text,
            },
            uid: postsPagination.uid,
            first_publication_date: postsPagination.first_publication_date,
          },
          {
            data: {
              title: postsPagination.data.slices[0].items[1].title[0].text,
              subtitle:
                postsPagination.data.slices[0].items[1].subtitle[0].text,
              author: postsPagination.data.slices[0].items[1].author[0].text,
            },
            uid: postsPagination.uid,
            first_publication_date: postsPagination.first_publication_date,
          },
        ],
      },
    },
  };
}
