import './App.css'
import React, { useEffect, useState } from "react"
import LoginPage from './Components/Login.jsx'
import RegisterPage from './Components/Register.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Dashboard from './Components/Dashboard.jsx'
import Patient from './Components/PatientTab.jsx'
import Profile from './Components/Profile.jsx'
import Staff from './Components/Staff.jsx'
import Ward from './Components/Ward.jsx'
import Supplies from './Components/Supplies.jsx'
import { supabase } from './client.js';
import PatientTab from './Components/PatientTab.jsx'
function App() {

  const [token, setToken] = useState(false)
  if(token){
    sessionStorage.setItem('token', JSON.stringify(token))
  }
  
  useEffect(() =>{
    if(sessionStorage.getItem('token')){
      let data = JSON.parse(sessionStorage.getItem('token'))
      setToken(data)
    }
  }, [])


  const router = createBrowserRouter([
    {
        path:'/',
        element: <LoginPage setToken={setToken}/>
    },
    {
        path:'/register',
        element: <RegisterPage />
    },
    {
        path:'/dashboard',
        element: token ? <Dashboard token={token}/> : <LoginPage setToken={setToken}/>
    },
    {
      path:'/patients',
      element: <PatientTab />
    },
    {
      path:'/profile',
      element: token ? <Profile token={token}/> : <LoginPage setToken={setToken}/>
    },
    {
      path:'/staffs',
      element: token ? <Staff token={token}/> : <LoginPage setToken={setToken}/>
    },
    {
      path: '/wards',
      element:  token ? <Ward token={token}/> : <LoginPage setToken={setToken}/>
    },
    {
      path: '/supplies',
      element:  token ? <Supplies token={token}/> : <LoginPage setToken={setToken}/> 
    }
  ])

  

  return (
    <>
      <RouterProvider router={router}/>
      
    </>
  );
}

export default App
