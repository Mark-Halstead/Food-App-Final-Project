// import React, { useEffect, useState } from 'react'

// import { MealContainer } from '../../components/FoodDiary'
// import dailyDiaryEntry from '../../test_db/diaryEntries'

// function FoodDiary() {
//     const [selectedDate, setSelectedDate] = useState(new Date());
//     const [diaryEntry, setDiaryEntry] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     useEffect(() => {
//         setLoading(true)
//         async function getDiaryEntry() {
//             try {
//                 const response = await fetch(`http://127.0.0.1:5000/diary_entries?date=${selectedDate.toISOString().slice(0, 10)}`)
//                 const data = await response.json()
//                 console.log('data', data)
//                 setDiaryEntry(data)
//                 setLoading(false)
//             } catch (error) {
//                 setError(error)
//                 setLoading(false)
//             }
//         } 
//         getDiaryEntry()

//     }, [selectedDate])

//     async function handleFoodItemConfirm(meal, foodItemId, confirmed) {
//         console.log('first', diaryEntry)
//         try {
//             const options = {
//                 method:"PUT",
//                 body:JSON.stringify({confirmed})
//             }
//             const apiString = `http://127.0.0.1:5000/diary_entries/${diaryEntry.entry_id}/foods/${meal}/${foodItemId}`
//             const response = await fetch(apiString, 
//                 options
//             )
//             const data = await response.json()
//             console.log('data', first)
//             setDiaryEntry(data)
//             setLoading(false)
//         } catch (error) {
//             setError(error)
//             setLoading(false)
//         }
//     } 
    
//     async function handleFoodItemDelete(meal, foodItemId) {
//         try {
//             const response = await fetch(`/api/diary_entries/${diaryEntry._id}/foods/${meal}/${foodItemId}`,
//                 {method:"DELETE"}
//             )
//             const data = response.json()
//             setDiaryEntry(data)
//             setLoading(false)
//         } catch (error) {
//             setError(error)
//             setLoading(false)
//         }
//     }
    

//     return (
//         <div>
//             <MealContainer mealName={"breakfast"} diaryEntry={diaryEntry} onFoodItemConfirm={handleFoodItemConfirm} onFoodItemDelete={handleFoodItemDelete}/>
//             <MealContainer mealName={"lunch"} diaryEntry={diaryEntry} onFoodItemConfirm={handleFoodItemConfirm} onFoodItemDelete={handleFoodItemDelete}/>
//             <MealContainer mealName={"dinner"} diaryEntry={diaryEntry} onFoodItemConfirm={handleFoodItemConfirm} onFoodItemDelete={handleFoodItemDelete}/>
//             <MealContainer mealName={"snacks"} diaryEntry={diaryEntry} onFoodItemConfirm={handleFoodItemConfirm} onFoodItemDelete={handleFoodItemDelete}/>
//         </div>
//     )
// }

// export default FoodDiary
