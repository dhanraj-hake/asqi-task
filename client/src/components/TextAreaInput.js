import React from 'react'

const TextAreaInput = ({handalChange, value, label, placeholder, name}) => {
    return (
        <div className="mb-4">
            <label htmlFor="address" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <textarea value={value} onChange={handalChange}  name={name} rows="2" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder={placeholder} required></textarea>
        </div>
    )
}

export default TextAreaInput
