import * as React from 'react';

export const Footer = () => {
  return (
    <footer className='h-12 flex justify-center'>
      <div className='flex gap-8 justify-center items-center mx-auto container max-w-3xl'>
        <div className='prose prose-p dark:prose-invert'>
          Made by{' '}
          <a
            className='prose prose-a dark:prose-invert'
            href='https://github.com/trongtai37/'
          >
            trongtai37
          </a>
        </div>
      </div>
    </footer>
  );
};
