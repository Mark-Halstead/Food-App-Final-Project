import React from 'react';
import { Landing, PricingCards, Hamburger, SocialMediaNavbar, Landinglogo, About, PeopleReviews } from '../../components';
import Wrapper from '../../assets/wrappers/HomePage';

const HomePage = () => {

  return (
    <Wrapper>
      {/* <Hamburger /> */}
      <Landinglogo />
      <Landing />
      <About />
      <PricingCards />
      <PeopleReviews />
      <SocialMediaNavbar />
    </Wrapper>
  );
};

export default HomePage;

