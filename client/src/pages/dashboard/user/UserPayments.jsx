import React from "react";
import { useSelector } from "react-redux";
import { useGetOrdersByEmailQuery } from "../../../redux/features/orders/orderApi";

const UserPayments = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    data: ordersData,
    isLoading,
    error,
  } = useGetOrdersByEmailQuery(user?.email);

  if (isLoading)
    return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div>No orders found!</div>;

  const orders = ordersData.orders || {};
  const totalPayments = orders.reduce((acc, order) => acc + order.amount, 0);
  return (
    <div className="py-6 px-4 min-w-0 max-w-full">
      <h3 className="text-lg sm:text-xl font-semibold mb-4">Total Payments</h3>
      <div className="min-w-0">
        <p className="text-base sm:text-lg font-medium text-gray-800 mb-5 break-words">
          Total Spent: ${totalPayments ? totalPayments : 0}
        </p>
        <ul>
          {orders &&
            orders.map((item, index) => (
              <li key={index}>
                <h5 className="font-medium text-gray-800 mb-2">
                  Order: {index + 1}
                </h5>
                <div>
                  <span className="text-gray-600">
                    Amount: ${item?.amount?.toFixed(2)}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center items-start gap-1 sm:gap-0 sm:space-x-2 min-w-0">
                  <span className="break-words">{new Date(item?.createdAt).toLocaleString()} <span className="hidden sm:inline">|</span></span>
                  <p className="text-gray-600">
                    status:
                    <span
                      className={`ml-2 py-0.5 px-1 text-sm rounded ${
                        item?.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : item?.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : item?.status === "processing"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-indigo-100 text-indigo-700"
                      }`}
                    >
                      {item?.status}
                    </span>
                  </p>
                </div>
                <hr className="my-2" />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default UserPayments;
