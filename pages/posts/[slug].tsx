import { MainLayout } from 'layouts';
import { getAllPosts, getPostBySlug } from 'lib/api';
import markdownToHtml from 'lib/markdownToHtml';
import type { Post } from 'models/post';
import Head from 'next/head';
import { useRouter } from 'next/router';
import * as React from 'react';

type PostProps = {
  post: Post;
  morePosts: Post[];
  preview?: boolean;
};

const BlogPost = ({ post, morePosts, preview }: PostProps) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <div>Error</div>;
  }

  return (
    <article className='prose prose-slate mx-auto max-w-3xl'>
      <Head>
        <title>{post.title}</title>
        <meta property='og:image' content={post.ogImage.url} />
        {/* <link
          rel='preload'
          href='https://unpkg.com/prismjs@0.0.1/themes/prism-okaidia.css'
          as='script'
        /> */}
        <link
          rel='stylesheet'
          href='https://prismjs.com/themes/prism-tomorrow.css'
        />
      </Head>
      {/* <PostHeader
        title={post.title}
        coverImage={post.coverImage}
        date={post.date}
        author={post.author}
      /> */}
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
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
