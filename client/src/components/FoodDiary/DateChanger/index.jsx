import React from 'react'
import addDays from 'date-fns/addDays';
import isBefore from 'date-fns/isBefore';
import { utcToZonedTime, format } from 'date-fns-tz';

import "./styles.css"

function DateChanger({ selectedDate, setSelectedDate, mealPlan }) {

    function formatDate(dateStr) {
        const date = new Date(dateStr);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const handleDateChange = (change) => {
        const today = new Date();
        const date = new Date(selectedDate);
        const timezone = 'GMT';
      
        // Check if the new date is today or earlier
        const newDate = addDays(date, change);

        if (mealPlan && isBefore(newDate, today, 'day')) {
          return; // Do nothing if the new date is today or earlier
        }
      
        const zonedDate = utcToZonedTime(date, timezone);
        const updatedZonedDate = addDays(zonedDate, change);
        const updatedDate = format(updatedZonedDate, 'yyyy-MM-dd', { timeZone: timezone });
        setSelectedDate(updatedDate);
      };
      


    return (
        <div className='date-container'>
            <button 
                className='date-back-button'
                onClick={() => handleDateChange(-1)}
            >
                <i className="fa-solid fa-caret-left"></i>
            </button>
                <h2>{formatDate(selectedDate)}</h2>
            <button
                className='date-forwards-button'
                onClick={() => handleDateChange(1)}
            >
                <i className="fa-solid fa-caret-right"></i>
            </button>
        </div>
    )
}

export default DateChanger