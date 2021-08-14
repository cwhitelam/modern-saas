export default function Admin() {
  return (
    <div>
      <div className="w-full">
        <div className="absolute bottom-0 left-0 w-64 h-screen bg-indigo-500 border-r b-black-500">
          <div className="p-2 m-2">
            <div className="text-lg font-bold text-white">Admin Panel</div>

            <ul className="mt-4">
              <li className="flex p-2 text-white bg-indigo-700 rounded items-align space-x-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <span className="font-bold text-xs">Users</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
