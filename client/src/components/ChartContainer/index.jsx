import React from 'react';
import BarChart from '../BarChart'
import Wrapper from '../../assets/wrappers/ChartsContainer';
const ChartContainer = () => {
    return (
        <Wrapper>
            <h4>Weekly Progress</h4>
            <button type='button'>
                {'Bar Chart'}
            </button>
            <BarChart />
            {/* Need to put data={data} above */}
        </Wrapper>
    );
};
export default ChartContainer;
