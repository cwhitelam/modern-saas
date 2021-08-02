import Nav from '@components/Nav'
import MSCard from '@components/ui/MSCard'

export default function SignIn() {
  return (
    <div>
      <Nav />
      <div className="mt-6 max-w-screen-lg mx-auto w-full">
        <MSCard>
          <h3 className="text-3xl font-bold">Sign in</h3>

          <p className="text-md mt-4">Sign in form</p>
        </MSCard>
      </div>
    </div>
  )
}
