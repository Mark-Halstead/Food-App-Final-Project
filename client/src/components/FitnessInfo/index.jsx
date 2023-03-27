import React from 'react';
import Wrapper from '../../assets/wrappers/FitnessInfo';

const FitnessInfo = ({
    activityLevel,
    setActivityLevel,
    goal,
    setGoal,
    prevPage,
    nextPage,
}) => {
    const handleActivityLevelChange = (e) => {
        setActivityLevel(e.target.value);
    };

    const handleGoalChange = (e) => {
        setGoal(e.target.value);
    };

    return (
        <Wrapper>
            <h2>Fitness Information</h2>
            <div className="form-group">
                <label htmlFor="activity-level">Activity Level:</label>
                <select
                    id="activity-level"
                    value={activityLevel}
                    onChange={handleActivityLevelChange}
                >
                    <option value="sedentary">Sedentary</option>
                    <option value="lightly-active">Lightly Active</option>
                    <option value="moderately-active">Moderately Active</option>
                    <option value="very-active">Very Active</option>
                    <option value="extra-active">Extra Active</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="goal">Goal:</label>
                <select id="goal" value={goal} onChange={handleGoalChange}>
                    <option value="lose-weight">Lose Weight</option>
                    <option value="maintain-weight">Maintain Weight</option>
                    <option value="gain-weight">Gain Weight</option>
                </select>
            </div>
            <div className="btn-container">
                <button onClick={prevPage}>Previous</button>
                <button onClick={nextPage}>Next</button>
            </div>
        </Wrapper>
    );
};

export default FitnessInfo;

