export async function getServerSideProps() {
  console.log('INDEX PAGE: THIS IS ONT HE SERVERRRR')
  return {
    props: {
      success: true
    }
  }
}

export default function IndexPage() {
  return (
    <p className="mt-3 text-2xl">
      Index Page: Get started by editing
      <code className="p-3 font-mono text-lg bg-gray-100 rounded-md">pages/index.js</code>
    </p>
  )
}
