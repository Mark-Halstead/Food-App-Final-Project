import React, { useState } from 'react'
import Wrapper from "../../assets/wrappers/SignUpForm"
import { FormFormat } from '../../components'
import { RiArrowRightSLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';


const GoalsForm = () => {

    const Navigate = useNavigate()
    const [goal, setGoal] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        Navigate("/dietary-preferences")
      };
    
      const handleChange = (e, setGoal) => {
        e.preventDefault();
        setGoal(e.target.value)
      };


    return (
        <Wrapper>
            <form className='form' onSubmit={handleSubmit}>
        <h3>What are your goals?</h3>
        <div className='form-center'>
          <FormFormat
            type='text'
            name='Goal'
            value={goal}
            handleChange={(e) => handleChange(e, setGoal)}
          />
          <button type='submit' className='btn btn-block'>
            Next <RiArrowRightSLine style={{ fontSize: '10px' }} size={10} />
          </button>
        </div>
      </form>
        </Wrapper>
    )
}

export default GoalsForm
