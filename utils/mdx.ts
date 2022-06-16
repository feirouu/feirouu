import matter from "gray-matter";
import { join } from "path";
import fs from "fs";

type Items = {
  [key: string]: string;
};

// structure of a post
type Post = {
  data: {
    // each post has a parameter key that takes the value of a string
    [key: string]: any;
  };
  // each post will include the post content associated with its parameter key
  content: string;
};

// path to our list of available posts
const POSTS_PATH = join(process.cwd(), "data", "posts");

// get the file paths of all available list of posts
function getPostsFilePaths(): string[] {
  return (
    // return the mdx file post path
    fs
      .readdirSync(POSTS_PATH)
      // load the post content from the mdx files
      .filter((path) => /\.mdx?$/.test(path))
  );
}

// getting a single post
export function getPost(slug: string): Post {
  // add path/location to a single post
  const fullPath = join(POSTS_PATH, `${slug}.mdx`);
  // post's content
  const fileContents = fs.readFileSync(fullPath, "utf-8");
  // get the front matter data and content
  const { data, content } = matter(fileContents);
  // return the front matter data and content
  return { data, content };
}

// load the post items
export function getPostItems(filePath: string, fields: string[] = []): Items {
  // create a slug from the mdx file location
  const slug = filePath.replace(/\.mdx?$/, "");
  // get the front matter data and content
  const { data, content } = getPost(slug);

  const items: Items = {};

  // just load and include the content needed
  fields.forEach((field) => {
    // load the slug
    if (field === "slug") {
      items[field] = slug;
    }
    // load the post content
    if (field === "content") {
      items[field] = content;
    }
    // check if the above specified field exists on data
    if (data[field]) {
      // verify the fileds has data
      items[field] = data[field];
    }
  });
  // return the post items
  return items;
}

// getting all posts
export function getAllPosts(fields: string[]): Items[] {
  // add paths for getting all posts
  const filePaths = getPostsFilePaths();
  // get the posts from the filepaths with the needed fields sorted by date
  const posts = filePaths
    .map((filePath) => getPostItems(filePath, fields))
    .sort((post1, post2) =>
      new Date(post1.date) < new Date(post2.date) ? 1 : -1
    );
  // return the available post
  return posts;
}

export function getAllTags(): Array<string> {
  const tags: Array<string> = [];
  const filePaths = getPostsFilePaths();
  filePaths.forEach((filePath) => {
    const slug = filePath.replace(/\.mdx?$/, "");
    const { data, content } = getPost(slug);
    const postTags = data["tags"];
    if (postTags && postTags.length) {
      postTags.forEach((postTag: string) => {
        if (tags.indexOf(postTag) === -1) {
          tags.push(postTag);
        }
      });
    }
  });
  return tags;
}

export function filterTag(tag: string, filePath: string): boolean {
  const slug = filePath.replace(/\.mdx?$/, "");
  const { data, content } = getPost(slug);
  const tags = data["tags"];
  if (!tags) return false;
  if (tags.indexOf(tag) !== -1) return true;
  return false;
}

export function getTagPosts(tag: string, fields: string[]): Items[] {
  const filePaths = getPostsFilePaths();
  const posts = filePaths
    .filter((filePath) => filterTag(tag, filePath))
    .map((filePath) => getPostItems(filePath, fields))
    .sort((post1, post2) =>
      new Date(post1.date) < new Date(post2.date) ? 1 : -1
    );
  return posts;
}
