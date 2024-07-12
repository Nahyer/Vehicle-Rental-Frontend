// src/components/Dashboard.js
import React from 'react';
import ChartCard from './overview/ChartCard';
import LineChart from './overview/charts/LineChart';
import BarChart from './overview/charts/BarChart';
import PieChart from './overview/charts/PieChart';
import GaugeChart from './overview/charts/GaugeChart';
import DateRangePicker from './overview/DateRangePicker';
import Nav from '../Nav';


const Dashboard = () => {
  return (
    <>
    <Nav/>
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* <ChartCard title="Total Bookings">
        <LineChart />
      </ChartCard>
      <ChartCard title="Total Revenue">
        <BarChart />
      </ChartCard>
      <ChartCard title="Most Rented Vehicle Types">
        <PieChart />
      </ChartCard> */}
      <ChartCard title="Fleet Utilization Rate">
        <GaugeChart />
      </ChartCard>
      <div className="col-span-1 md:col-span-2 lg:col-span-3">
        <DateRangePicker />
      </div>
    </div>
    </>
  );
};

export default Dashboard;
