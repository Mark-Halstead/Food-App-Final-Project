import React from 'react'
import { MyClients, DietForm, HomePage, GPTPage } from './pages'
import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components'
import { Profile, Overview, Plan, SharedLayout, Chat, NutritionistSharedLayout, Register, Login, FoodDiary, UserSignUpForm, GoalsForm, SubscriptionForm, MealPlan , BarcodePage, NutritionistList, RegisterNutritionist, NutritionistSignUpForm, LoginNutritionist } from './pages/index'
import { useLocation } from 'react-router-dom';
import NutritionistProfile from './pages/NutritionistDashboard/NutritionistProfile'
import { AuthProvider } from './contexts/AuthContext';
import { ClientProvider } from './contexts/ClientContext';


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
            <Route path='gpt' element={<GPTPage />} />
          </Route>
          <Route path='register' element={<Register />} />
          <Route path='register-nutritionist' element={<RegisterNutritionist />} />
          <Route path='login-nutritionist' element={<LoginNutritionist />} />
          <Route path='login' element={<Login />} />
          <Route path='user-signup-form' element={<UserSignUpForm />} />
          <Route path='nutritionist-signup-form' element={<NutritionistSignUpForm />} />
          <Route path='goals-form' element={<GoalsForm />} />
          <Route path='diet-form' element={<DietForm />} />
          <Route path='subscription-form' element={<SubscriptionForm />} />
          {/* <Route path='form' element={<FormPage />} /> */}
          <Route path="/nutritionist-dashboard" element={<ClientProvider><NutritionistSharedLayout /></ClientProvider>}>
            <Route index element={<MyClients />} />
            <Route path='meal-plan' element={<MealPlan />} />
            <Route path='profile' element={<NutritionistProfile />} />
            <Route path='chat' element={<Chat />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );

}

export default App;
