// src/components/charts/BarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Total Revenue',
      data: [12, 19, 3, 5, 2, 3, 9],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
  ],
};

const BarChart = () => {
  return <Bar data={data} />;
};

export default BarChart;
