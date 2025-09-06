import React, { useEffect, useState } from 'react'
import { fetchDepartments } from '../../../utils/EmployeeHelper'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const Edit = () => {

    const [employee, setEmployee] = useState({
        name: '',
        maritalStatus: '',
        designation: '',
        salary: 0,
        department: ''
    })
    const [departments, setDepartments] = useState(null)
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        const getDepartments = async () => {
            const departments =await fetchDepartments()
            setDepartments(departments)
        }
        getDepartments()
    }, [])

    useEffect(() => {
        const fetchEmployee = async () => {
      try {
        const response = await axios.get(`https://employee-backend-beta.vercel.app/api/employee/${id}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });
        if(response.data.success) {
            const employee = response.data.employee
          setEmployee((prev) => ({...prev, name: employee.userId.name, maritalStatus: employee.maritalStatus, designation: employee.designation, salary: employee.salary, department: employee.department}))
        }
      } catch (error) {
        if(error.response && !error.response.data.success) {
          alert(error.response.data.error)
        }
      }
    }
    fetchEmployee()
    }, [])

    const handleChange = (e) => {
        const {name, value} = e.target;
            setEmployee((prevData) => ({...prevData, [name]: value}))
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.put(`https://employee-backend-beta.vercel.app/api/employee/${id}`, employee, {
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
    <>{departments && employee ? (
    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
        <h2 className='text-2xl font-bold mb-6'>
            Edit Employee
        </h2>
        <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {/* Name */}
                <div>
                    <label className='block text-sm text-gray-700 font-medium'>Name</label>
                    <input type="text" name='name' value={employee.name} onChange={handleChange} placeholder='Enter Employee Name' className='w-full border block rounded-md mt-1 p-2 border-gray-300' required/>
                </div>

                {/* Marital Status */}
                <div>
                    <label className='block text-sm text-gray-700 font-medium'>Marital Status</label>
                    <select name='maritalStatus' value={employee.maritalStatus} onChange={handleChange} placeholder='Marital Status' className='w-full border block rounded-md mt-1 p-2 border-gray-300' 
                    required>
                        <option value="">Select Marital Status</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                    </select>
                </div>

                {/* Designation */}
                <div>
                    <label className='block text-sm text-gray-700 font-medium'>Designation</label>
                    <input type="text" name='designation' value={employee.designation} onChange={handleChange} placeholder='Enter Employee Designation' className='w-full border block rounded-md mt-1 p-2 border-gray-300' required/>
                </div>

                {/* Salary */}
                <div>
                    <label className='block text-sm text-gray-700 font-medium'>Salary</label>
                    <input type="number" name='salary' value={employee.salary} onChange={handleChange} placeholder='Employee Salary' className='w-full border block rounded-md mt-1 p-2 border-gray-300' required/>
                </div>
           
                {/* Department */}
                <div className='col-span-2'>
                    <label className='block text-sm text-gray-700 font-medium'>Department</label>
                    <select name='department' onChange={handleChange} value={employee.department} className='w-full border block rounded-md mt-1 p-2 border-gray-300' required>
                        <option value="">Select Department</option>
                        {departments.map(dep => (<option key={dep._id} value={dep._id}>{dep.dep_name}</option>))}
                    </select> 
                </div>

            </div>
            <button type='submit' className='px-4 py-2 bg-teal-600 text-white rounded w-full mt-6 hover:bg-teal-700 font-bold '>Update Employee</button>
        </form>
      
    </div>

    ) : <div>Loading...</div>}</>
  )
}


export default Edit
