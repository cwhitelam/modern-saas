import type { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'
import { GeistProvider, CssBaseline } from '@geist-ui/react'
import { Provider as NextAuthProvider } from 'next-auth/client'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider
      // Every 15 mins ping server for active session
      options={{ keepAlive: 60 * 15 }}
      session={pageProps.session}
    >
      <GeistProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </GeistProvider>
    </NextAuthProvider>
  )
}
