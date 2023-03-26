import React from 'react';

const SubscriptionInfo = ({
  budget,
  setBudget,
  subscriptionType,
  setSubscriptionType,
  prevPage,
  handleSubmit,
}) => {
  const handleBudgetChange = (e) => {
    setBudget(e.target.value);
  };

  const handleSubscriptionTypeChange = (e) => {
    setSubscriptionType(e.target.value);
  };

  return (
    <>
      <h2>Subscription Type</h2>
      <label htmlFor="budget">Budget:</label>
      <input
        type="number"
        id="budget"
        value={budget}
        onChange={handleBudgetChange}
      />
      <label htmlFor="subscription-type">Subscription Type:</label>
      <select
        id="subscription-type"
        value={subscriptionType}
        onChange={handleSubscriptionTypeChange}
      >
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
      <button onClick={prevPage}>Previous</button>
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
};

export default SubscriptionInfo;
