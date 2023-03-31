import React, { useState } from 'react';
import axios from 'axios';
import "./gptstyles.css";

function GPTPage() {
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log(localStorage.getItem("token"))
    const user = await axios.get('https://plate-perfect.onrender.com/users/', {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })

    let p = "Provide a meal plan for one day that includes breakfast, lunch, dinner and snacks. The plan should include balanced macronutrients"
    if (user.data.dietary_restrictions) {
      p += `, and be suitable for someone with this dietary restriction ${user.data.dietary_restrictions[0]}`
    }
    if (user.data.daily_calorie_target) {
      p += `, meeting this daily calorie target ${user.data.daily_calorie_target}`
    }
    if (user.data.food_preferences) {
      p += `, and following these food preferences: ${user.data.food_preferences}`
    }
    if (user.data.meal_complexity) {
      p += `, and with this preferred meal complexity: ${user.data.meal_complexity}. `
    }
    p += "Return the meal plan as a valid JSON object with 'breakfast', 'lunch', 'dinner', and 'snacks' keys, which contain a list for each meal with the individual items in that meal. "
    console.log("prompt", p)
    const res = await axios.post('https://plate-perfect.onrender.com/meal_plan_entries/gpt', { "prompt": p });
    console.log("res", res.data.response.choices[0].text)
    setResponse(JSON.parse(res.data.response.choices[0].text));

    setLoading(false)
  };

  return (
    <div id="gpt-container">
      <h1 id="gpt-heading">AI Nutritionist</h1>
      <form onSubmit={handleSubmit} id="gpt-form">
        <button type="submit" id="gpt-button">Request</button>
      </form>
      {loading ?
        <div id="gpt-spinner"></div>
        :
        response && Object.keys(response).length ? (
          <ul id="gpt-response">
          <section class="gpt-meal">
            <h2>Breakfast</h2>
            <ul>
              {response.breakfast?.map((item) => (
                <li key={item} class="gpt-item">{item}</li>
              ))}
            </ul>
          </section>
          <section class="gpt-meal">
            <h2>Lunch</h2>
            <ul>
              {response.lunch?.map((item) => (
                <li key={item} class="gpt-item">{item}</li>
              ))}
            </ul>
          </section>
          <section class="gpt-meal">
            <h2>Dinner</h2>
            <ul>
              {response.dinner?.map((item) => (
                <li key={item} class="gpt-item">{item}</li>
              ))}
            </ul>
          </section>
          <section class="gpt-meal">
            <h2>Snacks</h2>
            <ul>
              {response.snacks?.map((item) => (
                <li key={item} class="gpt-item">{item}</li>
              ))}
            </ul>
          </section>
        </ul>
        )
        :
        <div id="gpt-cta">
          <p>Click the button to request a meal plan for a day.</p>
          <p>Warning: This feature is experimental</p>
        </div>
      }
    </div>
  );
}

export default GPTPage;
