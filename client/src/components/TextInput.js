import React from 'react'

const TextInput = ({handalChange, value, label, placeholder, name, required=false}) => {
  return (
    <div className="mb-2">
        <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
        <input value={value} onChange={handalChange} type="text" name={name} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " placeholder={placeholder} required={required} />
    </div>
  )
}

export default TextInput
