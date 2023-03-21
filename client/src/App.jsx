import React from 'react'
import { HomePage, Dashboard } from './pages'
import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components'
import { Profile, Overview, Plan, SharedLayout, Chat } from './pages/Dashboard'


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/dashboard" element={<SharedLayout />}>
          <Route path='overview' element={<Overview />} />
          <Route path='profile' element={<Profile />} />
          <Route path='plan' element={<Plan />} />
          <Route path='chat' element={<Chat />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
