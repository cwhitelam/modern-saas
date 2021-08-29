import Nav from '@components/Nav'
import { getSession, useSession } from 'next-auth/client'

export default function IndexPage(props) {
  return (
    <div>
      <Nav />
      Hello
    </div>
  )
}
