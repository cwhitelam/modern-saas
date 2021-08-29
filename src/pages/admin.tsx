import Nav from '@components/Nav'
import { internalFetcher } from '@utils/fetchers'
import { getSession } from 'next-auth/client'

export default function Admin({ users }) {
  return (
    <div>
      <Nav />
      Private Admin Page
      {JSON.stringify(users)}
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const { data: users } = await internalFetcher('get', '/api/user')
  console.log(users)

  return {
    props: { session, users }
  }
}
