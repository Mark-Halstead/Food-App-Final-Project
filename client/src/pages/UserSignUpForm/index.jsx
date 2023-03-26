import React, { useState } from 'react';
import { PersonalInfo, FitnessInfo, DietaryInfo, SubscriptionInfo } from '../../components';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/SignUpForm';

const UserSignUpForm = () => {
    const Navigate = useNavigate()
    const [page, setPage] = useState(1);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [gender, setGender] = useState('');
    const [activityLevel, setActivityLevel] = useState('');
    const [goal, setGoal] = useState('');
    const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
    const [allergies, setAllergies] = useState([]);
    const [foodPreferences, setFoodPreferences] = useState('');
    const [mealComplexity, setMealComplexity] = useState('');
    const [budget, setBudget] = useState('');
    const [subscriptionType, setSubscriptionType] = useState('');

    const handlePersonalInfoSubmit = (e) => {
        e.preventDefault();
        nextPage();
    };

    const handleFitnessInfoSubmit = (e) => {
        e.preventDefault();
        nextPage();
    };

    const handleDietaryInfoSubmit = (e) => {
        e.preventDefault();
        nextPage();
    };

    const handleSubscriptionTypeSubmit = (e) => {
        e.preventDefault();
        Navigate("/dashboard")
    };

    const nextPage = () => {
        setPage(page + 1);
    };

    const prevPage = () => {
        setPage(page - 1);
    };

    return (
        <Wrapper>
            <form className="form" onSubmit={() => handleSubmit()}>
                {page === 1 && (
                    <PersonalInfo
                        firstName={firstName}
                        setFirstName={setFirstName}
                        lastName={lastName}
                        setLastName={setLastName}
                        email={email}
                        setEmail={setEmail}
                        age={age}
                        setAge={setAge}
                        weight={weight}
                        setWeight={setWeight}
                        gender={gender}
                        setGender={setGender}
                        nextPage={handlePersonalInfoSubmit}
                    />
                )}
                {page === 2 && (
                    <FitnessInfo
                        activityLevel={activityLevel}
                        setActivityLevel={setActivityLevel}
                        goal={goal}
                        setGoal={setGoal}
                        prevPage={prevPage}
                        nextPage={handleFitnessInfoSubmit}
                    />
                )}
                {page === 3 && (
                    <DietaryInfo
                        dietaryRestrictions={dietaryRestrictions}
                        setDietaryRestrictions={setDietaryRestrictions}
                        allergies={allergies}
                        setAllergies={setAllergies}
                        foodPreferences={foodPreferences}
                        setFoodPreferences={setFoodPreferences}
                        mealComplexity={mealComplexity}
                        setMealComplexity={setMealComplexity}
                        prevPage={prevPage}
                        nextPage={handleDietaryInfoSubmit}
                    />
                )}
                {page === 4 && (
                    <SubscriptionInfo
                        budget={budget}
                        setBudget={setBudget}
                        subscriptionInfo={subscriptionType}
                        setSubscriptionType={setSubscriptionType}
                        prevPage={prevPage}
                        handleSubmit={handleSubscriptionTypeSubmit}
                    />
                )}
            </form>
        </Wrapper>
    );
};

export default UserSignUpForm


