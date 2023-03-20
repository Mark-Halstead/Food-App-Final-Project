import React from 'react'
import { HomePage } from './pages'
import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components'


function App() {

  return (
    <>
      <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
    </>
  )
}

export default App
