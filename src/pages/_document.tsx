import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head>
        <link rel="alternate" type="application/rss+xml" href="/api/feed.xml" />
        <link rel="alternate" type="text/markdown" title="LLM-friendly version" href="/llms.txt" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
