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

    const [allDiaryEntries, setAllDiaryEntries] = useState(null);
    const [diaryEntry, setDiaryEntry] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showMoodMenu, setShowMoodMenu] = useState(false)
    useEffect(() => {
        setLoading(true)
        async function getDiaryEntry() {
            try {
                const response = await fetch(`http://127.0.0.1:5000/diary_entries?user_id=641c910f2df7c4cef1c96255`)
                const data = await response.json()
                console.log('data', data)
                setAllDiaryEntries(data)

                const todaysDiaryEntry = data.find(entry => entry.date === selectedDate);
                console.log('todaysDiaryEntry', todaysDiaryEntry)
                setDiaryEntry(todaysDiaryEntry)
                setLoading(false)
            } catch (error) {
                setError(error)
                setLoading(false)
            }
        } 
        getDiaryEntry()

    }, [selectedDate])

    async function updateDiary(updateData) {
        console.log('diaryEntry', diaryEntry)
        try {
            const options = {
                method:"PUT",
                body:JSON.stringify(updateData)
            }
            const response = await fetch(`http://127.0.0.1:5000/diary_entries/${diaryEntry._id}`, 
                options
            )
            const data = await response.json()
            setDiaryEntry(data)
            setLoading(false)
        } catch (error) {
            setError(error)
            setLoading(false)
        }
    }

    const handleMoodClick = async (mood) => {
        // add function to update mood on backend
        updateDiary({mood})
        console.log('mood', mood)
        setShowMoodMenu(false)
    }      

    const openSearchPopup = (meal) => {
        setMeal(meal)
        setShowSearchPopup(true)

    }

    useEffect(() => {
        if (diaryEntry) {
            const totals = calculateTotals(diaryEntry);
            setMealTotals(totals);
        }
    }, [diaryEntry]);

    const handleAddFood = () => {
    }

    return (
        <div>
            <div>
                <button onClick={openSearchPopup}>Search for food</button>
                {showSearchPopup && <SearchPopup onClose={() => setShowSearchPopup(false)} onAddFood={handleAddFood} meal={meal} diaryEntry={diaryEntry}/>}
            </div>
            <div className='diary-header'>
                <div className='diary-header-left'>
                    <StatContainer title={"Target (kcal)"} value={"2500"}/>
                    {
                        mealTotals &&
                            <StatContainer title={"Current (kcal)"} value={mealTotals.totalCalories}/>
                    }
                </div>
                <DateChanger selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                <div>

                    {
                        diaryEntry && 
                        <MoodMenu mood={diaryEntry.mood} handleMoodClick={handleMoodClick} showMoodMenu={showMoodMenu} setShowMoodMenu={setShowMoodMenu}/>
                    }
                </div>

            </div>
            <MealContainer mealName={"breakfast"} diaryEntry={diaryEntry} setDiaryEntry={setDiaryEntry} totals={mealTotals} openSearchPopup={openSearchPopup}/>
            <MealContainer mealName={"lunch"} diaryEntry={diaryEntry} setDiaryEntry={setDiaryEntry} totals={mealTotals} openSearchPopup={openSearchPopup}/>
            <MealContainer mealName={"dinner"} diaryEntry={diaryEntry} setDiaryEntry={setDiaryEntry} totals={mealTotals} openSearchPopup={openSearchPopup}/>
            <MealContainer mealName={"snacks"} diaryEntry={diaryEntry} setDiaryEntry={setDiaryEntry} totals={mealTotals} openSearchPopup={openSearchPopup}/>
        </div>
    )
}

export default FoodDiary


