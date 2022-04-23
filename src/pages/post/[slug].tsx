import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { RichText } from 'prismic-dom';
import { RiCalendarLine, RiClockwise2Line, RiUser3Line } from 'react-icons/ri';
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
      headingSecondGroup: string;
      body: {
        text: string;
      }[];
      bodySecondGroup: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
  console.log(post.data.content[0].bodySecondGroup[0].text);
  return (
    <>
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
          <time>
            {' '}
            {format(new Date(post.first_publication_date), 'dd MMM yyyy', {
              locale: ptBR,
            })}
          </time>
          <RiUser3Line />
          <span> {post.data.author} </span>
          <RiClockwise2Line />
          <span> 4 min</span>
        </div>

        <h3>{post.data.content[0].heading}</h3>

        <p>{post.data.content[0].body[0].text}</p>

        <h3>{post.data.content[0].headingSecondGroup}</h3>
        <p> {post.data.content[0].bodySecondGroup[0].text}</p>
      </section>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const prismic = getPrismicClient({});
  // const posts = await prismic.query('post-test-next');

  return {
    paths: [],
    fallback: 'blocking',
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
      post: response,
    },
  };
};
