import Nav from '@components/Nav'
import MSCard from '@components/ui/MSCard'

export default function SignupPage() {
  return (
    <div>
      <Nav />
      <div className="mx-auto max-w-screen-lg">
        <div className="mt-8 mx-2 md:mx-0">
          <MSCard className="w-full md:w-1/2 mx-2 md:mx-auto">
            <h3 className="text-3xl font-bold">Sign up</h3>
            Sign up form
          </MSCard>
        </div>
      </div>
    </div>
  )
}
