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
