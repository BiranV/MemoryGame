import Layout from '@/components/layout/Layout'
import '@/styles/globals.css'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>

  )
}