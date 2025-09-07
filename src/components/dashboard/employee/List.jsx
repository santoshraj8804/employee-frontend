import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { columns, EmployeeButtons } from '../../../utils/EmployeeHelper'
import DataTable from 'react-data-table-component'

const List = () => { 
    const [employees, setEmployees] = useState([])
    const [empLoading, setEmpLoading] = useState(false)
    const [filteredEmployees, setFilteredEmployees] = useState([])

    useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true)
      try {
        const url = process.env.BACKEND_URL;
        const response = await axios.get(`${url}.app/api/employee`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });
        if(response.data.success) {
          let sno = 1
          const url = process.env.BACKEND_URL;
          const data = await response.data.employees.map((emp) => (
            {
              _id: emp._id,
              sno: sno++,
              dep_name: emp.department.dep_name,
              name: emp.userId.name,
              dob: new Date(emp.dob).toLocaleDateString(),
              profileImage: <img src={`${url}/${emp.userId.profileImage}`} alt={emp.userId.name} className='w-10 h-10' />,
              action: (<EmployeeButtons _id={emp._id} />),
            }
          ))
          setEmployees(data)
          setFilteredEmployees(data)
        }
      } catch (error) {
        if(error.response && !error.response.data.success) {
          alert(error.response.data.error)
        }
      } finally {
        setEmpLoading(false)
      }
    }
    fetchEmployees()
  }, [])

  const handleFilter = (e) => {
    const filteredData = employees.filter((emp) => emp.name.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilteredEmployees(filteredData)
  }
    
  return (
    <div className='p-6'>
      <div className='text-center'>
        <h3 className='text-2xl font-bold'>Manage Employees</h3>
      </div>
      <div className='flex justify-between items-center'>
        <input 
        type="text" 
        placeholder='Search By Dep Name' 
        className='px-4 py-0.5 border'
        onChange={handleFilter}
         />
        <Link to="/admin-dashboard/add-employee" className='px-4 py-1 bg-teal-600 text-white rounded'>Add New Employee</Link>
      </div>

        <div className='mt-6'>
            <DataTable columns={columns} data={filteredEmployees} pagination />
        </div>

    </div>
  )
}

export default List
