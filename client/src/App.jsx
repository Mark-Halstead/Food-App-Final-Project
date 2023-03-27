import React from 'react'
import { MyClients, DietForm, HomePage } from './pages'
import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components'
import { Profile, Overview, Plan, SharedLayout, Chat, NutritionistSharedLayout, Register, Login, FoodDiary, UserSignUpForm, GoalsForm, SubscriptionForm, MealPlan , BarcodePage, NutritionistList } from './pages/index'
import { useLocation } from 'react-router-dom';
import NutritionistProfile from './pages/NutritionistDashboard/NutritionistProfile'
import { AuthProvider } from './contexts/AuthContext';


function App() {
  const location = useLocation();

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<HomePage />} />
          </Route>
          <Route path="/dashboard" element={<SharedLayout />}>
            <Route index element={<Overview />} />
            <Route path='profile' element={<Profile />} />
            <Route path="diary" element={<FoodDiary />} />
            <Route path="nutritionists" element={<NutritionistList />} />
            <Route path='plan' element={<Plan />} />
            <Route path='chat' element={<Chat />} />
            <Route path='barcode' element={<BarcodePage />} />
          </Route>
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route path='user-signup-form' element={<UserSignUpForm />} />
          <Route path='goals-form' element={<GoalsForm />} />
          <Route path='diet-form' element={<DietForm />} />
          <Route path='subscription-form' element={<SubscriptionForm />} />
          {/* <Route path='form' element={<FormPage />} /> */}
          <Route path="/nutritionist-dashboard" element={<NutritionistSharedLayout />}>
            <Route index element={<NutritionistProfile />} />
            <Route path='meal-plan/:clientId' element={<MealPlan />} />
            <Route path='clients' element={<MyClients />} />
            <Route path='chat' element={<Chat />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );

}

export default App;
