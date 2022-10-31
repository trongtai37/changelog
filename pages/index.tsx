import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className='mx-auto max-w-3xl prose'>
      <p></p>
      <h1>
        Hi!, I&apos;m <span className='brand-text'>trongtai37</span>
      </h1>
      <p>
        This is my corner where I post something related to web development!{' '}
        <br />
        {`I'm currently a dedicated file editor with extension js{x},.ts{x}, ..., and more`}
        <br />I love Typescript and of course a fan of type safe programming.
      </p>
      <p></p>

      <h2>Recent Posts</h2>
      <hr />

      <h2>Pet Projects</h2>
      <hr />
    </div>
  );
};

export default Home;
