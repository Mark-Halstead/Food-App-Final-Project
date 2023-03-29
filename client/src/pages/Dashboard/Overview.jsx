import React, { useState, useEffect } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { StatsContainer, ChartContainer } from '../../components'


const Overview = () => {
    const [userData, setUserData] = useState({})
    const [nutritionistData, setNutritionistData] = useState({})

    useEffect(() => {
      async function fetchUser() {
        const response = await fetch('/api/user/load_profile')
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
        <StatsContainer />
        <ChartContainer />
      </UserContext.Provider>
    )
  }
  
  export default Overview
