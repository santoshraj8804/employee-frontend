import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'

const Setting = () => {
    const navigate = useNavigate()
    const { user } = useAuth()
    const [setting, setSetting] = useState({
        userId: user._id,
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',

    })

    const [error, setError] = useState(null)

    const handleChange = (e) => {
        const {name, value} = e.target;
        setSetting({...setting, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(setting.newPassword !== setting.confirmPassword) {
            setError('New password and confirm password do not match');
        } else {
            try {
                const url = import.meta.env.VITE_BACKEND_URL;
                const response = await axios.put(`${url}/api/setting/change-password`, setting, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if(response.data.success) {
                    navigate('/admin-dashboard/employees');
                    setError("")
                }
            } catch (error) {
                if(error.response && !error.response.data.success) {
                    setError(error.response.data.error);
                }
            }
        }
    }

  return (
    <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
        <h2 className='text-2xl font-bold mb-6'>Change Password</h2>
        <p className='text-red-500'>{error}</p>
        <form onSubmit={handleSubmit}>
            {/* Department Name */}
            <div>
                <label className='text-sm text-gray-700 font-medium '>Old Password</label>
                <input type="password" name="oldPassword" placeholder='Old Password' onChange={handleChange} className='w-full mt-1 p-2 border border-gray-300 rounded-md' required />
            </div>

            <div>
                <label className='text-sm text-gray-700 font-medium '>New Password</label>
                <input type="password" name="newPassword" placeholder='New Password' onChange={handleChange} className='w-full mt-1 p-2 border border-gray-300 rounded-md' required />
            </div>


            <div>
                <label className='text-sm text-gray-700 font-medium '>Confirm Password</label>
                <input type="password" name="confirmPassword" placeholder='Confirm Password' onChange={handleChange} className='w-full mt-1 p-2 border border-gray-300 rounded-md' required />
            </div>

            <button type='submit' className='w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md mt-6'>Change Password</button>
            
        </form>
      
    </div>
  )
}

export default Setting
