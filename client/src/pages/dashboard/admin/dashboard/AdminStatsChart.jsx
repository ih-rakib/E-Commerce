import React from "react";
import { Pie, Line } from "react-chartjs-2";
import "chart.js/auto";

const AdminStatsChart = ({ stats }) => {
  const pieData = {
    labels: ["Total Products", "Total Orders", "Total Users", "Total Reviews"],
    datasets: [
      {
        label: "Admin Stats",
        data: [
          stats?.totalProducts,
          stats?.totalOrders,
          stats?.totalUsers,
          stats?.totalReviews,
        ],
        backgroundColor: [
          "#5cc0b9",
          "#3498DB",
          "#def19f",
          "#702906",
          "#F39C12",
        ],
        hoverBackgroundColor: [
          "#27f0c8",
          "#2980B9",
          "#bcd95b",
          "#592307",
          "#D68910",
        ],
      },
    ],
  };

  const data = new Array(12).fill(0);

  // mapping correct month
  stats?.monthlyEarnings.forEach((entry) => {
    data[entry.month - 1] = entry.earnings;
  });

  const lineData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Monthly Earnings",
        data,
        fill: false,
        backgroundColor: "##62b8f1",
        borderColor: "#62b8f1",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="mt-12 space-y-12 min-w-0 max-w-full">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">Admin Stats Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-w-0">
        {/* pie chart */}
        <div className="h-72 sm:h-80 md:h-96 w-full max-w-full min-w-0 overflow-hidden">
          <Pie data={pieData} options={options}></Pie>
        </div>
        {/* line chart */}
        <div className="h-72 sm:h-80 md:h-96 w-full max-w-full min-w-0 overflow-hidden">
          <Line data={lineData} options={options}></Line>
        </div>
      </div>
      <div>
        <p className="text-center text-sm text-gray-500">
          Made With Stress by @Ikramul Hasan Rakib
        </p>
      </div>
    </div>
  );
};

export default AdminStatsChart;
