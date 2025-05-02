import React from 'react'
import Tracker from './Pages/Tracker'
import Register from './Pages/Register'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import ProtectedRoute from './ProtectedRoute'
import Home from './Pages/Home'
import Layout from './Pages/Layout'
import Calender from './Pages/Calender'

const App = () => {
  return (
    <div>
      <Routes>
      <Route path='/' element={<Register />} />
        <Route path='/Login' element={<Login />} />
        <Route
        path="/Home"
        element={
          <Layout>
            <ProtectedRoute><Home /></ProtectedRoute>
          </Layout>
        }
      />
        {/* <Route path='Home' element={<Home/>} /> */}
        <Route path="/Tracker" element={
          <ProtectedRoute>
            <Tracker />
          </ProtectedRoute>
        } />
        <Route path="/Calender" element={<Calender/>}/>
      </Routes>
    </div>
  )
}

export default App