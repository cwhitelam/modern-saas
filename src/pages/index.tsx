import Layout from '@components/Layout'
import { internalFetcher } from '@utils/fetchers'
import useSWR from 'swr'

interface IndexPageProps {
  data: { health: string }
}

export default function IndexPage(props: IndexPageProps) {
  const initialData = props.data
  const { data } = useSWR('/api/health', internalFetcher, { initialData })

  return <Layout container>API Health: {data.health}</Layout>
}

export async function getServerSideProps() {
  const { data } = await internalFetcher('get', '/api/health')
  return {
    props: {
      data
    }
  }
}
