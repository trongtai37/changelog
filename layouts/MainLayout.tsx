import { Footer } from 'components/footer';
import { Header } from 'components/header';
import * as React from 'react';

export const MainLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className=' min-h-screen flex flex-col justify-center items-stretch relative dark:bg-gray-800'>
      <Header />
      <main className='flex-1 p-4'>{children}</main>
      <Footer />
    </div>
  );
};
