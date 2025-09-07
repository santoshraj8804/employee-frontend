import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react'
import axios from 'axios';
      const url = process.env.BACKEND_URL;

const userContext = createContext();

const authContext = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {

            try {
                const token = localStorage.getItem('token');
                if(token) {
                    const response = await axios.get(`${url}/api/auth/verify`, {
                        headers: {
                            "Authorization" : `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                    if(response.data.success) {
                        setUser(response.data.user);
                    }
                } else {
                    setUser(null);
                    setLoading(false);
                }
            } catch (error) {
                if(error.response && !error.response.data.error) {
                    setUser(null);
                }
            } finally {
                setLoading(false);
            }
        }
        verifyUser();
    }, [])

    const login = (user) => {
        setUser(user);
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    }
  return (
    <userContext.Provider value={{user, login, logout, loading}}>
        {children}
    </userContext.Provider>
  )
}

export const useAuth = () => useContext(userContext)
export default authContext
