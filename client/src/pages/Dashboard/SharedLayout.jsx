import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { SmallSideBar, NavbarD } from '../../components'
import { BigSidebar } from '../../components'
import Wrapper from '../../assets/wrappers/SharedLayout'
import { UserContext } from '../../contexts/UserContext'


const SharedLayout = () => {
  const [userData, setUserData] = useState({})
  const [nutritionistData, setNutritionistData] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  useEffect(() => {
    async function fetchUser() {
      const options = {
        headers:{
          Authorization:localStorage.token
        }
      } 
      const response = await fetch('http://127.0.0.1:5000/users/load_profile', options)
      const data = await response.json()
      setUserData(data.user_data)
      setNutritionistData(data.nutritionist_data)
    }
    if (isLoggedIn) {
      fetchUser()
    } 
  }, [])

  return (
  

      <Wrapper>
        <UserContext.Provider value={{userData, nutritionistData, setUserData, isLoggedIn, setIsLoggedIn}}>
        <main className='dashboard'>
          <SmallSideBar />
          <BigSidebar />
          <div>
            <NavbarD />
            <div className="dashboard-page">
              <Outlet />
            </div>
          </div>
        </main>
        </UserContext.Provider>
      </Wrapper>

  )
}

export default SharedLayout
