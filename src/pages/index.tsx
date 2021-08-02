import Nav from '@components/Nav'
import MSCard from '@components/ui/MSCard'
import { internalFetcher } from '@utils/fetchers'

interface IndexPageProps {
  data: { health: string }
}

export default function IndexPage(props: IndexPageProps) {
  return (
    <div>
      <Nav />
      <div className="mx-2 max-w-screen-lg mt-8 md:mx-auto">
        <MSCard className="w-full md:w-1/2 mx-2 md:mx-auto">
          <h3 className="text-3xl font-bold">Welcome to Modern SaaS</h3>

          <p className="text-md mt-4">The starter framework for modern saas projects.</p>
        </MSCard>
      </div>
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
