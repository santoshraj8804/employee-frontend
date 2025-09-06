import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'

const PrivateRoutes = ({children}) => {
  const { user, loading } = useAuth();
  if(loading) return <h1>Loading...</h1>;

  return user ? children : <Navigate to="/login" />
}

export default PrivateRoutes
