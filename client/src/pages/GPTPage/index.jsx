import React, { useState } from 'react';
import axios from 'axios';

function GPTPage() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://127.0.0.1:5000/meal_plan_entries/gpt', { "prompt": prompt });
    setResponse(response.data.response);
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
