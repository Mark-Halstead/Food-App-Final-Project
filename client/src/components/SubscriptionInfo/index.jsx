import React from 'react';
import Wrapper from '../../assets/wrappers/SubscriptionInfo';

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
    <Wrapper>
      <h2>Subscription Type</h2>
      <div className="form-group">
        <label htmlFor="budget">Budget:</label>
        <input
          type="number"
          id="budget"
          value={budget}
          onChange={handleBudgetChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="subscription-type">Subscription Type:</label>
        <select
          id="subscription-type"
          value={subscriptionType}
          onChange={handleSubscriptionTypeChange}
        >
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <div className="btn-container">
        <button onClick={prevPage}>Previous</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </Wrapper>
  );
};

export default SubscriptionInfo;

