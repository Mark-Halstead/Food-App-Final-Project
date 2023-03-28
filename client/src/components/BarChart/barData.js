const data = [
  { date: 'Monday', Calories: 2000 },
  { date: 'Tuesday', Calories: 2500 },
  { date: 'Wednesday', Calories: 1987 },
  { date: 'Thursday', Calories: 2654 },
  { date: 'Friday', Calories: 2321 },
  { date: 'Saturday', Calories: 3500 },
  { date: 'Sunday', Calories: 3278 },
]

export const avgCalories = Math.round(data.reduce((acc, item) => acc + item.Calories, 0) / data.length);
console.log(avgCalories);

export default data
