import { getAllPosts, getPostBySlug } from 'lib/api';
import markdownToHtml from 'lib/markdownToHtml';
import type { Post } from 'models/post';
import Head from 'next/head';
import { useRouter } from 'next/router';
import * as React from 'react';
import Giscus from '@giscus/react';
import Image from 'next/image';

interface PostProps {
  post: Post;
  morePosts: Post[];
  preview?: boolean;
}

const BlogPost = ({ post }: PostProps) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <div>Error</div>;
  }

  return (
    <article className='prose prose-slate dark:prose-invert mx-auto max-w-3xl pt-8'>
      <Head>
        <title>{post.title}</title>
        <meta property='og:image' content={post.ogImage.url} />
        <link
          rel='stylesheet'
          href='https://prismjs.com/themes/prism-tomorrow.css'
        />
      </Head>
      <h1 className='text-center mb-2'>{post.title}</h1>
      <Image
        className='w-full object-cover aspect-video'
        src='https://images.unsplash.com/photo-1667326792403-55f2acb32d50'
        alt='preview image'
      />
      <hr />
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
        theme='light'
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
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ]);
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
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
