import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";

const DashboardLayout = () => {
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user !== null) {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const renderDashboard = () => {
    switch (user?.role) {
      case "admin":
        return <AdminDashboard />;
      case "user":
        return <UserDashboard />;
      default:
        return <Navigate to="/login" replace />;
    }
  };

  return (
    <div className="container mx-auto flex flex-col mt-5 md:flex-row gap-4 items-stretch md:items-start justify-start px-3 sm:px-4 md:px-0">
      <header className="lg:w-1/5 sm:w-2/5 w-full border shrink-0 bg-white">
        {renderDashboard()}
      </header>
      <main className="p-4 sm:p-6 md:p-8 bg-white w-full max-w-full min-w-0 overflow-hidden border">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
