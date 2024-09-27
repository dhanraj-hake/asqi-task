import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEmployees, searchEmployees } from '../store/features/employeeSlice';

const EmployeeList = () => {
    const { empsLoading, empsError, emsEerrorMessage, emps } = useSelector((state) => state.employee)
    const dispatch = useDispatch();
    const timeoutId = useRef(0);

    useEffect(()=>{
        dispatch(getEmployees())
    },[]);

    const handalSearch = (e)=>{
        clearTimeout(timeoutId.current);
        console.log(timeoutId.current)
        timeoutId.current = setTimeout(() => {
            console.log(e.target.value);
            if(e.target.value){
                dispatch(searchEmployees(e.target.value))
            }
        }, 800);
    }

    return (
        <div className='rounded-lg border border-gray-400 p-4 mt-5'>
            <input onChange={handalSearch} type="text"  id="search" className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " placeholder="Filter by Name, Department" />
            <div className="relative overflow-x-auto my-2">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 pclassName=y-3">
                                Address
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Department
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {emps && emps.map((emp) => {
                            return (
                                <tr key={emp.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {emp.name}
                                    </td>
                                    <td className="px-6 py-4">
                                    {emp.address}
                                    </td>
                                    <td className="px-6 py-4">
                                        {emp?.department?.name}
                                    </td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default EmployeeList