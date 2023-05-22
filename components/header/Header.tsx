import { useTheme } from 'hooks/useTheme';
import Link from 'next/link';
import * as React from 'react';

const navigations = [
  {
    name: 'Changelogs',
    to: '/change-logs',
  },
];

export const Header = () => {
  const { isDarkMode, toggle } = useTheme();

  return (
    <header className='h-14 border-b dark:border-b-slate-900 flex justify-center sticky top-0 backdrop-blur-md'>
      <nav className='mx-auto max-w-3xl flex gap-6 justify-center items-center h-full container px-4 md:px-0'>
        <Link href='/'>
          <div className='mr-auto cursor-pointer text-xl font-bold brand-text'>
            trongtai37
          </div>
        </Link>
        {navigations.map((nav) => (
          <Link href={nav.to} key={nav.name}>
            <div className='cursor-pointer prose dark:prose-invert prose-p hover-underline-animation'>
              {nav.name}
            </div>
          </Link>
        ))}
        <button
          type='button'
          className='text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5'
          onClick={toggle}
        >
          {isDarkMode ? (
            <svg
              className=' w-5 h-5'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z'
                fillRule='evenodd'
                clipRule='evenodd'
              ></path>
            </svg>
          ) : (
            <svg
              className='w-5 h-5'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z'></path>
            </svg>
          )}
        </button>
      </nav>
    </header>
  );
};
