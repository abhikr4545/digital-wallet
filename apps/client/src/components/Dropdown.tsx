interface DropdownProps {
  data: string[]
}

const Dropdown = ({ data }: DropdownProps) => {
  return (
    <select 
      name='receiver-list' 
      id='receiver-list' 
      defaultValue={''} 
      className='w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
        hover:border-gray-400 cursor-pointer
        appearance-none text-sm mt-2'
    >
      <option value="" disabled selected className="text-gray-500">
        Please select a receiver
      </option>
      {data.map((receiverId: string) => (
        <option 
          key={receiverId} 
          value={receiverId}
          className="text-gray-900"
        >
          {receiverId}
        </option>
      ))}
    </select>
  )
}

export default Dropdown