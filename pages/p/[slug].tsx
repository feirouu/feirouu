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
  slug: string;
};

export default function PostPage({ source, frontMatter, slug }: Props) {
  const publishDate = new Date(frontMatter.date);
  return (
    <>
      <Head>
        <meta name="description" content={frontMatter.description} />
        <link rel="canonical" href={`https://junyu.dev/p/${slug}`} />
        <title>{`${frontMatter.title} - Junyu Dev`}</title>
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
            {frontMatter.tags.length > 0 && <span className="tag">|</span>}
            {frontMatter.tags.map((tag) => (
              <Link
                key={tag}
                className="tag"
                href={`/t/${tag}`}
                passHref={true}
              >
                #{tag}
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
      slug: slug,
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
