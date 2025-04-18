import React from 'react'
import Tracker from './Pages/Tracker'
import Register from './Pages/Register'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element= {<Login/>} />
        <Route path='/Register' element={<Register/>} />
        <Route path='/Tracker' element={<Tracker />} />
      </Routes>
    </div>
  )
}

export default App