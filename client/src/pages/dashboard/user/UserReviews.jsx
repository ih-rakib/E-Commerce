import React from "react";
import { useSelector } from "react-redux";
import { useGetReviewByUserIdQuery } from "../../../redux/features/reviews/reviewsApi";
import { useNavigate } from "react-router-dom";

const UserReviews = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    data: reviews,
    isLoading,
    error,
  } = useGetReviewByUserIdQuery(user?._id);

  const navigate = useNavigate();

  if (isLoading)
    return <div className="text-center text-gray-500">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-500">Error fetching reviews!</div>
    );

  const handleCard = () => {
    navigate("/shop");
  };

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold mb-4">Reviews: {reviews.length}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-8 gap-7">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 border-gray-200 cursor-pointer hover:scale-105 transition-all duration-200"
          >
            <p className="text-lg font-semibold mb-2">
              Rating: {review?.rating}
            </p>
            <p className="mb-2">
              <strong>Comment: </strong> {review?.comment}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Product Id: </strong> {review?.productId}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Date: </strong>{" "}
              {new Date(review?.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
        <div
          onClick={handleCard}
          className="bg-gray-100 text-black flex items-center justify-center rounded-lg p-6 border cursor-pointer hover:bg-gray-400 hover:text-white transition-all duration-200"
        >
          <span className="text-2xl mr-3">+</span>
          <p>Add New Review</p>
        </div>
      </div>
    </div>
  );
};

export default UserReviews;
