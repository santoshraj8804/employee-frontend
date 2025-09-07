import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import EmployeeDashboard from './pages/EmployeeDashboard'
import PrivateRoutes from './utils/PrivateRoutes'
import RoleBaseRoutes from './utils/RoleBaseRoutes'
import AdminSummary from './components/dashboard/AdminSummary'
import DepartmentList from './components/dashboard/department/DepartmentList'
import AddDepartment from './components/dashboard/department/AddDepartment'
import EditDepartment from './components/dashboard/department/EditDepartment'
import List from './components/dashboard/employee/List'
import Add from './components/dashboard/employee/Add'
import View from './components/dashboard/employee/View'
import Edit from './components/dashboard/employee/Edit'
import AddSalary from './components/dashboard/salary/Add'
import ViewSalary from './components/dashboard/salary/View'
import Summary  from './components/EmployeeDashboard/Summary'
import LeaveList from './components/leave/List'
import AddLeave from './components/leave/Add'
import Setting from './components/EmployeeDashboard/Setting'
import Table from './components/leave/Table'
import Detail from './components/leave/Detail'
import dotenv from "dotenv";
dotenv.config();
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={
           <PrivateRoutes>
            <RoleBaseRoutes requiredRole={['admin']}>
              <AdminDashboard />
            </RoleBaseRoutes>
          </PrivateRoutes>
          } >

          <Route index element={<AdminSummary />} />

          <Route path="/admin-dashboard/departments" element={<DepartmentList />} />
          <Route path="/admin-dashboard/add-department" element={<AddDepartment />} />
          
          <Route path="/admin-dashboard/department/:id" element={<EditDepartment />} />
          <Route path="/admin-dashboard/employees" element={<List />} />

          <Route path="/admin-dashboard/add-employee" element={<Add />} />
          <Route path="/admin-dashboard/employee/:id" element={<View />} />
          <Route path="/admin-dashboard/employee/edit/:id" element={<Edit />} />
          <Route path="/admin-dashboard/employee/salary/:id" element={<ViewSalary />} />
          <Route path="/admin-dashboard/salary/add" element={<AddSalary />} />
          <Route path="/admin-dashboard/leaves" element={<Table />} />
          <Route path="/admin-dashboard/leaves/:id" element={<Detail />} />
          <Route path="/admin-dashboard/employees/leaves/:id" element={<LeaveList />} />

          <Route path="/admin-dashboard/setting" element={<Setting />} />
        </Route>

        <Route path="/employee-dashboard" element={
          <PrivateRoutes>
            <RoleBaseRoutes requiredRole={["admin", "employee"]}>
              <EmployeeDashboard />
            </RoleBaseRoutes>
          </PrivateRoutes>
        }>
        
        <Route index element={<Summary />} />
        <Route path="/employee-dashboard/profile/:id" element={<View />} ></Route>
        <Route path="/employee-dashboard/leaves/:id" element={<LeaveList />} ></Route>
        <Route path="/employee-dashboard/add-leave" element={<AddLeave />} ></Route>
        <Route path="/employee-dashboard/salary/:id" element={<ViewSalary />} ></Route>
        <Route path="/employee-dashboard/setting" element={<Setting />} ></Route>




        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App 
 