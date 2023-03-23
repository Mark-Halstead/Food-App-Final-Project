import React from 'react'

import './styles.css'

function StatContainer({ title, value }) {
    return (
        <div className='stat-container'>
            <div className='key-container'>{title}</div>
            <div className='value-container'>{value}</div>
        </div>
  )
}

export default StatContainer