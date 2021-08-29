import { Button, useMediaQuery } from '@geist-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Key } from '@geist-ui/react-icons'
import { signOut, useSession } from 'next-auth/client'
import { useEffect } from 'react'

export default function Nav() {
  const [session, loading] = useSession()
  const router = useRouter()
  const isMD = useMediaQuery('md', {
    match: 'down'
  })

  if (loading) {
    return <div>Loading....</div>
  }

  return (
    <div className="border-b border-grey-100">
      <div className="mx-auto max-w-screen-lg flex items-center justify-between px-2 lg:px-0 py-4 mt-6">
        <div>
          {isMD ? 'TRUE' : 'false'}
          <Button onClick={() => router.push(`/`)} type="abort" auto>
            Modern SaaS
          </Button>
        </div>
        {!session && (
          <div className="flex items-center space-x-1">
            <Button onClick={() => router.push(`/api/auth/signin`)} type="abort" auto>
              Sign in
            </Button>
            <Button onClick={() => router.push(`/signup`)} auto shadow type="success-light">
              Sign up for free
            </Button>
          </div>
        )}

        {session && (
          <div className="flex items-center justify-between ">
            <Button onClick={() => router.push(`/admin`)} type="abort" auto>
              Admin
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault()
                signOut({ callbackUrl: 'http://localhost:3000' })
              }}
              auto
              shadow
              type="secondary"
            >
              Sign out
            </Button>
            <span>Signed in</span>
          </div>
        )}
      </div>
    </div>
  )
}
