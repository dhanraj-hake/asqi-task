import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createDepartment } from '../store/features/departmentSlice';
import TextInput from './TextInput';

const AddDepartment = () => {
    const { loading, error, data, errorMessage } = useSelector((state) => state.department)
    const dispatch = useDispatch();
    const [departmentFormData, setDepartmentFormData] = useState({
        name: "",
        description: "",
    });

    useEffect(() => {
        setDepartmentFormData({
            name: "",
            description: "",
        })
    }, [data]);

    const handalFormChange = (e) => {
        setDepartmentFormData({ ...departmentFormData, [e.target.name]: e.target.value })
    }

    const handalSubmit = async (e) => {
        e.preventDefault()
        console.log(departmentFormData)
        dispatch(createDepartment(departmentFormData))
    }

    return (
        <div className='rounded-lg border border-gray-400 py-4'>
            <form onSubmit={handalSubmit} className="max-w-sm mx-auto h-full flex flex-col justify-between">
                <div>
                    {/* <div className="mb-2">
                        <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input value={departmentFormData.name} onChange={handalFormChange} type="text" name='name' id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " placeholder="Enter Department Name" required />
                    </div> */}

                        <TextInput handalChange={handalFormChange} value={departmentFormData.name} label="Department Name" placeholder="Enter Department Namejk" />

                    <div className="mb-2">
                        <label htmlFor="description" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Your Description</label>
                        <textarea value={departmentFormData.description} onChange={handalFormChange} id="description" name='description' rows="2" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter Description"></textarea>
                    </div>
                </div>

                <div className='flex justify-end'>
                    <button disabled={loading} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Add Department</button>
                </div>
            </form>
        </div>
    )
}

export default AddDepartment