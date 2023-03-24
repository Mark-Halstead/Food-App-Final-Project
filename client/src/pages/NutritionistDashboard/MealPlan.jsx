import React, { useEffect, useState } from 'react'

import { MealContainer, StatContainer, DateChanger } from '../../components/FoodDiary'
import { SearchPopup } from '../../components';
import { calculateTotals } from '../../helpers/calculateStats';
import { createEmptyMealPlanObject } from '../../helpers/createEmptyMealPlan';
import { useParams } from 'react-router-dom';

function MealPlan() {
    const { clientId } = useParams()


    const user = {
        id:"641dd823de351e63199336ac"
    }
    
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
    const [mealTotals, setMealTotals] = useState({ breakfast: {}, lunch: {}, dinner: {}, snacks: {} });
    const [showSearchPopup, setShowSearchPopup] = useState(false)
    const [meal, setMeal] = useState("")
    const [client, setClient] = useState({})
    const [servingMultiplier, setServingMultiplier] = useState(1)

    const [allMealPlans, setAllMealPlans] = useState([]);
    const [mealPlanEntry, setMealPlanEntry] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
      
        async function getMealPlans() {
            try {
                // Add auth here to make sure nutritionist is allowed to edit client data
                const response = await fetch(`http://127.0.0.1:5000/meal_plan_entries/${clientId}`);
                if (response.status === 200) {
                    const data = await response.json();
            
                    if (data.length > 0) {
                        setAllMealPlans(data);
                        const todaysDiaryEntry = data.find((entry) => entry.date === selectedDate);
                        console.log('todaysDiaryEntry', todaysDiaryEntry);
                        setMealPlanEntry(todaysDiaryEntry);
                    } else {
                        const emptyMealPlan = createEmptyMealPlanObject()

                        setAllMealPlans([emptyMealPlan]);
                        setMealPlanEntry(emptyMealPlan);
                    }
                } else {
                    const emptyMealPlan = createEmptyMealPlanObject()

                    setAllMealPlans([emptyMealPlan]);
                    setMealPlanEntry(emptyMealPlan);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
      
        getMealPlans();
      }, []);
      

    useEffect(() => {
        if (!loading) {
            const currentEntry = allMealPlans.find(entry => entry.date === selectedDate);
            if (currentEntry) {
                setMealPlanEntry(currentEntry)
            } else {
                // if we do not find an entry for the selected day, use an empty object
                const emptyMealPlan = createEmptyMealPlanObject()
                emptyMealPlan.date = selectedDate
                setMealPlanEntry(emptyMealPlan)
                setAllMealPlans([... allMealPlans, emptyMealPlan])
            }
        }

    }, [selectedDate])

    useEffect(() => {
        if (mealPlanEntry) {
            const totals = calculateTotals(mealPlanEntry);
            setMealTotals(totals);
        }
    }, [mealPlanEntry]);

    async function completeDay() {
        try {
            // Add auth here to make sure nutritionist is allowed to edit client data (add Authorisation header)
            const options = {
                method:"POST",
                body:JSON.stringify(mealPlanEntry)
            }
            const response = await fetch(`http://127.0.0.1:5000/meal_plan_entries/${clientId}`, 
                options
            )
            const data = await response.json()
            setMealPlanEntry(data)
            setLoading(false)
        } catch (error) {
            setError(error)
            setLoading(false)
        }
    } 

    const handleFoodItemClick = () => {
        
    }

    const openSearchPopup = (meal) => {
        setMeal(meal)
        setShowSearchPopup(true)
    }

    useEffect(() => {
        if (mealPlanEntry) {
            const totals = calculateTotals(mealPlanEntry);
            setMealTotals(totals);
        }
    }, [mealPlanEntry]);

    const handleDeleteFood = async (meal, productId) => {
        const updatedMealPlanEntry = mealPlanEntry[meal].filter(p => p.product.id !== productId) 
        
        const updatedAllMealPlans = allMealPlans.map((mealPlan) => {
            if (mealPlan.date == mealPlanEntry.date) {
                return updatedMealPlanEntry
            } else {
                return mealPlan
            }
        });
        
        setMealPlanEntry(updatedMealPlanEntry);
        setAllMealPlans(updatedAllMealPlans);

    }


    const handleAddFood = async (selectedItem) => {
        if (!mealPlanEntry) { return }
      
        const data = {
          serving_multiplier: servingMultiplier, 
          user_serving_size: servingMultiplier * selectedItem.serving_quantity,
          product: selectedItem 
        };
      
        try {
          const updatedMealItems = { ...mealPlanEntry };
          updatedMealItems[meal] = [...mealPlanEntry[meal], data];
          console.log('updatedMealItems', updatedMealItems);
      
          const updatedAllMealPlans = allMealPlans.map((mealPlan) => {
                if (mealPlan.date == mealPlanEntry.date) {
                    return updatedMealItems
                } else {
                    return mealPlan
                }
          });
      
          setMealPlanEntry(updatedMealItems);
          setAllMealPlans(updatedAllMealPlans);
          onClose();
        } catch (error) {
          console.error(error);
        }
      };

    const onClose = () => {
        setShowSearchPopup(false)
    }


    return (
        <div>
            <div>
                {showSearchPopup && <SearchPopup onClose={onClose} handleAddFood={handleAddFood} meal={meal} servingMultiplier={servingMultiplier} setServingMultiplier={setServingMultiplier}/>}
            </div>
            <h2>Client: Richard Swainson</h2>
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
                    <h3>Day Complete</h3>
                    <button
                        onClick={completeDay}
                    >&#10004;</button>
                </div>

            </div>
            <MealContainer mealName={"breakfast"} mealItems={mealPlanEntry} setMealItems={setMealPlanEntry} totals={mealTotals} openSearchPopup={openSearchPopup} handleDeleteFood={handleDeleteFood}/>
            <MealContainer mealName={"lunch"} mealItems={mealPlanEntry} setMealItems={setMealPlanEntry} totals={mealTotals} openSearchPopup={openSearchPopup} handleDeleteFood={handleDeleteFood}/>
            <MealContainer mealName={"dinner"} mealItems={mealPlanEntry} setMealItems={setMealPlanEntry} totals={mealTotals} openSearchPopup={openSearchPopup} handleDeleteFood={handleDeleteFood}/>
            <MealContainer mealName={"snacks"} mealItems={mealPlanEntry} setMealItems={setMealPlanEntry} totals={mealTotals} openSearchPopup={openSearchPopup} handleDeleteFood={handleDeleteFood}/>
        </div>
    )
}

export default MealPlan


