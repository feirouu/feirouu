import type { ReactNode } from "react";
import Giscus from "@giscus/react";
import Head from "next/head";

import type { PostMeta } from "@/types";
import { SiteHeader } from "@/components/page/site-header";
import { SiteFooter } from "@/components/page/site-footer";
import { formatDate } from "@/lib/format";
import {
  siteUrl,
  siteLabel,
  giscusRepo,
  giscusRepoId,
  giscusCategoryId,
} from "@/config";

export function ArticleLayout({
  children,
  frontMatter,
}: {
  children: ReactNode;
  frontMatter: Omit<PostMeta, "slug" | "readingTime">;
}) {
  return (
    <>
      <Head>
        <meta name="description" content={frontMatter.description} />
        <link rel="canonical" href={`${siteUrl}/p/${frontMatter.filename}`} />
        <title>{`${frontMatter.title} - ${siteLabel}`}</title>
      </Head>
      <SiteHeader activeNav="" />
      <main className="max-w-xl mx-auto min-h-screen px-4 md:px-0">
        <article className="prose dark:prose-invert mb-20">
          <h1 className="mb-5">{frontMatter.title}</h1>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            <time dateTime={frontMatter.date}>
              {formatDate(frontMatter.date)}
            </time>
          </p>
          {children}
        </article>
        {frontMatter.comment && (
          <section className="mb-20 pt-20">
            <Giscus
              id="comments"
              repo={giscusRepo}
              repoId={giscusRepoId}
              category="Announcements"
              categoryId={giscusCategoryId}
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
      <SiteFooter />
    </>
  );
}
