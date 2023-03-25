export const calculateMealTotals = (meal) => {
    let caloriesTotal = 0;
    let fatTotal = 0;
    let carbTotal = 0;
    let proteinTotal = 0;

    meal.forEach((item) => {
        if (item.confirmed) {
            caloriesTotal +=
                (item.product.nutriments["energy-kcal_100g"] *
                    item["user_serving_size"]) /
                100;
            fatTotal +=
                (item.product.nutriments["energy-kcal_100g"] *
                    item["user_serving_size"]) /
                100;
            carbTotal +=
                (item.product.nutriments["energy-kcal_100g"] *
                    item["user_serving_size"]) /
                100;
            proteinTotal +=
                (item.product.nutriments["energy-kcal_100g"] *
                    item["user_serving_size"]) /
                100;
        }
    });

    return {
        calories: caloriesTotal.toFixed(),
        fat: fatTotal.toFixed(1),
        carb: carbTotal.toFixed(1),
        protein: proteinTotal.toFixed(1),
    };
};

export const calculateTotals = (mealItems) => {
    let totalCalories = 0;
    let totalFat = 0;
    let totalCarb = 0;
    let totalProtein = 0;

    const mealTotals = {};
    for (const meal of ["breakfast", "lunch", "dinner", "snacks"]) {
        const { calories, fat, carb, protein } = calculateMealTotals(
            mealItems[meal]
        );
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
        ...mealTotals,
    };
};
