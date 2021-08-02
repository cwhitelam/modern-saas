import Nav from '@components/Nav'
import MSCard from '@components/ui/MSCard'

export default function SignupPage() {
  return (
    <div>
      <Nav />
      <div className="mt-6 max-w-screen-lg mx-auto w-full">
        <MSCard>
          <h3 className="text-3xl font-bold">Sign up</h3>

          <p className="text-md mt-4">Sign up form</p>
        </MSCard>
      </div>
    </div>
  )
}
