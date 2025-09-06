import React, { useEffect, useState } from 'react'
import { fetchDepartments } from '../../../utils/EmployeeHelper'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Add = () => {

    const [departments, setDepartments] = useState([])
    const [formData, setFormData] = useState({})
    const navigate = useNavigate();

    useEffect(() => {
        const getDepartments = async () => {
            const departments =await fetchDepartments()
            setDepartments(departments)
        }
        getDepartments()
    }, [])

    const handleChange = (e) => {
        const {name, value, files} = e.target;
        if(name === 'image') {
            setFormData((prevData) => ({...prevData, [name]: files[0]}))
        } else {
            setFormData((prevData) => ({...prevData, [name]: value}))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataObj = new FormData();
        Object.keys(formData).forEach((key) => {
            formDataObj.append(key, formData[key])
        })
        
        try {
            const response = await axios.post('http://localhost:3000/api/employee/add', formDataObj, {
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
    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
        <h2 className='text-2xl font-bold mb-6'>
            Add New Employee
        </h2>
        <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {/* Name */}
                <div>
                    <label className='block text-sm text-gray-700 font-medium'>Name</label>
                    <input type="text" name='name' onChange={handleChange} placeholder='Enter Employee Name' className='w-full border block rounded-md mt-1 p-2 border-gray-300' required/>
                </div>

                {/* Email */}
                <div>
                    <label className='block text-sm text-gray-700 font-medium'>Email</label>
                    <input type="email" name='email' onChange={handleChange} placeholder='Enter Employee Email' className='w-full border block rounded-md mt-1 p-2 border-gray-300' required/>
                </div>

                {/* Employee ID */}
                <div>
                    <label className='block text-sm text-gray-700 font-medium'>Employee ID</label>
                    <input type="text" name='employeeId' onChange={handleChange} placeholder='Employee ID' className='w-full border block rounded-md mt-1 p-2 border-gray-300' required/>
                </div>

                {/* Date of Birth */}
                <div>
                    <label className='block text-sm text-gray-700 font-medium'>Date of Birth</label>
                    <input type="date" name='dob' onChange={handleChange} placeholder='DOB' className='w-full border block rounded-md mt-1 p-2 border-gray-300' required/>
                </div>

                {/* Gender */}
                <div>
                    <label className='block text-sm text-gray-700 font-medium'>Gender</label>
                    <select name='gender' onChange={handleChange} className='w-full border block rounded-md mt-1 p-2 border-gray-300' 
                    required>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                {/* Marital Status */}
                <div>
                    <label className='block text-sm text-gray-700 font-medium'>Marital Status</label>
                    <select name='maritalStatus' onChange={handleChange} placeholder='Marital Status' className='w-full border block rounded-md mt-1 p-2 border-gray-300' 
                    required>
                        <option value="">Select Marital Status</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                    </select>
                </div>

                {/* Designation */}
                <div>
                    <label className='block text-sm text-gray-700 font-medium'>Designation</label>
                    <input type="text" name='designation' onChange={handleChange} placeholder='Enter Employee Designation' className='w-full border block rounded-md mt-1 p-2 border-gray-300' required/>
                </div>

                {/* Department */}
                <div>
                    <label className='block text-sm text-gray-700 font-medium'>Department</label>
                    <select name='department' onChange={handleChange} className='w-full border block rounded-md mt-1 p-2 border-gray-300' required>
                        <option value="">Select Department</option>
                        {departments.map(dep => (<option key={dep._id} value={dep._id}>{dep.dep_name}</option>))}
                    </select> 
                </div>

                {/* Salary */}
                <div>
                    <label className='block text-sm text-gray-700 font-medium'>Salary</label>
                    <input type="number" name='salary' onChange={handleChange} placeholder='Employee Salary' className='w-full border block rounded-md mt-1 p-2 border-gray-300' required/>
                </div>

                {/* Password */}
                <div>
                    <label className='block text-sm text-gray-700 font-medium'>Password</label>
                    <input type="password" name='password' onChange={handleChange} placeholder='********' className='w-full border block rounded-md mt-1 p-2 border-gray-300' required/>
                </div>

                {/* Role */}
                <div>
                    <label className='block text-sm text-gray-700 font-medium'>Role</label>
                    <select name='role' onChange={handleChange} className='w-full border block rounded-md mt-1 p-2 border-gray-300' required>
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="employee">Employee</option>
                    </select>
                </div>

                {/* Image Upload */}
                <div>
                    <label className='block text-sm text-gray-700 font-medium'>Upload Image</label>
                    <input type="file" name='image' onChange={handleChange} placeholder='Upload Image' accept='image/*' className='w-full border block rounded-md mt-1 p-2 border-gray-300' required/>
                </div>

            </div>
            <button type='submit' className='px-4 py-2 bg-teal-600 text-white rounded w-full mt-6 hover:bg-teal-700 font-bold '>Add Employee</button>
        </form>
      
    </div>
  )
}

export default Add
