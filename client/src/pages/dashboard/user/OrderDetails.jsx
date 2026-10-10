import React from "react";
import { useSelector } from "react-redux";
import { useGetOrderByIdQuery } from "../../../redux/features/orders/orderApi";
import { useParams } from "react-router-dom";
import TimeLineSteps from "../../../components/TimeLineSteps";

const OrderDetails = () => {
  // const {user} = useSelector(state => state.auth);
  const { orderId } = useParams();
  const { data: order, error, isLoading } = useGetOrderByIdQuery(orderId);

  if (isLoading)
    return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div>No orders available!</div>;

  const isCompleted = (status) => {
    const allStatus = ["pending", "processing", "shipped", "completed"];
    return allStatus.indexOf(status) < allStatus.indexOf(order.status);
  };

  const isCurrent = (status) => order.status === status;

  const steps = [
    {
      status: "pending",
      label: "Pending",
      description: "Your order has been created and in pending",
      icon: {
        iconName: "time-line",
        bgColor: "red-500",
        textColor: "gray-800",
      },
    },
    {
      status: "processing",
      label: "Processing",
      description: "Your order is currently being processed",
      icon: {
        iconName: "loader-line",
        bgColor: "yellow-500",
        textColor: "yellow-800",
      },
    },
    {
      status: "shipped",
      label: "Shipped",
      description: "Your order has been shipped",
      icon: {
        iconName: "truck-line",
        bgColor: "blue-500",
        textColor: "blue-800",
      },
    },
    {
      status: "completed",
      label: "Completed",
      description: "Your order has been completed successfully",
      icon: {
        iconName: "check-line",
        bgColor: "green-500",
        textColor: "green-900",
      },
    },
  ];

  return (
    <section className="section__container rounded p-6">
      <h2 className="text-2xl font-semibold mb-4">Payment {order?.status}</h2>
      <p className="mb-4">Order id: {order?.orderId}</p>
      <p className="mb-8">Status: {order?.status}</p>

      <ol className="sm:flex items-center relative">
        {steps.map((step, index) => (
          <TimeLineSteps
            key={index}
            step={step}
            isCompleted={isCompleted(step.status)}
            isCurrent={isCurrent(step.status)}
            isLastStep={index === steps.length - 1}
            icon={step.icon}
            description={step.description}
            order={order}
          ></TimeLineSteps>
        ))}
      </ol>
    </section>
  );
};

export default OrderDetails;
