import { Avatar, Button, ButtonGroup, Card } from '@geist-ui/react'
import { getSession, signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { Zap } from '@geist-ui/react-icons'
import { CALLBACK_URL, USER_ROLES, ADMIN_PAGE } from '@utils/constants'
import { UserType } from '../plugins/prisma/utils'

export default function IndexPage(props) {
  const router = useRouter()
  const [session, loading] = useSession()

  return (
    <div>
      <div className="h-64 w-64 mx-auto mt-4">
        <Card shadow hoverable={false}>
          <div className="mb-4">
            <Zap className="mx-auto" size={30} />
          </div>

          {!session && !loading && (
            <Button
              onClick={() => router.push(`/api/auth/signin`)}
              shadow
              type="secondary"
              width="100%"
            >
              Sign in
            </Button>
          )}
          {session && !loading && (
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <Avatar src={session.user.image} />
                <div className="font-semibold text-gray-700">{session.user.name}</div>
              </div>
              <div className="flex items-center justify-center">
                <ButtonGroup type="secondary-light">
                  <Button disabled>Customer</Button>
                  {session.user.type === UserType['ADMIN'] && (
                    <Button onClick={() => router.push(ADMIN_PAGE)}>Admin</Button>
                  )}
                </ButtonGroup>
              </div>
              <Button
                onClick={(e) => {
                  e.preventDefault()
                  signOut({ callbackUrl: CALLBACK_URL })
                }}
                shadow
                width="100%"
                type="abort"
              >
                Sign out
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
