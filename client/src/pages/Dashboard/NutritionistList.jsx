import React, { useState, useEffect } from "react";
import axios from "axios";

import '../../components/Nutritionists/styles.css'

import { NutritionistCard, NutritionistFilter, NutritionistProfile } from "../../components/Nutritionists";

function NutritionistList() {
    const [nutritionists, setNutritionists] = useState([]);
    const [filteredNutritionists, setFilteredNutritionists] = useState([]);
    const [credentialsFilter, setCredentialsFilter] = useState("");
    const [areaFilter, setAreaFilter] = useState("");
    const [selectedNutritionist, setSelectedNutritionist] = useState({});
    const [showProfilePopup, setShowProfilePopup] = useState(false);


    useEffect(() => {
        async function loadNutritionists() {
            const response = await axios.get("http://127.0.0.1:5000/nutritionists/")
            setNutritionists(response.data);
            setFilteredNutritionists(response.data.filter((nutritionist) => !nutritionist.top_pick));
        }

        loadNutritionists()
    }, []);

    useEffect(() => {
        const handleFilter = () => {
            let filtered = nutritionists.filter((nutritionist) => {
            if (
                nutritionist.credentials.toLowerCase().includes(credentialsFilter.toLowerCase()) &&
                nutritionist.area_of_expertise.toLowerCase().includes(areaFilter.toLowerCase())
            ) {
                return true;
            } else {
                return false;
            }
            });
            setFilteredNutritionists(filtered);
        };
        handleFilter()

    }, [credentialsFilter, areaFilter])

    const handleSendRequest = () => {
        
    }

    const handleClick = (nutritionist) => {
        setSelectedNutritionist(nutritionist);
        setShowProfilePopup(true);
    }
    
    const handleClosePopup = () => {
        setShowProfilePopup(false);
        setSelectedNutritionist({})
    }

    return (
        <div>
            {
                showProfilePopup && 
                    (<NutritionistProfile selectedNutritionist={selectedNutritionist} handleClosePopup={handleClosePopup} handleSendRequest={handleSendRequest}/>)
            }
            <h2>Nutritionists</h2>
            <h3>Top Picks</h3>
            <ul className="nutritionist-list">
                {nutritionists
                .filter((nutritionist) => nutritionist.top_pick)
                .map((nutritionist) => (
                    <li key={nutritionist._id}>
                        <NutritionistCard nutritionist={nutritionist} handleClick={handleClick}/>
                    </li>
                ))}
            </ul>
            <h3>All Nutritionists</h3>
            <NutritionistFilter credentialsFilter={credentialsFilter} setCredentialsFilter={setCredentialsFilter} areaFilter={areaFilter} setAreaFilter={setAreaFilter}/>
            <ul className="nutritionist-list">
                {filteredNutritionists.map((nutritionist) => (
                <li key={nutritionist._id}>
                    <NutritionistCard nutritionist={nutritionist} handleClick={handleClick} />
                </li>
                ))}
            </ul>
        </div>
    );
}

export default NutritionistList;