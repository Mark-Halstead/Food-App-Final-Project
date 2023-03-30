import React from 'react';
import './styles.css';

function ClientFilters({ goalsFilter, setGoalsFilter, activityLevelsFilter, setActivityLevelsFilter, dietaryRestrictionsFilter, setDietaryRestrictionsFilter, foodPreferencesFilter, setFoodPreferencesFilter }) {
  return (
    <div className="client-filters">
      <select value={goalsFilter} onChange={(e) => setGoalsFilter(e.target.value)}>
        <option value="">All Goals</option>
        <option value="Lose weight">Lose weight</option>
        <option value="Maintain weight">Maintain weight</option>
        <option value="Gain weight">Gain weight</option>
      </select>
      <select value={activityLevelsFilter} onChange={(e) => setActivityLevelsFilter(e.target.value)}>
        <option value="">All Activity Levels</option>
        <option value="Sedentary">Sedentary</option>
        <option value="Lightly active">Lightly active</option>
        <option value="Moderately active">Moderately active</option>
        <option value="Very active">Very active</option>
      </select>
      <select value={dietaryRestrictionsFilter} onChange={(e) => setDietaryRestrictionsFilter(e.target.value)}>
        <option value="">All Dietary Restrictions</option>
        <option value="Gluten-free">Gluten-free</option>
        <option value="Dairy-free">Dairy-free</option>
        <option value="Vegan">Vegan</option>
        <option value="Vegetarian">Vegetarian</option>
        <option value="Kosher">Kosher</option>
        <option value="Halal">Halal</option>
      </select>
      <select value={foodPreferencesFilter} onChange={(e) => setFoodPreferencesFilter(e.target.value)}>
        <option value="">All Food Preferences</option>
        <option value="Italian">Italian</option>
        <option value="Mexican">Mexican</option>
        <option value="Asian">Asian</option>
        <option value="Mediterranean">Mediterranean</option>
        <option value="Indian">Indian</option>
      </select>
    </div>
  );
}

export default ClientFilters;
