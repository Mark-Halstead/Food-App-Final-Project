import React from 'react'
import { Landing, PricingCards, Hamburger } from '../../components'
import HomeWrapper from '../../assets/wrappers/HomePage'

const HomePage = () => {
  return (
    <HomeWrapper>
      <div className="hamburger-container">
        <Hamburger />
        <Landing />
        <PricingCards />
      </div>
    </HomeWrapper>
  )
}

export default HomePage
