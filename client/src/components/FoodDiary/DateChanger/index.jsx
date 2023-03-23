import React from 'react'

import "./styles.css"

function DateChanger({ selectedDate, setSelectedDate }) {

    function formatDate(dateStr) {
        const date = new Date(dateStr);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      }

    const handleDateForwards = () => {
        console.log('forwards')
        const date = new Date(selectedDate);
        date.setDate(date.getDate() + 1);
        setSelectedDate(date.toISOString().slice(0, 10))
    }
    const handleDateBack = () => {
        console.log('back')
        const date = new Date(selectedDate);
        date.setDate(date.getDate() - 1);
        setSelectedDate(date.toISOString().slice(0, 10))
    }
    return (
        <div className='date-container'>
        <button 
            className='date-back-button'
            onClick={handleDateBack}
        >
            <i className="fa-solid fa-caret-left"></i>
        </button>
            <h2>{formatDate(selectedDate)}</h2>
        <button
            className='date-forwards-button'
            onClick={handleDateForwards}
        >
            <i className="fa-solid fa-caret-right"></i>
        </button>
    </div>
    )
}

export default DateChanger