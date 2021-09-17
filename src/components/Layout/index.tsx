import SideNav from '@components/SideNav'
import TopNav from '@components/TopNav'
import { Session } from 'next-auth'
import { useRouter } from 'next/router'
import { ReactChildren, useState } from 'react'

interface LayoutProps {
  session: Session
  children: ReactChildren
}

export default function Layout({ children, session }) {
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div>
      <div className="flex">
        <SideNav collapsed={collapsed} />
        <div className="flex-col w-full">
          <div>
            <TopNav
              session={session}
              collapsed={collapsed}
              toggleSideNav={(val: boolean) => setCollapsed(val)}
            />
          </div>
          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>
  )
}
