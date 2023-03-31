import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import { MealContainer, MoodMenu, StatContainer, DateChanger } from '../../components/FoodDiary'
import { SearchPopup, Loader } from '../../components';
import { calculateCombinedTotals } from '../../helpers/calculateStats';
import { createEmptyDiaryEntryObject } from '../../helpers/createEmptyObjects';


function FoodDiary() {
    const currentDate = new Date();
    
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
    const [mealTotals, setMealTotals] = useState({ breakfast: {}, lunch: {}, dinner: {}, snacks: {} });
    const [showSearchPopup, setShowSearchPopup] = useState(false)
    const [meal, setMeal] = useState("")
    const [servingMultiplier, setServingMultiplier] = useState(1)
    const [loadingAddingFood, setLoadingAddingFood] = useState(false)
    const [mealPlan, setMealPlan] = useState(null);

    const [allDiaryEntries, setAllDiaryEntries] = useState(null);
    const [currentDiaryEntry, setCurrentDiaryEntry] = useState(null);
    const [currentMealPlanEntry, setCurrentMealPlanEntry] = useState(null);
    const [loading, setLoading] = useState(true);
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
                const response = await fetch(`https://plate-perfect.onrender.com/diary_entries/`, options)
                if (response.status === 200) {
                    const { diary_entries, meal_plan } = await response.json()
                    console.log('diary_entries', diary_entries)
                    console.log('meal_plan', meal_plan)
                    setAllDiaryEntries(diary_entries)
                    setMealPlan(meal_plan)
                    const currentDiaryEntry = diary_entries.find(entry => entry.date === selectedDate);
                    const currentMealPlanEntry = meal_plan.find(entry => entry.date === selectedDate);
                    setCurrentDiaryEntry(currentDiaryEntry)
                    setCurrentMealPlanEntry(currentMealPlanEntry)
                } else if (response.status === 404) {
                    const emptyDiaryEntry = createEmptyDiaryEntryObject(selectedDate, "")
                    setCurrentDiaryEntry(emptyDiaryEntry)
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
            const currentMealPlan = mealPlan.find(entry => entry.date === selectedDate);

            const entry = currentEntry ? currentEntry : createEmptyDiaryEntryObject(selectedDate, "")
            setCurrentDiaryEntry(entry)
            setCurrentMealPlanEntry(currentMealPlan)
            setShowMoodMenu(false)

        } 
    }, [selectedDate])

    async function updateDiary(updateData) {
        try {
            const token = localStorage.getItem('token')
            const options = {
                method:"PUT",
                body:JSON.stringify(updateData),
                headers: {
                    Authorization:token
                }

            }
            const response = await fetch(`https://plate-perfect.onrender.com/diary_entries/${selectedDate}`, 
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
            setCurrentDiaryEntry(updatedDiaryEntry)
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
        if (currentDiaryEntry && currentMealPlanEntry) {
            const combinedTotals = calculateCombinedTotals(currentDiaryEntry, currentMealPlanEntry)
            
            setMealTotals(combinedTotals);
        }
    }, [currentDiaryEntry, currentMealPlanEntry]);

    const handleAddFood = async (meal, selectedItem) => {
        const data = {serving_multiplier:servingMultiplier, ...selectedItem }
        try {
            setLoadingAddingFood(true)
            const response = await axios.post(`https://plate-perfect.onrender.com/diary_entries/${selectedDate}/foods/${meal}`, data, {
                headers:{
                    Authorization:localStorage.token
                }
            });
            const updatedDiaryEntry = response.data;
            
            const updatedAllDiaryEntries = allDiaryEntries.map(entry => {
                if (entry.date === selectedDate) return updatedDiaryEntry
                else return entry
            } )
            setCurrentDiaryEntry(updatedDiaryEntry)
            setAllDiaryEntries(updatedAllDiaryEntries)
            onClose()
            
        } catch (error) {
            console.error(error);
        }
        setLoadingAddingFood(false)
    }

    async function handleDeleteFood(meal, productId) {
        try {
            const response = await fetch(`https://plate-perfect.onrender.com/diary_entries/${currentDiaryEntry._id}/foods/${meal}/${productId}`,
                {method:"DELETE"}
            )
            const data = await response.json()
            setCurrentDiaryEntry(data)
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
                        currentDiaryEntry && 
                        <MoodMenu mood={currentDiaryEntry.mood} handleMoodClick={handleMoodClick} showMoodMenu={showMoodMenu} setShowMoodMenu={setShowMoodMenu}/>
                    }
                </div>

            </div>
            {
                loading ? 
                    <>
                        <Loader />
                    </>
                    // <h3 className='food-diary-loading'>Loading Food Diary...</h3>
                    :
                    <>
                        <MealContainer mealName={"breakfast"} mealItems={currentDiaryEntry} setMealItems={setCurrentDiaryEntry} mealPlanItems={currentMealPlanEntry} setMealPlanItems={setCurrentMealPlanEntry} totals={mealTotals} openSearchPopup={openSearchPopup} handleDeleteFood={handleDeleteFood}/>
                        <MealContainer mealName={"lunch"} mealItems={currentDiaryEntry} setMealItems={setCurrentDiaryEntry} mealPlanItems={currentMealPlanEntry} setMealPlanItems={setCurrentMealPlanEntry} totals={mealTotals} openSearchPopup={openSearchPopup} handleDeleteFood={handleDeleteFood}/>
                        <MealContainer mealName={"dinner"} mealItems={currentDiaryEntry} setMealItems={setCurrentDiaryEntry} mealPlanItems={currentMealPlanEntry} setMealPlanItems={setCurrentMealPlanEntry} totals={mealTotals} openSearchPopup={openSearchPopup} handleDeleteFood={handleDeleteFood}/>
                        <MealContainer mealName={"snacks"} mealItems={currentDiaryEntry} setMealItems={setCurrentDiaryEntry} mealPlanItems={currentMealPlanEntry} setMealPlanItems={setCurrentMealPlanEntry} totals={mealTotals} openSearchPopup={openSearchPopup} handleDeleteFood={handleDeleteFood}/>
                    </>

            }
        </div>
    )
}

export default FoodDiary


