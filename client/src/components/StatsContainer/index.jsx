import StatCard from '../StatCard/StatCard';
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';
import Wrapper from '../../assets/wrappers/StatsContainer';
import defaultStats from './defaultData';

const StatsContainer = () => {

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatCard key={index} {...item} />;
      })}
    </Wrapper>
  );
};
export default StatsContainer;
