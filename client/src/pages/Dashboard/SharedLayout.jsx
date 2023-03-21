import React from 'react'
import { Outlet } from 'react-router-dom'
import { BigSideBar, SmallSideBar, NavbarD } from '../../components'
import Wrapper from '../../assets/wrappers/SharedLayout'

const SharedLayout = () => {
  return (
    <Wrapper>
      <main className='dashboard'></main>
    </Wrapper>
  )
}

export default SharedLayout
