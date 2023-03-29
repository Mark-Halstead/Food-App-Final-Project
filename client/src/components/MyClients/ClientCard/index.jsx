import React from 'react'
import './styles.css'

function ClientCard({ client, handleClientClick }) {
    return (
        <div className='client-card' onClick={() => handleClientClick(client)}>
            <h4>{client.first_name} {client.last_name}</h4>
        </div>
    )
}

export default ClientCard