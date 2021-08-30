import Nav from '@components/Nav'
import { Card, Avatar, Table, Popover, Divider, Drawer } from '@geist-ui/react'
import { internalFetcher } from '@utils/fetchers'
import { formatDistance } from 'date-fns'
import { getSession } from 'next-auth/client'
import { ChevronDown } from '@geist-ui/react-icons'
import { useState } from 'react'

export default function Admin({ users, session }) {
  const [state, setState] = useState(false)
  return (
    <div>
      <div className="flex">
        <Drawer visible={state} onClose={() => setState(false)} placement="left">
          <Drawer.Title>Drawer</Drawer.Title>
          <Drawer.Subtitle>This is a drawer</Drawer.Subtitle>
          <Drawer.Content>
            <p>Some content contained within the drawer.</p>
          </Drawer.Content>
        </Drawer>
        <div className="items-center min-w-24 min-h-screen antialiased bg-gray-400 shadow hidden md:flex">
          SIDEBAR
        </div>
        <div className="flex-grow">
          <div>
            <span onClick={() => setState(!state)}>Open</span>
          </div>
          <div className="flex items-center justify-end p-4 border-b border-gray-200">
            <Popover
              hideArrow={true}
              paddingTop="0"
              paddingBottom="0"
              placement="bottomEnd"
              offset={5}
              marginRight={4}
              width={10}
              content={() => {
                return (
                  <Card shadow paddingLeft={0} className="text-sm" paddingRight={0}>
                    <div className="">Settings</div>
                    <Divider />
                    <div className="">Sign out</div>
                  </Card>
                )
              }}
            >
              <div className="flex items-center hover:cursor-pointer space-x-2">
                <Avatar src={session.user.image} />
                <span className="font-semibold text-gray-800">{session.user.name}</span>
                <ChevronDown size="16" color="gray" />
              </div>
            </Popover>
          </div>
          <div className="flex m-2">
            <Card shadow>
              <h4>Users</h4>
              <Table data={users}>
                <Table.Column
                  prop="image"
                  label="avatar"
                  render={(value, rowData, rowIndex) => <Avatar src={value} />}
                />
                <Table.Column
                  prop="createdAt"
                  label="created"
                  render={(value) => (
                    <span> {formatDistance(new Date(value), new Date(), { addSuffix: true })}</span>
                  )}
                />
                <Table.Column prop="id" label="id" />
                <Table.Column prop="name" label="name" />
                <Table.Column prop="name" label="name" />
              </Table>
            </Card>
          </div>
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

  const { data: users } = await internalFetcher('get', '/api/user')
  console.log(users)

  return {
    props: { session, users }
  }
}
