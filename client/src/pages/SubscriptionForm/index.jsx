import React, { useState } from 'react'
import Wrapper from "../../assets/wrappers/SignUpForm"
import { FormFormat } from '../../components'
import { RiArrowRightSLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';


const SubscriptionForm = () => {

    const Navigate = useNavigate()
    const [budget, setBudget] = useState("")
    const [subscriptionType, setSubscriptionType] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        Navigate("/dashboard")
      };
    
      const handleChange = (e, setGoal) => {
        e.preventDefault();
        setGoal(e.target.value)
      };


    return (
        <Wrapper>
            <form className='form' onSubmit={handleSubmit}>
        <h3>Payment Plan</h3>
        <div className='form-center'>
          <FormFormat
            type='text'
            name='Budget'
            value={budget}
            handleChange={(e) => handleChange(e, setBudget)}
          />
          <FormFormat
            type='text'
            name='Subscription Type'
            value={subscriptionType}
            handleChange={(e) => handleChange(e, setSubscriptionType)}
            />
          <button type='submit' className='btn btn-block'>
            Next <RiArrowRightSLine style={{ fontSize: '10px' }} size={10} />
          </button>
        </div>
      </form>
        </Wrapper>
    )
}

export default SubscriptionForm
