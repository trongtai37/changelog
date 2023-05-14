import { PostCard } from 'components/post-card';
import { getAllPosts } from 'lib/api';
import { Post } from 'models/post';
import type { NextPage } from 'next';

interface HomeProps {
  posts: Post[];
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  return (
    <div className='mx-auto max-w-3xl prose'>
      <p></p>
      <h1>Hi!, I&apos;m Tai</h1>
      <p>
        I am a software engineer with a passion for web development.
        <br />I love working with Typescript because it allows me to write safer
        and more maintainable code, and I'm constantly impressed by its ability
        to catch errors at compile-time. I've worked on a variety of projects
        that have allowed me to hone my skills in these areas.
      </p>
      <p>
        Thanks for stopping by my blog, where I'll be sharing my knowledge and
        insights about Typescript, System Design, and everything in between!
      </p>
      {/* <h2>Recent Posts</h2>
      {posts.map((post) => (
        <PostCard post={post} key={post.slug} />
      ))}
      <hr /> */}

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
