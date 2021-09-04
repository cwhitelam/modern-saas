import {
  Card,
  Avatar,
  Table,
  Popover,
  Divider,
  Drawer,
  Button,
  Tooltip,
  useMediaQuery
} from '@geist-ui/react'
import { internalFetcher } from '@utils/fetchers'
import { formatDistance } from 'date-fns'
import { getSession, signOut } from 'next-auth/client'
import {
  Activity,
  ChevronDown,
  Users,
  Grid,
  ChevronLeftCircleFill,
  ChevronRightCircleFill,
  Settings,
  Home,
  LogOut
} from '@geist-ui/react-icons'
import { useEffect, useState } from 'react'
import { CALLBACK_URL } from '../utils/constants'
import { useRouter } from 'next/router'
import { useSocket, useEvent } from '../hooks/socket'

function AdminSideNav({ collapsed }) {
  const sideLinks = [
    {
      id: 1,
      name: 'Dashboard',
      icon: <Grid size={14} />
    },
    {
      id: 2,
      name: 'Users',
      icon: <Users size={14} />
    }
  ]

  return (
    <div
      className={`transition bg-white duration-1500 ease-in-out min-h-screen w-18 shadow-2xl border-r border-gray-200  ${
        collapsed ? 'hidden' : 'inline-block'
      }`}
    >
      <div>
        <div className="flex-col">
          {sideLinks.map((link) => {
            return (
              <div
                key={link.id}
                className="flex items-center px-4 py-2 m-2 text-sm font-semibold text-white bg-black rounded shadow-2xl cursor-pointer space-x-4"
              >
                <Tooltip
                  type="dark"
                  scale={0.3}
                  offset={20}
                  placement="right"
                  leaveDelay={5}
                  text={link.name}
                >
                  {link.icon}
                </Tooltip>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function AdminTopNav({ session, toggleSideNav, collapsed }) {
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

export default function Admin({ users, session }) {
  const router = useRouter()
  const socket = useSocket()
  useEvent('pong', (users) => {
    console.log(users)
  })
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div>
      <div className="flex">
        <AdminSideNav collapsed={collapsed} />
        <div className="flex-col w-full">
          <div>
            <AdminTopNav
              session={session}
              collapsed={collapsed}
              toggleSideNav={(val: boolean) => setCollapsed(val)}
            />
          </div>
          <div className="p-4">
            <Card type="violet" shadow className="bg-red-500 border-black border h-48">
              <h4>Welcome, {session.user.name}</h4>
            </Card>
          </div>
          <Button onClick={() => socket.emit('ping', users)} shadow>
            PING
          </Button>
        </div>
      </div>
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

  const { data: users } = await internalFetcher('get', '/api/admin/user')

  return {
    props: { session, users }
  }
}

