import type { ReactElement } from "react";
import type { GetStaticProps } from "next";
import type { ProfilePost } from "../profile";
import Head from "next/head";
import Link from "next/link";
import { getAllPosts } from "../utils/mdx";
import Header from "../components/page/header";
import Slogan from "../components/page/slogan";
import Footer from "../components/page/footer";

type PostLite = Omit<ProfilePost, "description" | "tags">;

type Props = {
  posts: Array<PostLite>;
};

export default function Home({ posts }: Props) {
  let years: Array<number> = [];
  let postsMap: {
    [year: number]: Array<PostLite>;
  } = {};
  posts.map((post) => {
    const year = new Date(post.date).getFullYear();
    if (years.indexOf(year) === -1) {
      years.push(year);
    }
    if (postsMap[year] === undefined) {
      postsMap[year] = [post];
    } else {
      postsMap[year].push(post);
    }
  });
  return (
    <>
      <Head>
        <meta
          name="description"
          content="有时候，脑袋里会跳出一些想法，于是我把它们记录下来，放在这里。"
        />
        <link rel="canonical" href="https://junyu.dev" />
        <title>Table of content - Junyu Dev</title>
      </Head>
      <main className="container">
        <p>
          <strong>Table of content</strong>
        </p>
        <nav>
          <ul>
            {years.map((year) => (
              <li key={year}>
                <em>{year}</em>
                <ol className="terminal-toc articles">
                  {postsMap[year].map((post) => (
                    <li
                      key={post.id}
                      data-time={`${
                        new Date(post.date).getMonth() + 1
                      }月${new Date(post.date).getDate()}日`}
                    >
                      <Link href={`/p/${post.slug}`} passHref={true}>
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ol>
              </li>
            ))}
          </ul>
        </nav>
      </main>
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Header activeNav="posts" />
      <Slogan words="有时候，脑袋里会跳出一些想法，于是我把它们记录下来，放在这里。" />
      {page}
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts(["id", "title", "slug", "date"]);
  return { props: { posts } };
};
