import React, { useState } from 'react';
import axios from 'axios';
import { PersonalInfo, FitnessInfo, DietaryInfo, SubscriptionInfo } from '../../components';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/SignUpForm';
import { CSSTransition } from 'react-transition-group';

const UserSignUpForm = () => {
    const Navigate = useNavigate()
    const [page, setPage] = useState(1);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
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
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const userData = {
            first_name: firstName,
            last_name: lastName,
            age: age,
            weight: weight,
            gender: gender,
            activity_level: activityLevel,
            goal: goal,
            dietary_restrictions: dietaryRestrictions,
            allergies: allergies,
            food_preferences: foodPreferences,
            meal_complexity: mealComplexity,
            budget: budget,
            subscription_type: subscriptionType
        };
    
        try {
            setLoading(true)
            const token = localStorage.getItem('token')
            const response = await axios.put(`https://plate-perfect-server.onrender.com/users/`, userData, {
                headers: {
                    Authorization: `${token}`
                },
            });

            Navigate("/dashboard")
        } catch (error) {
            console.log(error.response.data);
        }
        setLoading(false)
    };
    

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

    const nextPage = () => {
        setPage(page + 1);
    };

    const prevPage = () => {
        setPage(page - 1);
    };

    return (
        <Wrapper>
            <form className="form page-transition" onSubmit={() => handleSubmit()}>
                <CSSTransition
                    in={page === 1}
                    classNames="fade"
                    timeout={300}
                    unmountOnExit
                >
                    <PersonalInfo
                        firstName={firstName}
                        setFirstName={setFirstName}
                        lastName={lastName}
                        setLastName={setLastName}
                        age={age}
                        setAge={setAge}
                        weight={weight}
                        setWeight={setWeight}
                        gender={gender}
                        setGender={setGender}
                        page={page}
                        nextPage={handlePersonalInfoSubmit}
                    />
                </CSSTransition>
                <CSSTransition
                    in={page === 2}
                    classNames="fade"
                    timeout={300}
                    unmountOnExit
                >
                    <FitnessInfo
                        activityLevel={activityLevel}
                        setActivityLevel={setActivityLevel}
                        goal={goal}
                        setGoal={setGoal}
                        prevPage={prevPage}
                        nextPage={handleFitnessInfoSubmit}
                    />
                </CSSTransition>
                <CSSTransition
                    in={page === 3}
                    classNames="fade"
                    timeout={300}
                    unmountOnExit
                >
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
                </CSSTransition>
                <CSSTransition
                    in={page === 4}
                    classNames="fade"
                    timeout={300}
                    unmountOnExit
                >
                    <SubscriptionInfo
                        budget={budget}
                        setBudget={setBudget}
                        subscriptionType={subscriptionType}
                        setSubscriptionType={setSubscriptionType}
                        prevPage={prevPage}
                        handleSubmit={handleSubmit}
                        submitting={loading}
                    />
                </CSSTransition>
            </form>
        </Wrapper>
    );
};

export default UserSignUpForm;

