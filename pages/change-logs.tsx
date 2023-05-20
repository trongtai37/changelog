import { PostCard } from 'components/post-card';
import Head from 'next/head';
import * as React from 'react';

const ChangeLogs = () => {
  return (
    <div className='mx-auto max-w-3xl'>
      <Head>
        <title>trongtai37 | Changelogs</title>
      </Head>
      <h1 className='my-5 text-3xl text-center font-bold'>Changelogs</h1>
      {new Array(5).fill(true).map(() => (
        <PostCard />
      ))}
    </div>
  );
};

export default ChangeLogs;
