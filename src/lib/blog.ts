import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

export interface PostMetadata {
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  author: string;
  tags: string[];
  slug: string;
}

export async function getBlogPosts(): Promise<PostMetadata[]> {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR);
  
  const posts = files
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
    .map((file) => {
      const filePath = path.join(BLOG_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);
      
      return {
        ...data,
        slug: file.replace(/\.mdx?$/, ''),
      } as PostMetadata;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export async function getBlogPost(slug: string) {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  const mdPath = path.join(BLOG_DIR, `${slug}.md`);
  
  let finalPath = '';
  if (fs.existsSync(filePath)) finalPath = filePath;
  else if (fs.existsSync(mdPath)) finalPath = mdPath;
  else return null;

  const fileContent = fs.readFileSync(finalPath, 'utf8');
  const { data, content } = matter(fileContent);

  return {
    metadata: {
      ...data,
      slug,
    } as PostMetadata,
    content,
  };
}
