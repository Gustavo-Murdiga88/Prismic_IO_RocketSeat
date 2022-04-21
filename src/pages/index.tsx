import { GetStaticProps } from 'next';
import { RiUser3Line, RiCalendarLine } from 'react-icons/ri';

import Prismic from '@prismicio/client';
import { useAllPrismicDocumentsByType } from '@prismicio/react';
import { type } from 'os';
// import { getPrismicClient } from '../services/prismic';

import { Console } from 'console';
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

export default function Home(): JSX.Element {
  // TODO
  const [Posts, data] = useAllPrismicDocumentsByType('Posts', {
    fetch: ['data.title', 'data.content'],
  });
  console.log(Posts);
  return (
    <section className={styles.home}>
      <Header />

      <h2>Como utilizar Hooks</h2>
      <p> Pensando em sincronização em vez de ciclos de vida.</p>
      <div>
        <RiCalendarLine />
        <time> 15 Mar 2021 </time>
        <RiUser3Line />
        <span> Teste </span>
      </div>
    </section>
  );
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.Predicates.at('document.type', 'Posts')],
    {
      fetch: ['Posts.tile', 'Posts.content'],
      pageSize: 100,
    }
  );

  return {
    props: { postsResponse },
  };
};
