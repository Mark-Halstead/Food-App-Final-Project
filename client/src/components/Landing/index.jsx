import React from 'react'
import LandingHeader from '../LandingHeader'

const Landing = () => {
    return (
        <section className='landing' id='landing'>
            <div className='landing-banner'>
                <LandingHeader />
            </div>
            <div className="floating-bg"></div>
        </section>
    )
}

export default Landing
