import React, { useEffect, useState } from "react";
import { getBaseUrl } from "../utils/baseURL";
import TimeLineSteps from "./TimeLineSteps";

const PaymentSuccess = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const sessionId = query.get("session_id");

    if (sessionId) {
      fetch(`${getBaseUrl()}/api/orders/confirm-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ session_id: sessionId }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          //   console.log("API Response:", data);
          setOrder(data);
        })
        .catch((error) => console.error("Error during payment! ", error));
    }
  }, []);

  //   console.log(order);

  if (!order) {
    return <div>Loading...</div>;
  }

  const isCompleted = (status) => {
    const allStatus = ["pending", "processing", "shipped", "completed"];
    return allStatus.indexOf(status) < allStatus.indexOf(order.status);
  };

  const isCurrent = (status) => order.status === status;

  const steps = [
    {
      status: "pending",
      label: "Pending",
      description:
        "Your order has been created and now in the line of processing",
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
    <div className="mt-[200px]">
      <section className="section__container rounded p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Payment: {order?.status}
        </h2>
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
    </div>
  );
};

export default PaymentSuccess;
