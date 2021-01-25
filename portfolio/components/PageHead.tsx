
import Head from 'next/head'

export default function PageHead() {
  return (
    <Head>
      <meta charSet="utf-8" />
      <title>
        Yuto Watanabe
      </title>
      <meta name="description" content="渡邊悠人のポートフォリオ" />
      <meta name="author" content="Copyright © 2021 Yuto Watanabe" />
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      <meta property="og:title" content="Yuto Watanabe" />
      <meta property="og:type" content="article" />
      <meta property="og:description" content="渡邊悠人のポートフォリオ" />
      {/* <meta property="og:url" content="https://sample.com" /> */}
      <meta property="og:site_name" content="Yuto Watanabe" />
      {/* <meta property="og:image" content="https://sample.com/img/base/ogp-icon.jpg" /> */}
      <meta property="og:locale" content="ja_JP" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@500&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@100;300;400&family=Open+Sans+Condensed:wght@300&display=swap" rel="stylesheet" />
    </Head>
  )
}
