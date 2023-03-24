import React, { useState } from 'react'
import Wrapper from '../../assets/wrappers/SignUpForm'
import { FormFormat } from '../../components'
import { RiArrowRightSLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'

const GoalsForm = () => {
  const Navigate = useNavigate()
  const [goal, setGoal] = useState('')
  const [category, setCategory] = useState('sports') // add state for category

  const handleSubmit = (e) => {
    e.preventDefault()
    Navigate('/diet-form')
  }

  const handleGoalChange = (e) => {
    setGoal(e.target.value)
  }

  const handleCategoryChange = (e) => {
    setCategory(e.target.value)
  }

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>What are your goals?</h3>
        <div className='form-center'>
          <div className='form-control'>
            <label htmlFor='category'>Choose:</label>
            <select
              name='category'
              id='category'
              className='form-input'
              value={category}
              onChange={handleCategoryChange}
            >
              <option value='sports'>Weight loss</option>
              <option value='history'>Weight gain</option>
              <option value='politics'>Health</option>
            </select>
          </div>

          <button type='submit' className='btn btn-block'>
            Next <RiArrowRightSLine style={{ fontSize: '10px' }} size={10} />
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default GoalsForm

