import './App.css'
import React from "react"
import LoginPage from './Components/Login.jsx'
import RegisterPage from './Components/Register.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

const router = createBrowserRouter([
  {
      path:'/',
      element: <LoginPage />
  },
  {
      path:'/register',
      element: <RegisterPage />
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App
