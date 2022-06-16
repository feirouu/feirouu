import { Html, Head, Main, NextScript } from "next/document";

function ProfileDocument() {
  return (
    <Html lang="zh-cmn-Hans">
      <Head>
        <meta charSet="utf-8" />
        <meta name="renderer" content="webkit" />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#ffffff"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#222225"
        />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-8K9LR114MX"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-8K9LR114MX');
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default ProfileDocument;
