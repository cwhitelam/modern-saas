import MSButton from '@components/ui/MSButton'
import Link from 'next/link'

export default function Nav() {
  return (
    <div className="flex items-center justify-between px-4 py-4 mt-4">
      <div>
        <Link href="/">
          <a className="font-bold text-lg">Modern SaaS</a>
        </Link>
      </div>
      <div className="flex items-center space-x-1">
        <MSButton flat="true">Sign in</MSButton>

        <Link href="/signup">
          <MSButton>Sign up for free</MSButton>
        </Link>
      </div>
    </div>
  )
}
