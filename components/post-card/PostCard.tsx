import { Post } from 'models/post';
import Link from 'next/link';
import * as React from 'react';

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <Link href={`/posts/${post.slug}`}>
      <div className='block p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer my-4'>
        <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
          {post.title}
        </h5>
        <p className='font-normal text-gray-700 dark:text-gray-400'>
          {post.excerpt}
        </p>
      </div>
    </Link>
  );
};
