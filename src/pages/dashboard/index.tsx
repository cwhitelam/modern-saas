import { useRouter } from 'next/router'
import Layout from '@components/Layout'
import { getSession } from 'next-auth/client'
import { useState } from 'react'

export default function Dashboard({ users, session }) {
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout session={session}>
      <div>Dashboard Page</div>
    </Layout>
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

  return {
    props: { session }
  }
}
