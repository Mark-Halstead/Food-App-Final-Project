import React from 'react'
import { Landing, PricingCards, Hamburger, SocialMediaNavbar } from '../../components'
import Wrapper from '../../assets/wrappers/HomePage'

const HomePage = () => {
  return (
    <Wrapper>
        {/* <Hamburger /> */}
        <Landing />
        <PricingCards />
        <SocialMediaNavbar />
    </Wrapper>
  )
}

export default HomePage
