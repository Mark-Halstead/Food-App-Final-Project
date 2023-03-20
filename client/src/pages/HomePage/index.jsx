import React from 'react'
import { Landing, PricingCards, Hamburger } from '../../components'

const HomePage = () => {
  return (
    <div className="hamburger-container">
      <Hamburger />
      <Landing />
      <PricingCards />
    </div>
  )
}

export default HomePage
