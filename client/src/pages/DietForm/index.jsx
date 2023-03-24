import React, { useState } from 'react'
import Wrapper from "../../assets/wrappers/SignUpForm"
import { FormFormat } from '../../components'
import { RiArrowRightSLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';


const DietForm = () => {

    const Navigate = useNavigate()
    const [dietaryRestrictions, setRestrictions] = useState("")
    const [allergies, setAllergies] = useState("")
    const [foodPreferences, setFoodPreferences] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        Navigate("/subscription-form")
      };
    
      const handleChange = (e, setGoal) => {
        e.preventDefault();
        setGoal(e.target.value)
      };


    return (
        <Wrapper>
            <form className='form' onSubmit={handleSubmit}>
        <h3>Dietary Information</h3>
        <div className='form-center'>
          <FormFormat
            type='text'
            name='Dietary Restrictions'
            value={dietaryRestrictions}
            handleChange={(e) => handleChange(e, setRestrictions)}
          />
          <FormFormat
            type='text'
            name='Allergies'
            value={allergies}
            handleChange={(e) => handleChange(e, setAllergies)}
          />
          <FormFormat
            type='text'
            name='Food Preferences'
            value={foodPreferences}
            handleChange={(e) => handleChange(e, setFoodPreferences)}
          />
          <button type='submit' className='btn btn-block'>
            Next <RiArrowRightSLine style={{ fontSize: '10px' }} size={10} />
          </button>
        </div>
      </form>
        </Wrapper>
    )
}

export default DietForm
