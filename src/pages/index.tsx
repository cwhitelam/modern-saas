export async function getServerSideProps() {
  console.log('THIS IS ONT HE SERVERRRR')
  return {
    props: {
      success: true
    }
  }
}

export default function IndexPage() {
  return <div>Welcome!!!!</div>
}
