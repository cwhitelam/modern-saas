import Welcome from '../components/Welcome'

export async function getServerSideProps() {
  console.log('INDEX PAGE: THIS IS ONT HE SERVERRRR')
  return {
    props: {
      success: true
    }
  }
}

export default function IndexPage() {
  return <Welcome />
}
