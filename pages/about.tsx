import type { ReactElement } from "react";
import Head from "next/head";

import { DefaultLayout } from "@/components/layout/default";
import { siteUrl, siteLabel } from "@/config";

export default function About() {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Hey there, I'm Junyu Mu. Just another full stack engineer."
        />
        <link rel="canonical" href={`${siteUrl}/about`} />
        <title>{`Profile - ${siteLabel}`}</title>
      </Head>
      <p>Hey there, I'm Junyu Mu. Just another full stack engineer.</p>
    </>
  );
}

About.getLayout = (page: ReactElement) => DefaultLayout(page, "about");
