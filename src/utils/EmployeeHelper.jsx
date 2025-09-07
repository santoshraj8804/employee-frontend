import axios from 'axios'
import { useNavigate } from 'react-router-dom'
      const url = process.env.BACKEND_URL;

export const columns = [
    {
        name: "S No.",
        selector: (row) => row.sno,
        width: "140px"
    },
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        width: "200px"
    },
    {
        name: "Image",
        selector: (row) => row.profileImage,
        width: "200px"
    },
    {
        name: "Department",
        selector: (row) => row.dep_name,
        width: "200px"
    },
    {
        name: "DOB",
        selector: (row) => row.dob,
        sortable: true,
        width: "200px"
    },
    {
        name: 'Action',
        selector: (row) => row.action,
        center: true
    },
]

export const fetchDepartments = async () => {
      let departments
      try {
        const response = await axios.get(`${url}/api/department`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });
        if(response.data.success) {
          departments = response.data.departments
        }
      } catch (error) {
        if(error.response && !error.response.data.success) {
          alert(error.response.data.error)
        }
      }
      return departments
}

// employee for salary form

export const getEmployees = async (id) => {
      let employees;
      try {
        const response = await axios.get(`${url}/api/employee/department/${id}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });
        if(response.data.success) {
          employees = response.data.employees
        }
      } catch (error) {
        if(error.response && !error.response.data.success) {
          alert(error.response.data.error)
        }
      }
      return employees
}

export const EmployeeButtons = ({_id }) => {
    const navigate = useNavigate();
    return (
        <div className="flex space-x-3">
            <button className="px-3 py-1 bg-teal-600 text-white"
              onClick={() => navigate(`/admin-dashboard/employee/${_id}`)}
            >View</button>

            <button className="px-3 py-1 bg-blue-600 text-white"
              onClick={() => navigate(`/admin-dashboard/employee/edit/${_id}`)}
            >Edit</button>

            <button className="px-3 py-1 bg-yellow-600 text-white"
              onClick={() => navigate(`/admin-dashboard/employee/salary/${_id}`)}     
            >Salary</button>

            <button className="px-3 py-1 bg-red-600 text-white"
              onClick={() => navigate(`/admin-dashboard/employees/leaves/${_id}`)}
            >Leave</button>
        </div>
    )
}
