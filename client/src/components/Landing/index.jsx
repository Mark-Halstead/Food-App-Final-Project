import React from 'react'
import LandingHeader from '../LandingHeader'
import LandingFood from '../LandingFood'


const Landing = () => {

    return (
        <section className='landing' id='landing'>
            <div className='landing-banner'>
                <LandingHeader />
            </div>
            <LandingFood />
            <div className="floating-bg"></div>
        </section>
    )
}

export default Landing
