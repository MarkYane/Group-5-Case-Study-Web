import './App.css'
import React, { useEffect, useState } from "react"
import LoginPage from './Components/Login.jsx'
import RegisterPage from './Components/Register.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Dashboard from './Components/Dashboard.jsx'


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
        element: token ? <Dashboard token={setToken}/> : <LoginPage setToken={setToken}/>
    }
  ])

  

  return (
    <>
      <RouterProvider router={router}/>
      
    </>
  );
}

export default App
