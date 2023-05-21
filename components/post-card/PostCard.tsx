import { formatDate } from 'lib/date';
import { Post } from 'models/post';
import Link from 'next/link';
import * as React from 'react';

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <article className='py-6 bg-white border-b border-gray-200 '>
      <div className='flex justify-between items-center mb-4 text-gray-500'>
        <span className='text-sm'>{`${post?.readingTimeInMinutes} minutes reading`}</span>
        <span className='text-sm'>{formatDate(new Date(post.date))}</span>
      </div>
      <h2 className='my-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
        <Link href={`/posts/${post?.slug}`} passHref>
          <a className='hover:underline'>{post?.title}</a>
        </Link>
      </h2>
      <p className='mb-5 font-light text-gray-500 dark:text-gray-400'>
        {post?.excerpt}
      </p>
      <div className='flex justify-end items-center'>
        <Link href={`/posts/${post?.slug}`} passHref>
          <a className='inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline'>
            Read more
            <svg
              className='ml-2 w-4 h-4'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                fillRule='evenodd'
                clipRule='evenodd'
              ></path>
            </svg>
          </a>
        </Link>
      </div>
    </article>
  );
};
