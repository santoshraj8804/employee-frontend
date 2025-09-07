import React, { useState } from 'react'
import { useAuth } from '../../context/authContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Add = () => {
  const {user} = useAuth();

  const navigate = useNavigate();

  const [leave, setLeave] = useState({
    userId: user._id,
  });
    const handleChange = (e) => {
        const {name, value} = e.target;
        setLeave((prevState) => ({...prevState, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
                const url = process.env.BACKEND_URL;

            const response = await axios.post(`${url}/api/leave/add`, leave,  {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            if(response.data.success) {
                navigate(`/employee-dashboard/leaves/${user._id}`);
            }
        } catch (error) {
            if(error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        }
    }
  return (
    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
      <h2 className='text-2xl font-bold mb-6 text-center'>
        Request for Leave
      </h2>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col space-y-4'>
            <div>
                <label className='block text-sm text-gray-700 font-medium'>
                    Leave Type
                </label>
                <select
                    
                    name='leaveType'
                    className='w-full p-2 border border-gray-300 rounded-md mt-1 block'
                    onChange={handleChange}
                    required
                >
                    <option value=''>Select Leave Type</option>
                    <option value='sick'>Sick Leave</option>
                    <option value='casual'>Casual Leave</option>
                    <option value='annual'>Annual Leave</option>
                </select>
            </div>
        
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {/* from date */}
                <div>
                    <label className='block text-sm text-gray-700 font-medium'>
                        Start Date
                    </label>
                    <input
                        type='date'
                        name='startDate'
                        className='mt-1 w-full p-2 block border border-gray-300 rounded-md'
                        onChange={handleChange}
                        required
                    />
            </div>

            {/* to date */}
            <div>
                <label className='block text-sm text-gray-700 font-medium'>
                    End Date
                </label>
                <input
                    type='date'
                    name='endDate'
                    className='mt-1 w-full p-2 block border border-gray-300 rounded-md'
                    onChange={handleChange}
                    required
                />
             </div>
           </div>

        {/* description */}
        
        <div>
            <label className='block text-sm text-gray-700 font-medium'>
                Description
            </label>
            <textarea
                name='reason'
                placeholder='Reason for leave'
                className='w-full border border-gray-300 rounded-md'
                onChange={handleChange}
            />
          </div>
        </div>

          <button
            type='submit'
            className='w-full mt-6 px-4 py-2 bg-teal-600 hover:bg-teal-700 font-bold rounded text-white'
          >
            Submit
          </button>
      </form>
      
    </div>
  )
}

export default Add
