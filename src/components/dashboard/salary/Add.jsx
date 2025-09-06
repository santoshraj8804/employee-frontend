import React, { useEffect, useState } from 'react'
import { fetchDepartments, getEmployees } from '../../../utils/EmployeeHelper'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Add = () => {

    const [salary, setSalary] = useState({
        employeeId: null,
        basicSalary: 0,
        allowance: 0,
        deductions: 0,
        payDate: null,
    })
    const [departments, setDepartments] = useState(null)
    const [employees, setEmployees] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const getDepartments = async () => {
            const departments =await fetchDepartments()
            setDepartments(departments)
        }
        getDepartments()
    }, [])

    const handleDepartment = async (e) => {
        const emps = await getEmployees(e.target.value)
        setEmployees(emps)
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
            setSalary((prevData) => ({...prevData, [name]: value}))
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(`http://localhost:3000/api/salary/add`, salary, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            //console.log(response.data)
            if(response.data.success) {
                //alert(response.data.message);
                navigate('/admin-dashboard/employees');
            }
        } catch (error) {
            if(error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
    } 
    }

  return (
    <>{departments ? (
    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
        <h2 className='text-2xl font-bold mb-6'>
            Add Salary
        </h2>
        <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

                 {/* Department */}
                <div>
                    <label className='block text-sm text-gray-700 font-medium'>Department</label>
                    <select name='department' onChange={handleDepartment} className='w-full border block rounded-md mt-1 p-2 border-gray-300' required>
                        <option value="">Select Department</option>
                        {departments.map(dep => (<option key={dep._id} value={dep._id}>{dep.dep_name}</option>))}
                    </select> 
                </div>

                {/* employee */}
                <div>
                    <label className='block text-sm text-gray-700 font-medium'>Employee</label>
                    <select name='employeeId' onChange={handleChange} className='w-full border block rounded-md mt-1 p-2 border-gray-300' required>
                        <option value="">Select Employee</option>
                        {employees.map(emp => (<option key={emp._id} value={emp._id}>{emp.employeeId}</option>))}
                    </select> 
                </div>

                {/* Basic Salary */}
                <div>
                    <label className='block text-sm text-gray-700 font-medium'>Basic Salary</label>
                    <input type="number" name='basicSalary' onChange={handleChange} placeholder='basic salary' className='w-full border block rounded-md mt-1 p-2 border-gray-300' required/>
                </div>

                {/* Allowance */}
                <div>
                    <label className='block text-sm text-gray-700 font-medium'>Allowance</label>
                    <input type="number" name='allowances' onChange={handleChange} placeholder='allowances' className='w-full border block rounded-md mt-1 p-2 border-gray-300' required/>
                </div>

                {/* Deduction */}
                <div>
                    <label className='block text-sm text-gray-700 font-medium'>Deductions</label>
                    <input type="number" name='deductions' onChange={handleChange} placeholder='deductions' className='w-full border block rounded-md mt-1 p-2 border-gray-300' required/>
                </div>

                {/* Pay Date */}
                <div>
                    <label className='block text-sm text-gray-700 font-medium'>Pay Date</label>
                    <input type="date" name='payDate' onChange={handleChange} className='w-full border block rounded-md mt-1 p-2 border-gray-300' required/>
                </div>

            </div>
            <button type='submit' className='px-4 py-2 bg-teal-600 text-white rounded w-full mt-6 hover:bg-teal-700 font-bold '>Add Salary</button>
        </form>
      
    </div>

    ) : <div>Loading...</div>}</>
  )
}


export default Add
