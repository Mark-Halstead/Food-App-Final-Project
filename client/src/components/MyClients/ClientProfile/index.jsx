import React, { useState } from 'react';
import './styles.css';

import ClientProfileItem from '../ClientProfileItem';

function ClientProfile({ selectedClient, handleClosePopup, handleCreateMealPlan, clients, setClients, pendingClients, setPendingClients }) {
    const [clientAccepted, setClientAccepted] = useState(false) 
    const [clientDeclined, setClientDeclined] = useState(false) 
    const [sending, setSending] = useState(false)
    const [sent, setSent] = useState(false)
    const getBudgetIcons = (budget) => {
        return [...Array(parseInt(budget))].map((x, i) => (
            <i key={i} className="fa-solid fa-dollar-sign"></i>
        ))
    }

    const acceptClient = async (client) => {
        const token = localStorage.token;
        const options = {
            method:"PUT",
            headers:{
                Authorization:token
            }
        };
        const response = await fetch(`https://plate-perfect-server.onrender.com/nutritionists/accept_client/${client._id}`, options);
        if (response.status === 200) {
            const updatedClient = await response.json()
            // Remove the client from pendingClients
            const newPendingClients = pendingClients.filter(c => c._id !== client._id);
            setPendingClients(newPendingClients);
            // Add the client to clients
            const newClients = [...clients, updatedClient];
            setClients(newClients);
            setClientAccepted(true);
        }
    };

    const declineClient = async (client) => {
        const token = localStorage.token;
        const options = {
            method: "PUT",
            headers: {
                Authorization: token,
            },
        };
        const response = await fetch(
            `https://plate-perfect-server.onrender.com/nutritionists/decline_client/${client._id}`,
            options
        );
        if (response.status === 200) {
            // Remove the client from pendingClients
            const newPendingClients = pendingClients.filter(
                (c) => c._id !== client._id
            );
            setPendingClients(newPendingClients);
            setClientDeclined(true);
        }
    };

    const sendMealPlan = async (client) => {
        setSending(true)
        const token = localStorage.token;
        const options = {
            method: "PUT",
            headers: {
                Authorization: token,
            },
        };
        const response = await fetch(
            `https://plate-perfect-server.onrender.com/nutritionists/send_meal_plan/${client._id}`,
            options
        );
        if (response.status === 200) {
            
        }
        setSent(true)
        setSending(false)
    }
      
    

    return (
        <div className="popup-background">
            <div className="popup">
                <div>
                    <button className='popup-close-button' onClick={handleClosePopup}>&#215;</button>
                </div>
                <div className="popup-header">
                    <h4><i className="fa-solid fa-user"></i> {selectedClient.first_name} {selectedClient.last_name}</h4>
                    </div>
                    <div className="popup-content">
                    <div className={`popup-left`}>
                        {selectedClient.age && <ClientProfileItem label="Age" value={selectedClient.age} />}
                        {selectedClient.height && <ClientProfileItem label="Height" value={`${parseFloat(selectedClient.height).toFixed(1)} cm`} icon="fa-solid fa-ruler-vertical" />}
                        {selectedClient.weight && <ClientProfileItem label="Weight" value={`${parseFloat(selectedClient.weight).toFixed(1)} kg`} icon="fa-solid fa-weight" />}
                        {selectedClient.meal_complexity && <ClientProfileItem label="Meal Complexity" value={selectedClient.meal_complexity} icon="fa-solid fa-utensils" />}
                        {selectedClient.food_preferences && <ClientProfileItem label="Food Preferences" value={selectedClient.food_preferences} icon="fa-solid fa-tree" />}
                        {selectedClient.budget && <ClientProfileItem label="Budget" value={getBudgetIcons(selectedClient.budget)} icon="fa-solid fa-dollar-sign" />}
                        {selectedClient.goal && <ClientProfileItem label="Goal" value={selectedClient.goal} icon="fa-solid fa-tree" />}
                        {selectedClient.activity_level && <ClientProfileItem label="Activity Level" value={selectedClient.activity_level} icon="fa-solid fa-shoe-prints" />}
                        {selectedClient.daily_calorie_target && <ClientProfileItem label="Daily Calorie Target" value={selectedClient.daily_calorie_target.toFixed()} />}
                    </div>
                    <div className="">
                        {
                            selectedClient.nutritionist_pending ? (
                                clientAccepted ? (
                                <>
                                    <h4>Client Accepted &#x2713;</h4>
                                    <p>The client has been added to your clients.</p>
                                </> 
                                ) : clientDeclined ? (
                                    <>
                                        <h4>Client Declined &#x2713;</h4>
                                        <p>The client has been declined.</p>
                                    </> 
                                    ) : (
                                        <>
                                            <h4>Message from client</h4>
                                            <p>
                                                {selectedClient.nutritionist_message}
                                            </p>
                                            <button className='btn' onClick={() => acceptClient(selectedClient)}>Accept Client</button>
                                            <button className='btn' onClick={() => declineClient(selectedClient)}>Decline Client</button>
                                        </>

                                    )
                            ) :
                                <>
                                    <button className='btn btn-reverse' onClick={() => handleCreateMealPlan(selectedClient)}>View/Edit Meal Plan</button>
                                    {
                                        sent ? <button className='btn'>Meal Plan Sent!</button>
                                            : sending ? <button className='btn'>Sending Meal Plan...</button>
                                                : <button className='btn' onClick={() => sendMealPlan(selectedClient)}>Send Meal Plan</button>
                                    }
                                    
                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClientProfile;
