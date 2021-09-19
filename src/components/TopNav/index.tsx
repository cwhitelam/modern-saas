import { Avatar, Button, Divider, Popover } from '@geist-ui/react'
import {
  ChevronDown,
  ChevronLeftCircleFill,
  ChevronRightCircleFill,
  Home,
  LogOut,
  Settings
} from '@geist-ui/react-icons'
import { CALLBACK_URL } from '@utils/constants'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/client'
import { useRouter } from 'next/router'

interface TopNavProps {
  session: Session
  toggleSideNav: (bool: boolean) => void
  collapsed: boolean
}

export default function TopNav({ session, toggleSideNav, collapsed }: TopNavProps) {
  const router = useRouter()
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <div>
        {collapsed ? (
          <ChevronRightCircleFill
            className="cursor-pointer"
            onClick={() => toggleSideNav(!collapsed)}
          />
        ) : (
          <ChevronLeftCircleFill
            className="cursor-pointer"
            onClick={() => toggleSideNav(!collapsed)}
          />
        )}
      </div>
      <Popover
        hideArrow={true}
        placement="bottomEnd"
        width={10}
        portalClassName="rounded"
        content={() => {
          return (
            <div className="flex-col space-y-2 p-2 rounded">
              <Button onClick={() => router.push('/')} icon={<Home />} width="100%" scale={0.5}>
                Home
              </Button>
              <Button scale={0.5} icon={<Settings />} width="100%">
                Settings
              </Button>
              <Divider />
              <Button
                scale={0.5}
                icon={<LogOut />}
                type="secondary-light"
                width="100%"
                onClick={() => signOut({ callbackUrl: CALLBACK_URL })}
              >
                Sign out
              </Button>
            </div>
          )
        }}
      >
        <div className="flex items-center hover:cursor-pointer space-x-2">
          <Avatar src={session.user.image} isSquare />
          <span className="font-semibold text-gray-800 text-sm">{session.user.name}</span>
          <ChevronDown size="16" color="gray" />
        </div>
      </Popover>
    </div>
  )
}
