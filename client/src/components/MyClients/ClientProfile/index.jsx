import React, { useState } from 'react';
import './styles.css';

import ClientProfileItem from '../ClientProfileItem';

function ClientProfile({ selectedClient, handleClosePopup, handleCreateMealPlan, clients, setClients, pendingClients, setPendingClients }) {
    const [clientAccepted, setClientAccepted] = useState(false) 
    const [clientDeclined, setClientDeclined] = useState(false) 
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
        const response = await fetch(`http://127.0.0.1:5000/nutritionists/accept_client/${client._id}`, options);
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
            `http://127.0.0.1:5000/nutritionists/decline_client/${client._id}`,
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
      
    

    return (
        <div className="popup-background">
            <div className="popup">
                <div className="popup-header">
                    <h4><i className="fa-solid fa-user"></i> {selectedClient.first_name} {selectedClient.last_name}</h4>
                        <button className="close-button" onClick={handleClosePopup}>X</button>
                    </div>
                    <div className="popup-content">
                    <div className={`popup-left`}>
                        <ClientProfileItem label="Age" value={selectedClient.age} />
                        <ClientProfileItem label="Height" value={`${selectedClient.height.toFixed(1)} cm`} icon="fa-solid fa-ruler-vertical" />
                        <ClientProfileItem label="Weight" value={`${selectedClient.weight.toFixed(1)} kg`} icon="fa-solid fa-weight" />
                        <ClientProfileItem label="Meal Complexity" value={selectedClient.meal_complexity} icon="fa-solid fa-utensils" />
                        <ClientProfileItem label="Food Preferences" value={selectedClient.food_preferences.join(", ")} icon="fa-solid fa-tree" />
                        <ClientProfileItem label="Budget" value={getBudgetIcons(selectedClient.budget)} icon="fa-solid fa-dollar-sign" />
                        <ClientProfileItem label="Goal" value={selectedClient.goal} icon="fa-solid fa-tree" />
                        <ClientProfileItem label="Activity Level" value={selectedClient.activity_level} icon="fa-solid fa-shoe-prints" />
                        <ClientProfileItem label="Daily Calorie Target" value={selectedClient.daily_calorie_target.toFixed()} />
                    </div>
                    <div className="popup-right">
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
                                            <button onClick={() => acceptClient(selectedClient)}>Accept Client</button>
                                            <button onClick={() => declineClient(selectedClient)}>Decline Client</button>
                                        </>

                                    )
                            ) :
                                <button onClick={() => handleCreateMealPlan(selectedClient)}>View Meal Plan</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClientProfile;
