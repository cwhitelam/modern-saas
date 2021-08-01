import Layout from '@components/Layout'
import Welcome from '@components/Welcome'
import useSWR from 'swr'
import { internalFetcher } from '../utils/fetchers'

interface IndexPageProps {
  data: { health: string }
}

export default function IndexPage(props: IndexPageProps) {
  const initialData = props.data
  const { data } = useSWR('/api/health', internalFetcher, { initialData })

  return (
    <Layout container>
      {data.health}
      <Welcome />
    </Layout>
  )
}

export async function getServerSideProps() {
  const { data } = await internalFetcher('get', '/api/health')
  return {
    props: {
      data
    }
  }
}
