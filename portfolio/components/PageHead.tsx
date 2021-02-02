
import Head from 'next/head'

export default function PageHead() {
  let thisURL = ''

  if(typeof window !== 'undefined') {
    thisURL = window.location.href
  }

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="description" content="渡邊悠人のポートフォリオ" />
      <meta name="author" content="Copyright © 2021 Yuto Watanabe" />
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />

      <meta property="og:title" content="Yuto Watanabe" />
      <meta property="og:type" content="article" />
      <meta property="og:description" content="渡邊悠人のポートフォリオ" />
      <meta property="og:url" content={thisURL} />
      <meta property="og:site_name" content="Yuto Watanabe" />
      {/* <meta property="og:image" content="https://sample.com/img/base/ogp-icon.jpg" /> */}
      <meta property="og:locale" content="ja_JP" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@cateiru" />
      <meta name="twitter:creator" content="@cateiru" />
      <meta name="twitter:url" content={thisURL} />
      <meta name="twitter:title" content="渡邊悠人のポートフォリオ" />
      <meta name="twitter:text:description" content="渡邊悠人のポートフォリオ" />
      {/* <meta name="twitter:image" content="/static/OGP.png" /> */}

      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="theme-color" content="#000000" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />

      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@100;300;500&family=Noto+Sans+JP:wght@500;700&family=Open+Sans+Condensed:wght@300&display=swap" rel="stylesheet" />

    </Head>
  )
}

export function HeadTitle( { titleName }: { titleName: string} ) {
  if(titleName.toLocaleLowerCase() === 'about'){
    return (
      <Head>
        <title>YutoWatanabe | 渡邊悠人 ポートフォリオ</title>
      </Head>
    )
  }
  return (
    <Head>
      <title>{titleName} | 渡邊悠人のポートフォリオ</title>
    </Head>
  )
}
