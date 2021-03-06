import Document, { Html, Head, Main, NextScript } from 'next/document'
import { CssBaseline } from '@geist-ui/react'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    const styles = CssBaseline.flush()

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {styles}
        </>
      )
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5"
          />
          <meta name="description" content="Description" />
          <meta name="keywords" content="Keywords" />
          <title>🚀 Modern SaaS</title>

          <link rel="manifest" href="manifest.json" />
          <link href="icons/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
          <link href="icons/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
          <link href="icons/apple-icon.png" rel="apple-touch-icon" sizes="180x180" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="theme-color" content="#317EFB" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
