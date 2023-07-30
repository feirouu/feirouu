import fs from "node:fs/promises";
import { join } from "path";
import matter from "gray-matter";

import type { PostMeta } from "@/types";

const POSTS_PATH = join(process.cwd(), "pages", "p");

export const getSlugs = async () => {
  const slugs = await fs.readdir(POSTS_PATH);
  return slugs.filter((path) => /\.mdx?$/.test(path));
};

function calcReadingTime(content: String): number {
  const lettersPerMinuteEnglish = 200; // 英文平均阅读速度（字/分钟）
  const lettersPerMinuteChinese = 300; // 中文平均阅读速度（字/分钟）

  const letters = content.replace(/[\s.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").length;
  const chineseCharacters = content
    .replace(/\s/g, "")
    .replace(/[^\u4e00-\u9fa5]/g, "").length;
  const englishReadingTime = Math.ceil(letters / lettersPerMinuteEnglish);
  const chineseReadingTime = Math.ceil(
    chineseCharacters / lettersPerMinuteChinese
  );
  return englishReadingTime + chineseReadingTime;
}

export const getPosts = async () => {
  const postSlugs = await getSlugs();
  const posts: Array<PostMeta> = [];
  for (let path of postSlugs) {
    const fullPath = join(process.cwd(), "pages", "p", path);
    const result = matter(await fs.readFile(fullPath)) as unknown;
    const { data, content } = result as MatterPostMeta;
    posts.push(
      Object.assign(
        {
          slug: `/p/${path.replace(/\.mdx?$/, "")}`,
          readingTime: calcReadingTime(content),
        },
        data
      )
    );
  }
  return posts.sort((post1, post2) =>
    new Date(post1.date) < new Date(post2.date) ? 1 : -1
  );
};

interface MatterPostMeta {
  data: Omit<PostMeta, "slug" | "readingTime">;
  content: string;
}
