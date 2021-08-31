import { Card, Avatar, Table, Popover, Divider, Drawer, Button } from '@geist-ui/react'
import { internalFetcher } from '@utils/fetchers'
import { formatDistance } from 'date-fns'
import { getSession, signOut } from 'next-auth/client'
import { ChevronDown } from '@geist-ui/react-icons'
import { useState } from 'react'
import { CALLBACK_URL } from '../utils/constants'
import { useRouter } from 'next/router'

export default function Admin({ users, session }) {
  const router = useRouter()
  return (
    <div>
      <div className="flex">
        <div className="flex-grow">
          <div className="flex items-center justify-end p-4 border-b border-gray-200">
            <Popover
              hideArrow={true}
              placement="bottomEnd"
              width="10"
              content={() => {
                return (
                  <div>
                    <div className="">Settings</div>
                    <a onClick={() => router.push('/')}>Home</a>
                    <Divider />
                    <div className="w-full">
                      <a
                        onClick={(e) => {
                          e.preventDefault()
                          signOut({ callbackUrl: CALLBACK_URL })
                        }}
                      >
                        Sign out
                      </a>
                    </div>
                  </div>
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
