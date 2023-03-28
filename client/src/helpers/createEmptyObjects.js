export function createEmptyMealPlanObject() {
    const mealItems = {
        date: new Date().toISOString().slice(0, 10),
        breakfast: [],
        lunch: [],
        dinner: [],
        snacks: [],
        completed: false,
    };
    return mealItems;
}

export function createEmptyDiaryEntryObject(entry_date, user_id) {
    const diaryEntry = {
        date: entry_date,
        breakfast: [],
        lunch: [],
        dinner: [],
        snacks: [],
        mood: 3,
        user_id: user_id,
        weight: 0,
        followed_meal_plan: false,
    };
    return diaryEntry;
}
