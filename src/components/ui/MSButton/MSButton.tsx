const MSButton = ({ ...props }) => {
  return (
    <button
      className={`font-bold py-2 px-4 border border-transparent rounded transition delay-75 duration-300 ease-in-out
        ${
          props.flat
            ? `bg-transparent text-blue-500 hover:border hover:border-blue-500`
            : `hover:bg-blue-700 bg-blue-500 text-white border`
        }
        `}
      {...props}
    />
  )
}

export default MSButton
