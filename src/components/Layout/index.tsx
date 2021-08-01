import Nav from '../Nav'

type LayoutProps = {
  children: React.ReactNode
  container?: boolean
  naked?: boolean
}

const Layout = ({ container, children, naked }: LayoutProps) => {
  return (
    <>
      <Nav />
      <div className={`${container && 'px-2 mx-auto max-w-screen-xl'}`}>{children}</div>
    </>
  )
}

export default Layout
