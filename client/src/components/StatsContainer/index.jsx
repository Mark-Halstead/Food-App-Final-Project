import StatCard from '../StatCard/StatCard';
import { FaUser, FaWeight, FaUtensils } from 'react-icons/fa';
import Wrapper from '../../assets/wrappers/StatsContainer';
import { avgCalories } from "../BarChart/barData"

const StatsContainer = () => {

  const defaultStats = [
    {
      title: 'Marion Nestle, Ph.D., M.P.H.',
      count: "Nutritionist",
      color: '#e9b949',
      bcg: '#fcefc7',
      icon: <FaUser />,
    },
    {
      title: 'weight',
      count: "80kg",
      color: '#647acb',
      bcg: '#e0e8f9',
      icon: <FaWeight />,
    },
    {
      title: 'Average daily calorie intake',
      count: avgCalories,
      color: '#d66a6a',
      bcg: '#ffeeee',
      icon: <FaUtensils />,
    },
  ];



  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatCard key={index} {...item} />;
      })}
    </Wrapper>
  );
};
export default StatsContainer;
