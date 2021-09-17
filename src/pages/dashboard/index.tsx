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
import { useRouter } from 'next/router'
import { CALLBACK_URL } from '@utils/constants'

function DashboardSideNav({ collapsed }) {
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
                className="shadow-2xl cursor-pointer rounded m-2 flex bg-black space-x-4 px-4 py-2 text-sm text-white font-semibold items-center"
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

function DashboardTopNav({ session, toggleSideNav, collapsed }) {
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

export default function Dashboard({ users, session }) {
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div>
      <div className="flex">
        <DashboardSideNav collapsed={collapsed} />
        <div className="flex-col w-full">
          <div>
            <DashboardTopNav
              session={session}
              collapsed={collapsed}
              toggleSideNav={(val: boolean) => setCollapsed(val)}
            />
          </div>
          <div className="p-4">
            <Card type="violet" shadow className="bg-red-500 border-black border h-48">
              <h4>Welcome, {session.user.name}</h4>
              <div>This is the dashboard.</div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (!session || session.user.blocked) {
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
