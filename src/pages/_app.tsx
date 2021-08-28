import type { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'
import { GeistProvider, CssBaseline } from '@geist-ui/react'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GeistProvider>
      <CssBaseline />
      <Component {...pageProps} />
    </GeistProvider>
  )
}
