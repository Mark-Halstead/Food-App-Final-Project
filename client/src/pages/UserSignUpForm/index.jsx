import React, { useState } from 'react';
import { PersonalInfo, FitnessInfo, DietaryInfo, SubscriptionInfo } from '../../components';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/SignUpForm';
import { CSSTransition } from 'react-transition-group';

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
                        email={email}
                        setEmail={setEmail}
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
                        subscriptionInfo={subscriptionType}
                        setSubscriptionType={setSubscriptionType}
                        prevPage={prevPage}
                        handleSubmit={handleSubscriptionTypeSubmit}
                    />
                </CSSTransition>
            </form>
        </Wrapper>
    );
};

export default UserSignUpForm;



