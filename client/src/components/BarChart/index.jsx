import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import data from './barData';

const BarChartComponent = () => {
    return (
        <ResponsiveContainer width='100%' height={300}>
            <BarChart data={data} margin={{ top: 50 }}>
                <CartesianGrid strokeDasharray='10 10 ' />
                <XAxis dataKey='date' />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey='Calories' fill='#42b942' barSize={75} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartComponent;
