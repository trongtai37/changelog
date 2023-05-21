import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { Post } from 'models/post';

const POST_DIR = join(process.cwd(), 'posts');

export function getPostsSlugs() {
  return fs.readdirSync(POST_DIR).map(function removeExtension(filename) {
    return filename.replace(/\.md$/, '');
  });
}

export function getPostBySlug(slug: string): Post {
  const fullPath = join(POST_DIR, `${slug}.md`);
  const fileContent = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContent);

  return {
    slug,
    content,
    date: data.date,
    title: data.title,
    excerpt: data.excerpt,
    readingTimeInMinutes: 15,
  };
}

export function getAllPosts() {
  const slugs = getPostsSlugs();
  const posts = slugs.map((slug) => getPostBySlug(slug));

  return posts;
}
