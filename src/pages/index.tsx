import Link from 'next/link';
import { GetStaticProps } from 'next';
import { RiUser3Line, RiCalendarLine } from 'react-icons/ri';
import { format } from 'date-fns';

import { ptBR } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import { getPrismicClient } from '../services/prismic';

import styles from './home.module.scss';

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

export default function Home({ postsPagination }: HomeProps): JSX.Element {
  const [display, setDisplay] = useState<boolean>(false);

  return (
    <>
      <Head>
        <title> Posts | index </title>
      </Head>
      <section className={styles.home}>
        <Header />
        {display
          ? postsPagination.results.reverse().map(items => (
              <div key={items.uid}>
                <Link href={`/post/${items.uid}`} prefetch>
                  <a>
                    <h2>{items.data.title}</h2>
                  </a>
                </Link>
                <p> {items.data.subtitle}</p>
                <div>
                  <RiCalendarLine />
                  <time>
                    {' '}
                    {format(
                      new Date(items.first_publication_date),
                      'dd MMM yyyy',
                      {
                        locale: ptBR,
                      }
                    )}
                  </time>
                  <RiUser3Line />
                  <span> {items.data.author} </span>
                </div>
              </div>
            ))
          : postsPagination.results.slice(1).map(items => (
              <div key={items.uid}>
                <Link href={`/post/${items.uid}`} prefetch key={items.uid}>
                  <a>
                    <h2>{items.data.title}</h2>
                  </a>
                </Link>
                <p> {items.data.subtitle}</p>
                <div>
                  <RiCalendarLine />
                  <time>
                    {' '}
                    {format(
                      new Date(items.first_publication_date),
                      'dd MMM yyyy',
                      {
                        locale: ptBR,
                      }
                    )}
                  </time>
                  <RiUser3Line />
                  <span> {items.data.author} </span>
                </div>
              </div>
            ))}
      </section>

      <div className={!display ? styles.loadingPosts : styles.loadingNone}>
        <button type="button" onClick={() => setDisplay(!display)}>
          Carregar mais posts
        </button>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient({});
  const postsPagination = await prismic.getByType('posts-test-next', {
    accessToken: process.env.PRISMIC_API_TOKEN,
    pageSize: 5,
  });
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
        results: postsPagination.results,
      },
    },
  };
};
