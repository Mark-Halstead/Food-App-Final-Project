import React, { useEffect, useState } from 'react'

import { MealContainer, MoodMenu, StatContainer, DateChanger } from '../../components/FoodDiary'

function FoodDiary() {
    const currentDate = new Date();
    
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
    const [mealTotals, setMealTotals] = useState({ breakfast: {}, lunch: {}, dinner: {}, snacks: {} });

    const [allDiaryEntries, setAllDiaryEntries] = useState(null);
    const [diaryEntry, setDiaryEntry] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showMoodMenu, setShowMoodMenu] = useState(false)
    useEffect(() => {
        setLoading(true)
        async function getDiaryEntry() {
            try {
                const response = await fetch(`http://127.0.0.1:5000/diary_entries?user_id=641c24093d388394c215d240`)
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

    const calculateMealTotals = (meal) => {
        let caloriesTotal = 0;
        let fatTotal = 0;
        let carbTotal = 0;
        let proteinTotal = 0;
      
        meal.forEach((item) => {
          if (item.confirmed) {
            caloriesTotal += item.product.calories * item.serving_size / 100;
            fatTotal += item.product.fat * item.serving_size / 100;
            carbTotal += item.product.carbohydrate * item.serving_size / 100;
            proteinTotal += item.product.protein * item.serving_size / 100;
          }
        });
      
        return {
          calories: caloriesTotal.toFixed(),
          fat: fatTotal.toFixed(1),
          carb: carbTotal.toFixed(1),
          protein: proteinTotal.toFixed(1),
        };
      };
      
      const calculateTotals = (diaryEntry) => {
        let totalCalories = 0;
        let totalFat = 0;
        let totalCarb = 0;
        let totalProtein = 0;
      
        const mealTotals = {};
        for (const meal of ["breakfast", "lunch", "dinner", "snacks"]) {
          const { calories, fat, carb, protein } = calculateMealTotals(diaryEntry[meal]);
          mealTotals[meal] = { calories, fat, carb, protein };
      
          totalCalories += parseFloat(calories);
          totalFat += parseFloat(fat);
          totalCarb += parseFloat(carb);
          totalProtein += parseFloat(protein);
        }
      
        return {
            totalCalories: totalCalories.toFixed(),
            totalFat: totalFat.toFixed(1),
            totalCarb: totalCarb.toFixed(1),
            totalProtein: totalProtein.toFixed(1),
            ... mealTotals
        };
      };
      

    useEffect(() => {
        if (diaryEntry) {
            const totals = calculateTotals(diaryEntry);
            setMealTotals(totals);
            console.log('totals', totals)
        }
    }, [diaryEntry]);

    return (
        <div>
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
            <MealContainer mealName={"breakfast"} diaryEntry={diaryEntry} setDiaryEntry={setDiaryEntry} totals={mealTotals}/>
            <MealContainer mealName={"lunch"} diaryEntry={diaryEntry} setDiaryEntry={setDiaryEntry} totals={mealTotals}/>
            <MealContainer mealName={"dinner"} diaryEntry={diaryEntry} setDiaryEntry={setDiaryEntry} totals={mealTotals}/>
            <MealContainer mealName={"snacks"} diaryEntry={diaryEntry} setDiaryEntry={setDiaryEntry} totals={mealTotals}/>
        </div>
    )
}

export default FoodDiary


