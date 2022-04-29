import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { RichText } from 'prismic-dom';
import { RiCalendarLine, RiClockwise2Line, RiUser3Line } from 'react-icons/ri';
import * as Prismic from '@prismicio/client';

import { useRouter } from 'next/router';
import Header from '../../components/Header';

import { getPrismicClient } from '../../services/prismic';

// import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}
interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
  const router = useRouter();

  return (
    <>
      {router.isFallback && <h1>Carregando...</h1>}
      <Head>
        <title> Posts | {post.data.title}</title>
      </Head>
      <div className={styles.header}>
        <Header />
      </div>
      <img className={styles.banner} src={post.data.banner.url} alt="logo" />
      <section className={styles.main}>
        <h2>{post.data.title}</h2>
        <div>
          <RiCalendarLine />
          <time>{post.first_publication_date}</time>
          <RiUser3Line />
          <span> {post.data.author} </span>
          <RiClockwise2Line />
          <span> 4 min</span>
        </div>

        <h3>{post.data.content[0].heading}</h3>
        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: RichText.asHtml(post.data.content[0].body),
          }}
        />

        <h3>{post.data.content[1].heading}</h3>
        <div
          className="posts"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: RichText.asHtml(post.data.content[1].body),
          }}
        />
      </section>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient({});
  const posts = await prismic.getByType('posts-test-next', {
    accessToken: process.env.PRISMIC_API_TOKEN,
  });
  // const prismic = getPrismicClient({});
  // const posts = await prismic.query(
  //   [Prismic.predicate.at('document.type', 'post-test-next')],
  //   {
  //     fetch: ['post-test-next.uid'],
  //     pageSize: 5,
  //   }
  // );

  const slug = posts.results.map(item => item.uid);

  return {
    paths: [
      {
        params: {
          slug: slug[0],
        },
      },
      {
        params: {
          slug: slug[1],
        },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const prismic = getPrismicClient({});
  const { slug } = params;
  const response = await prismic.getByUID('posts-test-next', String(slug), {
    accessToken: process.env.PRISMIC_API_TOKEN,
  });

  return {
    props: {
      post: {
        first_publication_date: format(
          new Date(response.first_publication_date),
          'dd MMM yyyy',
          {
            locale: ptBR,
          }
        ),
        data: response.data,
      },
    },
  };
};
