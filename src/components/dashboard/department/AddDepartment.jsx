import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddDepartment = () => {

  const [department, setDepartment] = useState({
    dep_name: '',
    description: ''
  })
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setDepartment({...department,[name]: value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(`${url}/api/department/add`, department, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
      });
      //console.log(response.data)
      if(response.data.success) {
         //alert(response.data.message);
        navigate('/admin-dashboard/departments');
      }
    } catch (error) {
      if(error.response && !error.response.data.success) {
        alert(error.response.data.error)
      }
    } 
  }

  return (
    <div className='maw-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
      <h2 className='text-2xl font-bold mb-6'>Add New Department</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='dep_name'
          className='text-sm font-medium text-gray-700'
          >
            Department Name
          </label>
          <input 
            type="text"
            name='dep_name'
            onChange={handleChange}
            placeholder='Enter Department Name'
            className='mt-1 p-2 border rounded-md w-full border-gray-300'
            required 
          />
        </div>


        <div className='mt-4'>
          <label 
          htmlFor='description'
          className='block text-sm font-medium text-gray-700'
          >
            Description
          </label>
          <textarea
            name='description'
            placeholder='Description'
            onChange={handleChange}
            className='mt-1 p-2 block border rounded-md w-full border-gray-300'
            rows={4}
          />
        </div>

        <button
        type='submit'
        className='w-full mt-6 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 font-bold'
        >
          Add Department
        </button>
      </form>
    </div>
  )
}

export default AddDepartment
