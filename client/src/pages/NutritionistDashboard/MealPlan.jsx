import React, { useEffect, useState, useContext } from 'react'
import Calendar from 'react-calendar'

import { StatContainer, DateChanger } from '../../components/FoodDiary'
import { MealContainer } from '../../components/MealPlan'
import { SearchPopup, Loader } from '../../components';

import { calculateTotals } from '../../helpers/calculateStats';
import { createEmptyMealPlanObject } from '../../helpers/createEmptyObjects';
import { ClientContext } from '../../contexts/ClientContext';
import { useNavigate } from 'react-router-dom';

function MealPlan() {
    const { selectedClient } = useContext(ClientContext);

    const navigate = useNavigate()
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const [selectedDate, setSelectedDate] = useState(tomorrow.toISOString().slice(0, 10));
    const [calendarMode, setCalendarMode] = useState(true)
    const [mealTotals, setMealTotals] = useState({ breakfast: {}, lunch: {}, dinner: {}, snacks: {} });
    const [showSearchPopup, setShowSearchPopup] = useState(false)
    const [meal, setMeal] = useState("")
    const [client, setClient] = useState({})
    const [servingMultiplier, setServingMultiplier] = useState(1)
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)

    const [allMealPlans, setAllMealPlans] = useState([]);
    const [mealPlanEntry, setMealPlanEntry] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [date, setDate] = useState(new Date());

    const handleDateChange = (newDate) => {
      setDate(newDate);
    }


    useEffect(() => {
        setLoading(true);
      
        async function getMealPlans() {
            setLoading(true)
            try {
                // Add auth here to make sure nutritionist is allowed to edit client data
                const options = {
                    headers:{
                        Authorization:localStorage.token
                    }
                }
                const response = await fetch(`http://127.0.0.1:5000/meal_plan_entries/${selectedClient._id}`, options);
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
                setLoading(false)
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

    async function saveMealPlan() {
        try {
            // Add auth here to make sure nutritionist is allowed to edit client data (add Authorisation header)
            setSaving(true)
            const options = {
                method:"PUT",
                body:JSON.stringify(allMealPlans),
                headers:{
                    Authorization:localStorage.token
                }
            }
            const response = await fetch(`http://127.0.0.1:5000/meal_plan_entries/${selectedClient._id}`, 
                options
            )
            if (response.status === 200) {
                const data = await response.json()
                setAllMealPlans(data);
                const todaysDiaryEntry = data.find((entry) => entry.date === selectedDate);
                setMealPlanEntry(todaysDiaryEntry);
            }
            setSaved(true)
            setSaving(false)
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


    const handleAddFood = async (meal, selectedItem) => {
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

    // if (calendarMode) {
    //     return 
    // }


    return (
        <div>
            <div>
                {showSearchPopup && <SearchPopup onClose={onClose} handleAddFood={handleAddFood} meal={meal} servingMultiplier={servingMultiplier} setServingMultiplier={setServingMultiplier}/>}
            </div>
            <div className='back-button-container'>
                <button
                    className='btn'
                    onClick={() => navigate(-1)}
                
                >Back</button>
            </div>
            <h2>Client: {selectedClient.first_name} {selectedClient.last_name}</h2>
            <div className='diary-header'>
                <div className='diary-header-left'>
                    <StatContainer title={"Target (kcal)"} value={"2500"}/>
                    {
                        mealTotals &&
                            <StatContainer title={"Total (kcal)"} value={mealTotals.totalCalories}/>
                    }
                </div>
                <DateChanger selectedDate={selectedDate} setSelectedDate={setSelectedDate} mealPlan={true}/>
                <div>
                    {
                        saved ? 
                            <h3>Saved.</h3>
                        :
                        saving ? 
                            <h3>Saving...</h3>
                        :
                        <h3
                            onClick={saveMealPlan}
                            role="button"
                            className='icon-btn'
                        >Save <i 
                            className="fa-solid fa-download"
                            
                        ></i></h3>
                    }
                    
                </div>

            </div>
            {
                loading ? 
                    <Loader />
                :
                <>
                    <MealContainer mealName={"breakfast"} mealItems={mealPlanEntry} setMealItems={setMealPlanEntry} totals={mealTotals} openSearchPopup={openSearchPopup} handleDeleteFood={handleDeleteFood}/>
                    <MealContainer mealName={"lunch"} mealItems={mealPlanEntry} setMealItems={setMealPlanEntry} totals={mealTotals} openSearchPopup={openSearchPopup} handleDeleteFood={handleDeleteFood}/>
                    <MealContainer mealName={"dinner"} mealItems={mealPlanEntry} setMealItems={setMealPlanEntry} totals={mealTotals} openSearchPopup={openSearchPopup} handleDeleteFood={handleDeleteFood}/>
                    <MealContainer mealName={"snacks"} mealItems={mealPlanEntry} setMealItems={setMealPlanEntry} totals={mealTotals} openSearchPopup={openSearchPopup} handleDeleteFood={handleDeleteFood}/>
                </>
            }
        </div>
    )
}

export default MealPlan


