import React from 'react'
import { HomePage } from './pages'
import { Routes, Route } from 'react-router-dom'
import { NavBar } from './components'


function App() {

  return (
    <>
      <Routes>
      <Route path="/" element={<NavBar />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
    </>
  )
}

export default App
