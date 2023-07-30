import type { ReactElement } from "react";
import type { GetStaticProps } from "next";
import Head from "next/head";

import { getPosts } from "@/lib/mdx";
import type { PostMeta } from "@/types";
import { DefaultLayout } from "@/components/layout/default";
import { PostCard } from "@/components/page/post-card";
import { siteUrl, siteLabel } from "@/config";

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts();
  return {
    props: {
      posts,
    },
  };
};

export default function Blog({ posts }: { posts: Array<PostMeta> }) {
  return (
    <>
      <Head>
        <link rel="canonical" href={siteUrl} />
        <title>{`Blog - ${siteLabel}`}</title>
      </Head>
      <ol>
        {posts.map((post) => (
          <li key={post.id} className="mb-20">
            <PostCard meta={post} />
          </li>
        ))}
      </ol>
    </>
  );
}

Blog.getLayout = (page: ReactElement) => DefaultLayout(page, "says");
