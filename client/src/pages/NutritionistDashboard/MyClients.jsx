import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import '../../components/MyClients/styles.css'

import { ClientCard, ClientProfile, ClientFilters } from "../../components/MyClients";
import { ClientContext } from '../../contexts/ClientContext';

function MyClients() {
    const { clients, setClients, pendingClients, setPendingClients, selectedClient, setSelectedClient, clientsLoaded, setClientsLoaded } = useContext(ClientContext);
    const [loading, setLoading] = useState(false);
    const [showMyClients, setShowMyClients] = useState(true);
    const [showPendingClients, setShowPendingClients] = useState(true);
    const [showProfilePopup, setShowProfilePopup] = useState(false);
    const [goalsFilter, setGoalsFilter] = useState("");
    const [activityLevelsFilter, setActivityLevelsFilter] = useState("");
    const [dietaryRestrictionsFilter, setDietaryRestrictionsFilter] = useState("");
    const [foodPreferencesFilter, setFoodPreferencesFilter] = useState("");

    const navigate = useNavigate()
    const { pathname } = useLocation()

    useEffect(() => {
        async function loadClients() {
            setLoading(true)
            const response = await axios.get("http://127.0.0.1:5000/nutritionists/clients", {
                headers:{
                Authorization:localStorage.token
                }
            });
            if (response.status == 200) {
                const currentClients = response.data.filter(client => !client.nutritionist_pending)
                const allPendingClients = response.data.filter(client => client.nutritionist_pending)
                setClients(currentClients);
                setPendingClients(allPendingClients);
            } else {
                setClients([]);
                setPendingClients([]);
            }
            setLoading(false)
            setClientsLoaded(true)
        }

        if (!clientsLoaded) {
            loadClients();
        }
    }, []);

    const toggleMyClients = () => {
        setShowMyClients(!showMyClients);
        console.log(clients)
    }

    const togglePendingClients = () => {
        setShowPendingClients(!showPendingClients);
    }

    const handleClientClick = (client) => {
        setSelectedClient(client)
        setShowProfilePopup(true)
    }

    const handleClosePopup = () => {
        setShowProfilePopup(false);
        setSelectedClient({})
    }

    const handleCreateMealPlan = () => {
        const basePath = pathname.split('/nutritionist-dashboard')[0];
        navigate(`${basePath}/nutritionist-dashboard/meal-plan`);
    }

    const filteredClients = clients.filter(client => {
        if (goalsFilter && client.goal !== goalsFilter) {
            return false;
        }
        if (activityLevelsFilter && client.activity_level !== activityLevelsFilter) {
            return false;
        }
        if (dietaryRestrictionsFilter && !client.dietary_restrictions.includes(dietaryRestrictionsFilter)) {
            return false;
        }
        if (foodPreferencesFilter && !client.food_preferences.includes(foodPreferencesFilter)) {
            return false;
        }
        return true;
    });

    if (loading) {
        return <h4>Loading clients...</h4>
    }

    return (
        <div className="my-clients">
            {
                showProfilePopup && 
                    (<ClientProfile selectedClient={selectedClient} handleClosePopup={handleClosePopup} handleCreateMealPlan={handleCreateMealPlan} clients={clients} setClients={setClients} pendingClients={pendingClients} setPendingClients={setPendingClients} />)
            }
            <div className="my-clients-header" onClick={toggleMyClients}>
                <h2>My Clients <i className={showMyClients ? "fa fa-chevron-down" : "fa fa-chevron-right"}></i></h2>
            </div>
            <div>
                <ClientFilters 
                    goalsFilter = {goalsFilter}
                    setGoalsFilter = {setGoalsFilter}
                    activityLevelsFilter = {activityLevelsFilter}
                    setActivityLevelsFilter = {setActivityLevelsFilter}
                    dietaryRestrictionsFilter = {dietaryRestrictionsFilter}
                    setDietaryRestrictionsFilter = {setDietaryRestrictionsFilter}
                    foodPreferencesFilter = {foodPreferencesFilter}
                    setFoodPreferencesFilter = {setFoodPreferencesFilter} 
                />
            </div>
            {   showMyClients &&
                    <ul className="client-list">
                        {filteredClients.map((client) => (
                        <li key={client._id}>
                        <ClientCard client={client} handleClientClick={handleClientClick}/>
                        </li>
                        ))}
                    </ul>
            }
            <div className="pending-clients-header" onClick={togglePendingClients}>
                <h2>Pending Clients <i className={showPendingClients ? "fa fa-chevron-down" : "fa fa-chevron-right"}></i></h2>
            </div>
            {showPendingClients && 
                <ul className="client-list">
                {pendingClients.map((client) => (
                    <li key={client._id}>
                        <ClientCard client={client} handleClientClick={handleClientClick}/>
                    </li>
                ))}
            </ul>
        }
    </div>
)};

export default MyClients;