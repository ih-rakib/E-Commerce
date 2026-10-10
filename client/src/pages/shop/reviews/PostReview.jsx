import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useFetchProductByIdQuery } from "../../../redux/features/products/productsApi";
import { usePostReviewMutation } from "../../../redux/features/reviews/reviewsApi";
import { toast } from "react-toastify";

const PostReview = ({ isModalOpen, handleCloseReviewModal }) => {
  const [rating, setRating] = useState(0);
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [comment, setComment] = useState("");

  const { refetch } = useFetchProductByIdQuery(id, { skip: !id });

  const [postReview] = usePostReviewMutation();

  const handleRating = (rating) => {
    setRating(rating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReview = {
      comment: comment,
      rating: rating,
      userId: user?._id,
      productId: id,
    };

    // console.log("Submitting review:", newReview);

    try {
      const response = await postReview(newReview).unwrap();
      toast("Review added!");
      setComment("");
      setRating(0);
      refetch();
    } catch (error) {
      console.error("Error posting review:", error);
      toast.error(
        "Something went wrong: " +
          (error.data?.message || error.message || "Unknown error")
      );
    }
    handleCloseReviewModal();
  };

  return (
    <div
      className={`fixed inset-0 bg-black/90 flex items-center justify-center z-40 px-2 ${
        isModalOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white p-6 rounded-md shadow-lg w-96 z-50">
        <h2 className="text-lg font-medium mb-4">Give a Review</h2>
        <div className="flex items-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              onClick={() => handleRating(star)}
              key={star}
              className="cursor-pointer text-yellow-500 text-lg"
            >
              {rating >= star ? (
                <i className="ri-star-fill"></i>
              ) : (
                <i className="ri-star-line"></i>
              )}
            </span>
          ))}
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
          className="w-full border border-r-gray-300 rounded-md mb-4 p-4 focus:outline-none"
        ></textarea>

        <div className="flex justify-end gap-2">
          <button
            onClick={handleCloseReviewModal}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostReview;
