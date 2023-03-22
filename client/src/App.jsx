import React from 'react'
import { Clients, HomePage } from './pages'
import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components'
import { Profile, Overview, Plan, SharedLayout, Chat, NutritionistSharedLayout, Register, Login } from './pages/index'
import { useLocation } from 'react-router-dom';
import NutritionistProfile from './pages/NutritionistDashboard/NutritionistProfile'


function App() {
  const location = useLocation();

  return (
    <>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<HomePage />} />
          </Route>
          <Route path="/dashboard" element={<SharedLayout />}>
            <Route index element={<Overview />} />
            <Route path='profile' element={<Profile />} />
            <Route path='plan' element={<Plan />} />
            <Route path='chat' element={<Chat />} />
          </Route>
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route path="/nutritionist-dashboard" element={<NutritionistSharedLayout />}>
            <Route index element={<NutritionistProfile />} />
            <Route path='clients' element={<Clients />} />
            <Route path='chat' element={<Chat />} />
          </Route>
        </Routes>
    </>
  );

}

export default App;
