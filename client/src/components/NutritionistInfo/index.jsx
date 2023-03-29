import React from 'react';
import Wrapper from "../../assets/wrappers/PersonalInfo";

const NutritionistInfo = ({
    firstName,
    setFirstName,
    lastName,
    setLastName,
    credentials,
    setCredentials,
    areaOfExpertise,
    setAreaOfExpertise,
    educationTraining,
    setEducationTraining,
    nextPage,
}) => {
    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };

    const handleCredentialsChange = (e) => {
        setCredentials(e.target.value);
    };

    const handleAreaOfExpertiseChange = (e) => {
        setAreaOfExpertise(e.target.value);
    };

    const handleEducationTrainingChange = (e) => {
        setEducationTraining(e.target.value);
    };

    return (
        <Wrapper>
            <div className="form-center">
                <h2>Expertise Information</h2>
                <div className="form-group">
                    <label htmlFor="first-name">First Name:</label>
                    <input
                        type="text"
                        id="first-name"
                        value={firstName}
                        onChange={handleFirstNameChange}
                        className="input-outline"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="last-name">Last Name:</label>
                    <input
                        type="text"
                        id="last-name"
                        value={lastName}
                        onChange={handleLastNameChange}
                        className="input-outline"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="credentials">Credentials:</label>
                    <input
                        type="text"
                        id="credentials"
                        value={credentials}
                        onChange={handleCredentialsChange}
                        className="input-outline"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="area-of-expertise">Area of Expertise:</label>
                    <input
                        type="text"
                        id="area-of-expertise"
                        value={areaOfExpertise}
                        onChange={handleAreaOfExpertiseChange}
                        className="input-outline"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="education-training">Education and Training:</label>
                    <textarea
                        id="education-training"
                        value={educationTraining}
                        onChange={handleEducationTrainingChange}
                        className="input-outline"
                    ></textarea>
                </div>
                <div className="btn-container">
                    <button onClick={nextPage}>Next</button>
                </div>
            </div>
        </Wrapper>
    );
};

export default NutritionistInfo;
