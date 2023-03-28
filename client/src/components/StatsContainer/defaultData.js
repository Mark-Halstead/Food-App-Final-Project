import { avgCalories } from "../BarChart/barData";

const defaultStats = [
    {
      title: 'height',
      count: "180cm",
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'weight',
      count: "80kg",
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'Average calorie intake',
      count: avgCalories,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ];

export default defaultStats;
