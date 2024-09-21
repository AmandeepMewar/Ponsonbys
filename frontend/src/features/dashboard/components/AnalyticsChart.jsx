import { useMemo } from 'react';
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { formatCurrency, formatDate } from '../../../utils/helpers';

export default function AnalyticsChart({ dailySalesData }) {
  dailySalesData = useMemo(
    () =>
      dailySalesData.map((sales) => {
        sales.date = formatDate(sales.date);
        return sales;
      }),
    [dailySalesData]
  );

  return (
    <ResponsiveContainer width='100%' height={400}>
      <LineChart
        width={500}
        height={300}
        data={dailySalesData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis
          dataKey='date'
          stroke='#854d0e'
          tick={{
            fill: '#854d0e',
            fontWeight: 500,
            fontSize: '14px',
          }}
          name='Date'
        />
        <YAxis
          yAxisId='left'
          dataKey='revenue'
          stroke='#854d0e'
          tick={{
            fill: '#854d0e',
            fontWeight: 500,
            fontSize: '14px',
          }}
          tickFormatter={(value) => `₹${value}`}
        ></YAxis>
        <YAxis
          yAxisId='right'
          orientation='right'
          dataKey='sales'
          stroke='#854d0e'
          tick={{
            fill: '#854d0e',
            fontWeight: 500,
            fontSize: '14px',
          }}
        >
          <Label value='Number of sales' angle={90} fill='#c026d3' />
        </YAxis>
        <CartesianGrid strokeDasharray='3 3' />
        <Tooltip
          formatter={(value, name) => {
            if (name === 'Revenue')
              return [`${formatCurrency(value)}`, 'Revenue'];
            return value;
          }}
        />
        <Legend verticalAlign='top' height={36} />
        <Line
          yAxisId='right'
          type='monotone'
          dataKey='sales'
          stroke='#c026d3'
          activeDot={{ r: 8 }}
          name='Sales'
        />
        <Line
          yAxisId='left'
          type='monotone'
          dataKey='revenue'
          stroke='#16a34a'
          activeDot={{ r: 8 }}
          name='Revenue'
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
