import MSButton from '@components/ui/MSButton'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Nav() {
  const router = useRouter()

  return (
    <div className="border-b border-grey-100">
      <div className="mx-auto max-w-screen-lg flex items-center justify-between px-2 lg:px-0 py-4 mt-6">
        <div>
          <Link href="/">
            <a className="font-bold text-lg">Modern SaaS</a>
          </Link>
        </div>
        <div className="flex items-center space-x-1">
          <MSButton onClick={() => router.push(`/signin`)} flat="true">
            Sign in
          </MSButton>

          <MSButton onClick={() => router.push(`/signup`)}>Sign up for free</MSButton>
        </div>
      </div>
    </div>
  )
}
