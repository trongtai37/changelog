import { getAllPosts } from 'lib/api';
import { Post } from 'models/post';
import type { NextPage } from 'next';
import Head from 'next/head';

interface HomeProps {
  posts: Post[];
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  return (
    <div className='mx-auto max-w-3xl prose'>
      <Head>
        <title>trongtai37 | Personal Blog</title>
      </Head>
      <p></p>
      <h1>Hi!, I&apos;m Tai</h1>
      <p>I am a software engineer with a passion for web development.</p>
      <p>
        I love working with Typescript because it allows me to write safer and
        more maintainable code, and I'm constantly impressed by its ability to
        catch errors at compile-time. I've worked on a variety of projects that
        have allowed me to hone my skills in these areas.
      </p>
      <p>
        Thanks for stopping by my blog, where I'll be sharing my knowledge and
        insights about Typescript, System Design, and everything in between!
      </p>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const posts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'ogImage',
    'coverImage',
    'excerpt',
  ]);

  return {
    props: {
      posts,
    },
  };
}
