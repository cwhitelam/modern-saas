import Link from 'next/link'

export default function Nav() {
  return (
    <div className="flex items-center justify-between bg-indigo-400 text-white px-4 py-4">
      <div>
        <Link href="/">
          <a className="font-bold text-lg">Modern SaaS</a>
        </Link>
      </div>
      <div>Sign in</div>
    </div>
  )
}
