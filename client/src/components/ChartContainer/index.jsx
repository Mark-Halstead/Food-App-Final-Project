import React from 'react';
import BarChart from '../BarChart'
import Wrapper from '../../assets/wrappers/ChartsContainer';
const ChartContainer = () => {
    return (
        <Wrapper>
            <h4>Weekly Calorie Intake</h4>
            <BarChart />
            {/* Need to put data={data} above */}
        </Wrapper>
    );
};
export default ChartContainer;
