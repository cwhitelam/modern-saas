import Nav from '@components/Nav'
import { getSession, useSession } from 'next-auth/client'

export default function IndexPage(props) {
  const [session, loading] = useSession()

  if (!session) {
    return (
      <div>
        <Nav />
      </div>
    )
  }
}
export async function getServerSideProps(context) {
  const session = await getSession(context)
  console.log('SESSION oN INDEX')
  console.log(session)

  if (session) {
    return {
      redirect: {
        destination: '/admin',
        permanent: false
      }
    }
  }

  return {
    props: { session }
  }
}
