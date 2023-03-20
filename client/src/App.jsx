import React from 'react'
import { HomePage, Dashboard } from './pages'
import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components'


function App() {

  return (
    <>
      <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="http://localhost:3000/dashboard/app" />
      </Route>
    </Routes>
    </>
  )
}

export default App
