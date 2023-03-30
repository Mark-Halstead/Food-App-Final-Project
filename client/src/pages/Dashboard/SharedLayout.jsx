import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { SmallSideBar, NavbarD } from '../../components'
import { BigSidebar } from '../../components'
import Wrapper from '../../assets/wrappers/SharedLayout'
import { UserContext } from '../../contexts/UserContext'


const SharedLayout = () => {
  const [userData, setUserData] = useState({})
  const [nutritionistData, setNutritionistData] = useState({})

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
    fetchUser()
  }, [])

  if (!userData) {
    // Render a loading spinner or some other loading indicator until user data is loaded
    return <div>Loading...</div>
  }

  return (
    <UserContext.Provider value={{userData, nutritionistData}}>
      <Wrapper>
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
      </Wrapper>
    </UserContext.Provider>
  )
}

export default SharedLayout
