import React from 'react'

const Landinglogo = ({ title, subTitle }) => {
  return (
    <div className='section-title' id="landing-logo">
      <h2>
        {title} <span>{subTitle}</span>
      </h2>
    </div>
  )
}

export default Landinglogo
