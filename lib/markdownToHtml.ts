import { remark } from 'remark';
import html from 'remark-html';
import prism from 'remark-prism';
import toc from 'remark-toc';
import gfm from 'remark-gfm';

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(toc)
    .use(gfm)
    .use(prism)
    .use(html, { sanitize: false })
    .process(markdown);
  return result.toString();
}
