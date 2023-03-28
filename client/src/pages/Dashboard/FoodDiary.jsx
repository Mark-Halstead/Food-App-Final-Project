import React, { useEffect, useState } from 'react'
import axios from 'axios';

import { MealContainer, MoodMenu, StatContainer, DateChanger } from '../../components/FoodDiary'
import { SearchPopup } from '../../components';
import { calculateTotals } from '../../helpers/calculateStats';
import { createEmptyDiaryEntryObject } from '../../helpers/createEmptyObjects';

function FoodDiary() {
    const currentDate = new Date();
    
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
    const [mealTotals, setMealTotals] = useState({ breakfast: {}, lunch: {}, dinner: {}, snacks: {} });
    const [showSearchPopup, setShowSearchPopup] = useState(false)
    const [meal, setMeal] = useState("")
    const [servingMultiplier, setServingMultiplier] = useState(1)
    const [loadingAddingFood, setLoadingAddingFood] = useState(false)

    const [allDiaryEntries, setAllDiaryEntries] = useState(null);
    const [mealItems, setMealItems] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showMoodMenu, setShowMoodMenu] = useState(false)
    useEffect(() => {
        setLoading(true)
        async function getDiaryEntry() {
            try {
                const token = localStorage.getItem('token')
                const options = {
                    headers: {
                        Authorization:token
                    }
                }
                const response = await fetch(`http://127.0.0.1:5000/diary_entries/`, options)
                if (response.status === 200) {
                    const data = await response.json()
                    setAllDiaryEntries(data)
                    const todaysDiaryEntry = data.find(entry => entry.date === selectedDate);
                    setMealItems(todaysDiaryEntry)
                } else if (response.status === 404) {
                    const emptyDiaryEntry = createEmptyDiaryEntryObject(selectedDate, "")
                    setMealItems(emptyDiaryEntry)
                    setAllDiaryEntries([emptyDiaryEntry])

                }
                setLoading(false)
            } catch (error) {
                setError(error)
                setLoading(false)
            }
        } 
        getDiaryEntry()

    }, [])

    useEffect(() => {
        if (allDiaryEntries) {
            const currentEntry = allDiaryEntries.find(entry => entry.date === selectedDate);

            const entry = currentEntry ? currentEntry : createEmptyDiaryEntryObject(selectedDate, "")
            setMealItems(entry)

        } 
    }, [selectedDate])

    async function updateDiary(updateData) {
        console.log('mealItems', mealItems)
        try {
            const token = localStorage.getItem('token')
            const options = {
                method:"PUT",
                body:JSON.stringify(updateData),
                headers: {
                    Authorization:token
                }

            }
            const response = await fetch(`http://127.0.0.1:5000/diary_entries/${selectedDate}`, 
                options
            )
            const updatedDiaryEntry = await response.json()
            
            let updatedAllDiaryEntries
            if (allDiaryEntries.some(entry => entry.date === selectedDate)){
                updatedAllDiaryEntries = allDiaryEntries.map(entry => {
                    if (entry.date === selectedDate) return updatedDiaryEntry
                    else return entry
                } )
            } else {
                updatedAllDiaryEntries = [...allDiaryEntries, updatedDiaryEntry]
            }
            setMealItems(updatedDiaryEntry)
            setAllDiaryEntries(updatedAllDiaryEntries)
            setLoading(false)
            onClose()
        } catch (error) {
            setError(error)
            setLoading(false)
        }
    }

    const handleMoodClick = async (mood) => {
        // add function to update mood on backend
        updateDiary({mood})
        setShowMoodMenu(false)
    }      

    const handleFoodItemClick = () => {

    }

    const openSearchPopup = (meal) => {
        setMeal(meal)
        setShowSearchPopup(true)
    }

    useEffect(() => {
        if (mealItems) {
            const totals = calculateTotals(mealItems);
            setMealTotals(totals);
        }
    }, [mealItems]);

    const handleAddFood = async (meal, selectedItem) => {
        const data = {serving_multiplier:servingMultiplier, ...selectedItem }
        try {
            setLoadingAddingFood(true)
            const token = localStorage.getItem("token")
            const response = await axios.post(`http://127.0.0.1:5000/diary_entries/${selectedDate}/foods/${meal}`, data, {
                headers:{
                    Authorization:token
                }
            });
            const updatedDiaryEntry = response.data;
            
            const updatedAllDiaryEntries = allDiaryEntries.map(entry => {
                if (entry.date === selectedDate) return updatedDiaryEntry
                else return entry
            } )
            setMealItems(updatedDiaryEntry)
            setAllDiaryEntries(updatedAllDiaryEntries)
            onClose()
            setLoadingAddingFood(false)
            
          } catch (error) {
            console.error(error);
          }
    }

    async function handleDeleteFood(meal, productId) {
        try {
            const response = await fetch(`http://127.0.0.1:5000/diary_entries/${mealItems._id}/foods/${meal}/${productId}`,
                {method:"DELETE"}
            )
            const data = await response.json()
            setMealItems(data)
        } catch (error) {
        }
    }

    const onClose = () => {
        setShowSearchPopup(false)
    }

    return (
        <div>
            <div>
                {showSearchPopup && <SearchPopup onClose={onClose} handleAddFood={handleAddFood} meal={meal} servingMultiplier={servingMultiplier} setServingMultiplier={setServingMultiplier} loadingAddingFood={loadingAddingFood}/>}
            </div>
            <div className='diary-header'>
                <div className='diary-header-left'>
                    <StatContainer title={"Target (kcal)"} value={"2500"}/>
                    {
                        mealTotals &&
                            <StatContainer title={"Total (kcal)"} value={mealTotals.totalCalories}/>
                    }
                </div>
                <DateChanger selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                <div>
                    {
                        mealItems && 
                        <MoodMenu mood={mealItems.mood} handleMoodClick={handleMoodClick} showMoodMenu={showMoodMenu} setShowMoodMenu={setShowMoodMenu}/>
                    }
                </div>

            </div>
            <MealContainer mealName={"breakfast"} mealItems={mealItems} setMealItems={setMealItems} totals={mealTotals} openSearchPopup={openSearchPopup} handleDeleteFood={handleDeleteFood}/>
            <MealContainer mealName={"lunch"} mealItems={mealItems} setMealItems={setMealItems} totals={mealTotals} openSearchPopup={openSearchPopup} handleDeleteFood={handleDeleteFood}/>
            <MealContainer mealName={"dinner"} mealItems={mealItems} setMealItems={setMealItems} totals={mealTotals} openSearchPopup={openSearchPopup} handleDeleteFood={handleDeleteFood}/>
            <MealContainer mealName={"snacks"} mealItems={mealItems} setMealItems={setMealItems} totals={mealTotals} openSearchPopup={openSearchPopup} handleDeleteFood={handleDeleteFood}/>
        </div>
    )
}

export default FoodDiary


