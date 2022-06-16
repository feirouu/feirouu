import type { ReactElement } from "react";
import type { GetStaticProps, GetStaticPaths } from "next";
import type { ParsedUrlQuery } from "querystring";
import Head from "next/head";
import Link from "next/link";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import Giscus from "@giscus/react";
import Header from "../../components/page/header";
import Footer from "../../components/page/footer";
import { ProfilePost } from "../../profile";
import { getPost, getAllPosts } from "../../utils/mdx";

type Props = {
  source: MDXRemoteSerializeResult;
  frontMatter: Omit<ProfilePost, "slug">;
};

export default function PostPage({ source, frontMatter }: Props) {
  const publishDate = new Date(frontMatter.date);
  return (
    <>
      <Head>
        <meta name="description" content={frontMatter.description} />
        <title>{frontMatter.title} - Junyu Dev</title>
      </Head>
      <main className="container terminal">
        <article>
          <h1>{frontMatter.title}</h1>
          <p>
            <time dateTime={frontMatter.date} className="tag">
              {`${publishDate.getFullYear()}年${
                publishDate.getMonth() + 1
              }月${publishDate.getDate()}日`}
            </time>
            {frontMatter.tags && frontMatter.tags.length && (
              <span className="tag">|</span>
            )}
            {frontMatter.tags &&
              frontMatter.tags.map((tag) => (
                <Link key={tag} href={`/t/${tag}`} passHref={true}>
                  <a className="tag">#{tag}</a>
                </Link>
              ))}
          </p>
          <MDXRemote {...source} />
        </article>
        {frontMatter.comment && (
          <section>
            <hr />
            <Giscus
              id="comments"
              repo="JunyuMu/JunyuMu"
              repoId="R_kgDOHf-87w"
              category="Announcements"
              categoryId="DIC_kwDOHf-8784CPsrR"
              mapping="specific"
              term={frontMatter.id}
              reactionsEnabled="1"
              emitMetadata="0"
              inputPosition="bottom"
              theme="preferred_color_scheme"
              lang="zh-CN"
            />
          </section>
        )}
      </main>
    </>
  );
}

PostPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Header />
      {page}
      <Footer />
    </>
  );
};

interface ProfileParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as ProfileParams;
  const { content, data } = getPost(slug);
  const mdxSource = await serialize(content, {
    scope: data,
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeHighlight],
    },
  });
  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const posts = getAllPosts(["slug"]);
  const paths = posts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));
  return {
    paths,
    fallback: false,
  };
};
