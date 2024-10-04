import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createEmployee } from '../store/features/employeeSlice';
import { getDepartment } from '../store/features/departmentSlice';
import TextInput from './TextInput';
import TextAreaInput from './TextAreaInput';

const AddEmployee = () => {
    const { loading, error, data, errorMessage } = useSelector((state) => state.employee)
    const { depts } = useSelector((state) => state.department)
    const dispatch = useDispatch();
    const [employeeFormData, setEmployeeFormData] = useState({
        name: "",
        department: "",
        address: "",
        location: "",
    });

    useEffect(() => {
        dispatch(getDepartment())
    }, [])

    useEffect(() => {
        setEmployeeFormData({
            name: "",
            department: "",
            address: "",
            location: "",
        })
    }, [data])

    const handalFormChange = (e) => {
        setEmployeeFormData({ ...employeeFormData, [e.target.name]: e.target.value })
    }

    const handalSubmit = async (e) => {
        e.preventDefault()
        console.log(employeeFormData)
        dispatch(createEmployee(employeeFormData))
    }

    return (
        <div className='rounded-lg border border-gray-400 py-4'>
            <form onSubmit={handalSubmit} className="max-w-sm mx-auto  h-full flex flex-col justify-between">
                <div>
                    <div>
                        {error && <p className='text-red-500'>{errorMessage}</p>}
                    </div>
                    {/* <div className="mb-2">
                        <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input value={employeeFormData.name} onChange={handalFormChange} name='name' type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " placeholder="Enter Employee  Name" required />
                    </div> */}

                    <TextInput handalChange={handalFormChange}
                        value={employeeFormData.name}
                        label="Employee Name"
                        placeholder="Enter Emp Name"
                        name={"name"}
                        required
                    />


                    <div className="mb-2">
                        <label htmlFor="department" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Department</label>
                        <select value={employeeFormData.department} required onChange={handalFormChange} id="department" name='department' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option disabled value="">Select Department</option>
                            {
                                depts && depts.map((dept) => {
                                    return <option key={dept.id} value={dept.id}>{dept.name}</option>
                                })
                            }
                        </select>
                    </div>
                    {/* <div className="mb-4">
                        <label htmlFor="address" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                        <textarea value={employeeFormData.address} onChange={handalFormChange} id="address" name='address' rows="2" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter Address" required></textarea>
                    </div> */}

                    <TextAreaInput
                        handalChange={handalFormChange}
                        value={employeeFormData.address}
                        name={"address"}
                        label="Employee Address"
                        placeholder="Enter Address"
                    />

                    <TextInput handalChange={handalFormChange}
                        value={employeeFormData.location}
                        label="Employee location"
                        placeholder="Enter Emp location"
                        name={"location"}
                        
                    />


                </div>
                <div className='flex justify-end'>
                    <button disabled={loading} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Add Employee</button>
                </div>
            </form>
        </div>
    )
}

export default AddEmployee
