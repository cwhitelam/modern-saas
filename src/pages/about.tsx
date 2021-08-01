import Layout from '../components/Layout'

export async function getServerSideProps() {
  console.log('ABOUT PAGE: THIS IS ONT HE SERVERRRR')
  return {
    props: {
      success: true
    }
  }
}

export default function AboutPage() {
  return (
    <Layout>
      <p className="mt-3 text-2xl">
        About Page: Get started by editing
        <code className="p-3 font-mono text-lg bg-gray-100 rounded-md">pages/index.js</code>
      </p>
    </Layout>
  )
}
