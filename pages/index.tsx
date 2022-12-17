import { PostCard } from 'components/post-card';
import { getAllPosts } from 'lib/api';
import { Post } from 'models/post';
import type { NextPage } from 'next';

interface HomeProps {
  posts: Post[];
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  console.log('🚀 ~ file: index.tsx:11 ~ posts', posts);
  return (
    <div className='mx-auto max-w-3xl prose'>
      <p></p>
      <h1>Hi!, I&apos;m Tai</h1>
      <p>
        This is my corner where I post something related to web development!{' '}
        <br />
        I&apos;m currently a dedicated file editor with extension{' '}
        <code>{`js{x},.ts{x}, ...`}</code>, and more
        <br />I love <code>{`Typescript`}</code> and of course a fan of type
        safe programming.
      </p>
      <p></p>

      <h2>Recent Posts</h2>
      {posts.map((post) => (
        <PostCard post={post} key={post.slug} />
      ))}
      <hr />

      {/* <h2>Pet Projects</h2>
      <hr /> */}
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
