const MSCard = (props: any) => {
  return (
    <div className={`${props.className} rounded overflow-hidden shadow-lg p-4 `}>
      {props.children}
    </div>
  )
}

export default MSCard
