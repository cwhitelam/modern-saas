import Nav from '@components/Nav'
import MSCard from '@components/ui/MSCard'
import { internalFetcher } from '@utils/fetchers'

interface IndexPageProps {
  data: { health: string }
}

export default function IndexPage(props: IndexPageProps) {
  return (
    <div className="mx-auto max-w-screen-lg">
      <Nav />
      <MSCard> Welcome!!! </MSCard>
    </div>
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
