import React from 'react';

const DietaryInfo = ({
  dietaryRestrictions,
  setDietaryRestrictions,
  allergies,
  setAllergies,
  foodPreferences,
  setFoodPreferences,
  mealComplexity,
  setMealComplexity,
  prevPage,
  nextPage,
}) => {
  const handleDietaryRestrictionsChange = (e) => {
    setDietaryRestrictions(e.target.value.split(','));
  };

  const handleAllergiesChange = (e) => {
    setAllergies(e.target.value.split(','));
  };

  const handleFoodPreferencesChange = (e) => {
    setFoodPreferences(e.target.value);
  };

  const handleMealComplexityChange = (e) => {
    setMealComplexity(e.target.value);
  };

  return (
    <>
      <h2>Dietary Information</h2>
      <label htmlFor="dietary-restrictions">Dietary Restrictions:</label>
      <input
        type="text"
        id="dietary-restrictions"
        value={dietaryRestrictions.join(',')}
        onChange={handleDietaryRestrictionsChange}
      />
      <label htmlFor="allergies">Allergies:</label>
      <input
        type="text"
        id="allergies"
        value={allergies.join(',')}
        onChange={handleAllergiesChange}
      />
      <label htmlFor="food-preferences">Food Preferences:</label>
      <input
        type="text"
        id="food-preferences"
        value={foodPreferences}
        onChange={handleFoodPreferencesChange}
      />
      <label htmlFor="meal-complexity">Meal Complexity:</label>
      <input
        type="text"
        id="meal-complexity"
        value={mealComplexity}
        onChange={handleMealComplexityChange}
      />
      <button onClick={prevPage}>Previous</button>
      <button onClick={nextPage}>Next</button>
    </>
  );
};

export default DietaryInfo;
