import { PostCard } from 'components/post-card';
import { getAllPosts } from 'lib/api';
import { Post } from 'models/post';
import Head from 'next/head';
import * as React from 'react';

const ChangeLogs = ({ posts }: { posts: Post[] }) => {
  return (
    <div className='mx-auto max-w-3xl'>
      <Head>
        <title>trongtai37 | Changelogs</title>
      </Head>
      <h1 className='my-5 text-3xl font-bold'>Changelogs</h1>
      {posts.map((post) => (
        <PostCard post={post} key={post.slug} />
      ))}
    </div>
  );
};

export default ChangeLogs;

export function getStaticProps() {
  const posts = getAllPosts();
  return {
    props: {
      posts,
    },
  };
}
