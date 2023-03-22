import React from 'react'
import { Outlet } from 'react-router-dom'
import { SmallSideBar, NavbarD } from '../../components'
// import { BigSideBarN } from '../../components'
import Wrapper from '../../assets/wrappers/SharedLayout'

const NutritionistSharedLayout = () => {
  return (
    <Wrapper>
      <main className='dashboard'>
        <SmallSideBar />
        {/* <BigSideBarN /> */}
        <div>
          <NavbarD />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  )
}

export default NutritionistSharedLayout
