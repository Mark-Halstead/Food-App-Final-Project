import React, { useState } from 'react';
import axios from 'axios';

function GPTPage() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log(localStorage.getItem("token"))
    const user = await axios.get('http://127.0.0.1:5000/users/', {
      headers:{
        Authorization:localStorage.getItem("token")
      }
    })

    let p = "Provide a meal plan for one day that includes breakfast, lunch, dinner and snacks. The plan should include balanced macronutrients"
    if (user.data.dietary_restrictions){
      p += `, and be suitable for someone with this dietary restriction ${user.data.dietary_restrictions[0]}`
    }
    if(user.data.daily_calorie_target){
      p += `, meeting this daily calorie target ${user.data.daily_calorie_target}`
    }
    if(user.data.food_preferences){
      p += `, and following these food preferences: ${user.data.food_preferences}`
    }
    if(user.data.meal_complexity){
      p += `, and with this preferred meal complexity: ${user.data.meal_complexity}. `
    }
    p +=  "Return the meal plan as a JSON object with breakfast, lunch, dinner, and snack keys, which contain a list for each meal with the individual items in that meal"
    console.log("prompt", p)
    const res = await axios.post('http://127.0.0.1:5000/meal_plan_entries/gpt', { "prompt": p });
    console.log("res", res.data.response.choices[0].text)
    setResponse(res.data.response.choices[0].text);
    
    setPrompt('');
  };
  
  return (
    <div>
      <h1>Chatbot</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        <button type="submit">Send</button>
      </form>
      <p>{response}</p>
    </div>
  );
}

export default GPTPage;
