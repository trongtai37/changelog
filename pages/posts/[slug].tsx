import { getPostBySlug, getPostsSlugs } from 'lib/api';
import markdownToHtml from 'lib/markdownToHtml';
import type { Post } from 'models/post';
import Head from 'next/head';
import { useRouter } from 'next/router';
import * as React from 'react';
import Giscus from '@giscus/react';
import { formatDate } from 'lib/date';
import { useTheme } from 'hooks/useTheme';

interface PostProps {
  post: Post;
}

const BlogPost = ({ post }: PostProps) => {
  const router = useRouter();
  const { isDarkMode } = useTheme();

  if (!router.isFallback && !post?.slug) {
    return <div>Error</div>;
  }

  return (
    <article className='prose prose-slate dark:prose-invert mx-auto max-w-3xl pt-8'>
      <Head>
        <title>{post.title}</title>
        <link
          rel='stylesheet'
          href='https://prismjs.com/themes/prism-tomorrow.css'
        />
      </Head>
      <header>
        <h1 className='mb-2 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white'>
          {post.title}
        </h1>
        <p className='text-base font-light text-gray-500 dark:text-gray-400'>
          <time dateTime='2022-02-08' title='February 8th, 2022'>
            {formatDate(new Date(post.date))}
          </time>
        </p>
        <hr />
      </header>
      <section dangerouslySetInnerHTML={{ __html: post.content }} />
      <Giscus
        id='comments'
        repo='trongtai37/changelog'
        repoId='R_kgDOIPZLUg='
        category='Q&A'
        categoryId='DIC_kwDOIPZLUs4CSVB_'
        mapping='url'
        term='Welcome to @giscus/react component!'
        reactionsEnabled='1'
        emitMetadata='0'
        inputPosition='top'
        theme={isDarkMode ? 'dark' : 'light'}
        lang='en'
        loading='lazy'
      />
    </article>
  );
};

export default BlogPost;

export async function getStaticProps({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const post = getPostBySlug(params.slug);
  const content = await markdownToHtml(post.content || '');

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const slugs = getPostsSlugs();

  return {
    paths: slugs.map((slug) => {
      return {
        params: {
          slug,
        },
      };
    }),
    fallback: false,
  };
}
