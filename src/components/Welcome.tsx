import Link from 'next/link'
export default function Welcome() {
  return (
    <div>
      <code className="p-3 font-mono text-2xl bg-gray-100 rounded-md">Welcome Component</code>
      <div className="bg-red-500 w-48">
        <Link href="/about">AboutPage </Link>
      </div>
    </div>
  )
}
