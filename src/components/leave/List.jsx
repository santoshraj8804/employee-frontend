
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../context/authContext'

const List = () => {
      const [leaves, setLeaves] = useState(null);
      let sno = 1;
      const {id} = useParams();
      const {user} = useAuth();
      
      const fetchLeaves = async () => {
        try {
          const response = await axios.get(`https://employee-backend-beta.vercel.app/api/leave/${id}/${user.role}`, {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
          });

          if(response.data.success) {
            setLeaves(response.data.leaves)
          }
        } catch (error) {
          if(error.response && !error.response.data.success) {
            alert(error.message)
          }
        }
      }

      useEffect(() => {
        fetchLeaves();
      }, [])

      if(!leaves) {
        return <div>Loading...</div>
      }
  return (
    <div className='p-6'>
        <div className='text-center'>
            <h3 className='text-2xl font-bold'>Manage Leaves</h3>
        </div>
        <div className='flex justify-between items-center'>
            <input 
               type="text" 
               placeholder='Search Leave'
               className='px-4 py-0.5 border'
            />
            {user.role === "employee" && (
              <Link
                to="/employee-dashboard/add-leave"
                className='px-4 py-1 bg-teal-600 rounded text-white'

                >Add New Leave
              </Link>
            )} 
        </div>

        <table className='w-full text-sm text-left text-gray-500 mt-6'>
            <thead className='text-xs uppercase bg-white border border-gray-400'>
                <tr>
                    <th className='px-6 py-3'>
                        S.No
                    </th>
                    <th className='px-6 py-3'>
                        Leave Type
                    </th>
                    <th className='px-6 py-3'>
                        Start Date
                    </th>
                    <th className='px-6 py-3'>
                        End Date
                    </th>
                    <th className='px-6 py-3'>
                        Description
                    </th>
                    <th scope='col' className='px-6 py-3'>
                        Status
                    </th>
                </tr>
            </thead>
            <tbody>
                {leaves.map((leave) => (
                    <tr className='bg-white border-b dark:border-gray-400' key={leave._id}>
                        <td className='px-6 py-4'>{sno++}</td>
                        <td className='px-6 py-4'>{leave.leaveType}</td>
                        <td className='px-6 py-4'>{new Date(leave.startDate).toLocaleDateString()}</td>
                        <td className='px-6 py-4'>{new Date(leave.endDate).toLocaleDateString()}</td>
                        <td className='px-6 py-4'>{leave.reason}</td>
                        <td className='px-6 py-4'>{leave.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
      
    </div>
  ) 
}

export default List

