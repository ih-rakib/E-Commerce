import React, { useState, useEffect } from "react";
import { useUpdateOrderStatusMutation } from "../../../../redux/features/orders/orderApi";

const UpdateOrderModal = ({ order, isOpen, onClose }) => {
  const [status, setStatus] = useState(order?.status || "pending");
  const [updateOrderStatus, { isLoading, error }] =
    useUpdateOrderStatusMutation();

  useEffect(() => {
    if (order) {
      setStatus(order.status);
    }
  }, [order]);

  const handleUpdateOrderStatus = async () => {
    try {
      await updateOrderStatus({ id: order?._id, status });
      onClose();
    } catch (error) {
      console.error("Failed to update order status!", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-white p-4 rounded shadow-lg w-full sm:w-96">
        <h2 className="text-xl mb-4">Update Order Status</h2>

        {error && (
          <div className="text-red-500 text-sm mb-4">
            Something went wrong, please try again!
          </div>
        )}

        <div className="mb-4 space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 bg-gray-100 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2.5 px-5 focus:outline-none"
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="flex justify-end pt-5">
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateOrderStatus}
            disabled={isLoading}
            className={`${
              isLoading ? "bg-gray-400" : "bg-slate-700 hover:bg-slate-800"
            } text-white px-4 py-2 rounded ml-2`}
          >
            {isLoading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateOrderModal;
