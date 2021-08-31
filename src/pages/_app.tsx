import type { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'
import { GeistProvider, CssBaseline } from '@geist-ui/react'
import { Provider as NextAuthProvider } from 'next-auth/client'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider options={{ clientMaxAge: 10, keepAlive: 5 }} session={pageProps.session}>
      <GeistProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </GeistProvider>
    </NextAuthProvider>
  )
}
