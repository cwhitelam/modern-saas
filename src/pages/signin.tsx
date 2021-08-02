import Nav from '@components/Nav'
import MSCard from '@components/ui/MSCard'

export default function SignIn() {
  return (
    <div className="mx-auto max-w-screen-lg">
      <Nav />
      <div className="mt-8">
        <MSCard className="w-full md:w-1/2 mx-2 md:mx-auto">
          <h3 className="text-3xl font-bold">Sign in</h3>
          Sign in form
        </MSCard>
      </div>
    </div>
  )
}
