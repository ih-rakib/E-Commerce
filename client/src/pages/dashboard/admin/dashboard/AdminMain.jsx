import React from "react";
import { useSelector } from "react-redux";
import { useGetAdminStatsQuery } from "../../../../redux/features/stats/statsApi";
import AdminStats from "./AdminStats";
import AdminStatsChart from "./AdminStatsChart";

const AdminMain = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: stats, isLoading, error } = useGetAdminStatsQuery();
  if (isLoading)
    return <div className="text-center text-gray-500">Loading...</div>;
  if (!stats) return <div>No stats found!</div>;
  if (error) return <div>Failed to load stats!</div>;

  return (
    <div className="p-0">
      <div>
        <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
        <p className="text-gray-500">
          Hi {user?.username}! Welcome to Admin Dashboard
        </p>
        <AdminStats stats={stats}></AdminStats>
        <AdminStatsChart stats={stats}></AdminStatsChart>
      </div>
    </div>
  );
};

export default AdminMain;
