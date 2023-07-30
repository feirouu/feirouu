import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="zh-CN">
      <Head>
        <meta charSet="utf-8" />
        <meta name="renderer" content="webkit" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
        {process.env.NODE_ENV !== "development" && (
          <>
            <Script src="https://www.googletagmanager.com/gtag/js?id=G-8K9LR114MX" />
            <Script id="gtag">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-8K9LR114MX');
              `}
            </Script>
          </>
        )}
      </body>
    </Html>
  );
}
