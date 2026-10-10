import React, { useState } from "react";
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
} from "../../../../redux/features/orders/orderApi";
import { formateDate } from "../../../../utils/formatDate";
import { Link } from "react-router-dom";
import UpdateOrderModal from "./UpdateOrderModal";

const ManageOrders = () => {
  const { data: orders, isLoading, error, refetch } = useGetAllOrdersQuery();
  //   console.log(data);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [deleteOrder] = useDeleteOrderMutation();

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleDeleteOrder = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (isConfirmed) {
      try {
        await deleteOrder(id).unwrap();
        alert("Order deleted successfully!");
        await refetch();
      } catch (error) {
        console.error("Error deleting order!", error);
        alert("Failed to delete the order");
      }
    } else {
      alert("Order deletion was canceled");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong, please try again!</div>;

  // get order status color
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-amber-400";
      case "processing":
        return "bg-blue-400";
      case "shipped":
        return "bg-green-400";
      case "completed":
        return "bg-black";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="container p-4 sm:p-6 min-w-0 max-w-full">
      <h3 className="font-semibold text-base text-blueGray-700 mb-4">
        Manage Orders
      </h3>
      <div className="overflow-x-auto -mx-1 sm:mx-0 rounded-md border border-gray-200 sm:border-0">
      <table className="min-w-full bg-white border border-gray-200 rounded-md text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-3 sm:py-3 sm:px-4 border-b whitespace-nowrap text-left">Order Id</th>
            <th className="py-2 px-3 sm:py-3 sm:px-4 border-b whitespace-nowrap text-left">Customer</th>
            <th className="py-2 px-3 sm:py-3 sm:px-4 border-b whitespace-nowrap text-left">Status</th>
            <th className="py-2 px-3 sm:py-3 sm:px-4 border-b whitespace-nowrap text-left">Date</th>
            <th className="py-2 px-3 sm:py-3 sm:px-4 border-b whitespace-nowrap text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order, index) => (
              <tr key={index}>
                <td className="py-2 px-3 sm:py-3 sm:px-4 border-b whitespace-nowrap break-all max-w-[140px] sm:max-w-none overflow-hidden text-ellipsis">{order?.orderId}</td>
                <td className="py-2 px-3 sm:py-3 sm:px-4 border-b whitespace-nowrap break-all max-w-[140px] sm:max-w-none overflow-hidden text-ellipsis">{order?.email}</td>
                <td className="py-2 px-3 sm:py-3 sm:px-4 border-b whitespace-nowrap">
                  <span
                    className={`inline-block px-2 text-xs text-white rounded-full ${getStatusColor(
                      order?.status
                    )}`}
                  >
                    {order?.status}
                  </span>
                </td>
                <td className="py-2 px-3 sm:py-3 sm:px-4 border-b whitespace-nowrap">
                  {formateDate(order?.updatedAt)}
                </td>
                <td className="py-2 px-3 sm:py-3 sm:px-4 border-b whitespace-nowrap">
                  {/* View Icon */}
                  <Link
                    to={`/orders/${order?._id}`}
                    className="mr-2 text-blue-500 hover:text-blue-700"
                  >
                    <i className="ri-eye-line text-lg"></i>
                  </Link>

                  {/* Edit Icon */}
                  <button
                    onClick={() => handleEditOrder(order)}
                    className="mr-2 text-green-500 hover:text-green-700"
                  >
                    <i className="ri-edit-2-line text-lg"></i>
                  </button>

                  {/* Delete Icon */}
                  <button
                    onClick={() => handleDeleteOrder(order?._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <i className="ri-delete-bin-6-line text-lg"></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      </div>

      {/* order modal */}
      {selectedOrder && (
        <UpdateOrderModal
          order={selectedOrder}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        ></UpdateOrderModal>
      )}
    </div>
  );
};

export default ManageOrders;
