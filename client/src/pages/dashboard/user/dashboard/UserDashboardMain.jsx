import React from "react";
import { useSelector } from "react-redux";
import { useGetUserStatsQuery } from "../../../../redux/features/stats/statsApi";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import UserStats from "./UserStats";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const UserDashboardMain = () => {
  const { user } = useSelector((state) => state.auth);

  const { data: stats, error, isLoading } = useGetUserStatsQuery(user?.email);
  // console.log(stats);
  if (isLoading)
    return <div className="text-center text-slate-700">Loading...</div>;
  if (!stats)
    return <div className="text-center text-slate-700">No data available!</div>;

  const data = {
    labels: ["Total Payments", "Total Reviews", "Total Purchased"],
    datasets: [
      {
        label: "User Stats",
        data: [
          stats.totalPayments,
          stats.totalReviews * 100,
          stats.totalPurchasedProducts * 100,
        ],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const categoryLabel = tooltipItem.label;

            const value = tooltipItem.raw;

            if (categoryLabel === "Total Payments") {
              return `Total Payments: $${value.toFixed(2)}`;
            }

            if (categoryLabel === "Total Reviews") {
              return `Total Reviews: ${value}`;
            }

            return `${categoryLabel}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div className="p-6">
      <div>
        <h1 className="text-2xl font-semibold mb-4">User Dashboard</h1>
        <p className="text-gray-500">
          Hello {user?.username}! Welcome to User Dashboard
        </p>
      </div>
      <UserStats stats={stats}></UserStats>
      <div className="mb-6">
        <Bar data={data} options={options}></Bar>
      </div>
    </div>
  );
};

export default UserDashboardMain;
