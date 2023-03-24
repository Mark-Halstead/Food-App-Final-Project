import React, { useEffect, useState } from 'react'

import { MealContainer, MoodMenu, StatContainer, DateChanger } from '../../components/FoodDiary'
import { SearchPopup } from '../../components';
import { calculateTotals } from '../../helpers/calculateStats';

function FoodDiary() {
    const currentDate = new Date();
    
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
    const [mealTotals, setMealTotals] = useState({ breakfast: {}, lunch: {}, dinner: {}, snacks: {} });
    const [showSearchPopup, setShowSearchPopup] = useState(false)
    const [meal, setMeal] = useState("")
    const [servingMultiplier, setServingMultiplier] = useState(1)

    const [allDiaryEntries, setAllDiaryEntries] = useState(null);
    const [mealItems, setMealItems] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showMoodMenu, setShowMoodMenu] = useState(false)
    useEffect(() => {
        setLoading(true)
        async function getDiaryEntry() {
            try {
                const response = await fetch(`http://127.0.0.1:5000/diary_entries?user_id=641d4e4340372146801382bb`)
                const data = await response.json()
                console.log('data', data)
                setAllDiaryEntries(data)

                const todaysDiaryEntry = data.find(entry => entry.date === selectedDate);
                console.log('todaysDiaryEntry', todaysDiaryEntry)
                setMealItems(todaysDiaryEntry)
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
            setMealItems(currentEntry)
        }
    }, [selectedDate])

    async function updateDiary(updateData) {
        console.log('mealItems', mealItems)
        try {
            const options = {
                method:"PUT",
                body:JSON.stringify(updateData)
            }
            const response = await fetch(`http://127.0.0.1:5000/diary_entries/${mealItems._id}`, 
                options
            )
            const data = await response.json()
            setMealItems(data)
            setLoading(false)
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

    const handleAddFood = async (selectedItem) => {
        const data = {serving_multiplier:servingMultiplier, ...selectedItem }
        try {
            const response = await axios.post(`http://127.0.0.1:5000/diary_entries/${props.mealItems._id}/foods/${props.meal}`, data);
            const updatedDiaryEntry = response.data;
            console.log('updatedDiaryEntry', updatedDiaryEntry)
            setMealItems(updatedDiaryEntry)
            onClose()
            
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
                {showSearchPopup && <SearchPopup onClose={onClose} handleAddFood={handleAddFood} meal={meal} servingMultiplier={servingMultiplier} setServingMultiplier={setServingMultiplier}/>}
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


