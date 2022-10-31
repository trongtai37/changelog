import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const POST_DIR = join(process.cwd(), 'posts');

export function getPostsSlug() {
  return fs.readdirSync(POST_DIR);
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(POST_DIR, `${realSlug}.md`);
  const fileContent = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContent);

  return fields.reduce<Record<string, any>>((acc, field) => {
    if (field === 'slug') {
      return {
        ...acc,
        [field]: realSlug,
      };
    }

    if (field === 'content') {
      return {
        ...acc,
        [field]: content,
      };
    }

    if (typeof data[field] !== 'undefined') {
      return {
        ...acc,
        [field]: data[field],
      };
    }

    return acc;
  }, {});
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostsSlug();
  const posts = slugs.map((slug) => getPostBySlug(slug, fields));

  return posts;
}
