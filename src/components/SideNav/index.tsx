import { Tooltip } from '@geist-ui/react'
import { Grid, Users } from '@geist-ui/react-icons'

interface SideNavProps {
  collapsed: boolean
}

export default function SideNav({ collapsed }: SideNavProps) {
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
