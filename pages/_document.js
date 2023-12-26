import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  const meta = {
    title:
      "Aman Garg's writing, artwork, blog posts and web development portfolio",
    description:
      'Digital artwork, poetry, short stories and whatever I find interesting. Also web dev projects',
    image:
      'https://www.amangarg.in/_next/image?url=%2Fimages%2Fart-1.png&w=3840&q=75'
  }

  return (
    <Html lang="en">
      <Head>
        <meta name="robots" content="follow, index" />
        <meta name="description" content={meta.description} />
        <meta property="og:site_name" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://amangarg.in" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@amanmakesart" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
