import React from 'react';

function Calendar() {
  // get the current date
  const currentDate = new Date();
  // create an array of the days of the week
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  // create an array of the dates for the current week
  const datesForWeek = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() + i);
    datesForWeek.push(date);
  }

  return (
    <div>
      <h2>Weekly Calendar</h2>
      <div className="calendar">
        {daysOfWeek.map(day => (
          <div key={day} className="day">{day}</div>
        ))}
        {datesForWeek.map(date => (
          <div key={date} className="date">{date.getDate()}</div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
