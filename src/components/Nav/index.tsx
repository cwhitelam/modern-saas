import MSButton from '@components/ui/MSButton'
import { MEDIA_QUERIES } from '@utils/mediaQueries'
import useMediaQuery from '@utils/useMediaQuery'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Nav() {
  const router = useRouter()
  const check = useMediaQuery(MEDIA_QUERIES.SMALL)
  const [isNotSmall, setIsNotSmall] = useState(false)

  useEffect(() => {
    setIsNotSmall(check || false)
  }, [check])

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
