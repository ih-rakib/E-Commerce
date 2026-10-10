import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useFetchProductByIdQuery } from "../../../redux/features/products/productsApi";
import { usePostReviewMutation } from "../../../redux/features/reviews/reviewsApi";
import { toast } from "react-toastify";

const PostReview = ({ isModalOpen, handleCloseReviewModal }) => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [comment, setComment] = useState("");
  const [formError, setFormError] = useState("");

  const { refetch } = useFetchProductByIdQuery(id, { skip: !id });

  const [postReview, { isLoading }] = usePostReviewMutation();

  const handleRating = (value) => {
    setRating(value);
    if (value > 0) setFormError("");
  };

  const closeAndReset = () => {
    setFormError("");
    handleCloseReviewModal();
  };

  const handleKeyDown = (e, star) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleRating(star);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?._id) {
      setFormError("Please log in to post a review.");
      return;
    }
    if (!rating || rating < 1 || rating > 5) {
      setFormError("Please select a rating between 1 and 5 stars.");
      return;
    }
    if (!comment.trim()) {
      setFormError("Please write a comment.");
      return;
    }

    const newReview = {
      comment: comment.trim(),
      rating: rating,
      userId: user?._id,
      productId: id,
    };

    try {
      await postReview(newReview).unwrap();
      toast("Review added!");
      setComment("");
      setRating(0);
      setFormError("");
      refetch();
      handleCloseReviewModal();
    } catch (error) {
      console.error("Error posting review:", error);
      const message = error.data?.message || error.message || "Failed to post review";
      setFormError(message);
      toast.error("Something went wrong: " + message);
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black/60 flex items-center justify-center z-40 px-4 ${
        isModalOpen ? "block" : "hidden"
      }`}
      onClick={closeAndReset}
      role="dialog"
      aria-modal="true"
      aria-label="Give a review"
    >
      <div
        className="bg-white p-6 rounded-md shadow-lg w-full max-w-md z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-medium mb-4">Give a Review</h2>
        {!user && (
          <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded p-2 mb-4">
            Please log in to post a review.
          </p>
        )}
        <div className="flex items-center mb-4" role="radiogroup" aria-label="Select rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              onClick={() => handleRating(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              onKeyDown={(e) => handleKeyDown(e, star)}
              key={star}
              aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
              aria-checked={rating === star}
              role="radio"
              className="cursor-pointer text-yellow-500 text-2xl p-1 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
            >
              {(hovered || rating) >= star ? (
                <i className="ri-star-fill"></i>
              ) : (
                <i className="ri-star-line"></i>
              )}
            </button>
          ))}
        </div>

        <label htmlFor="review-comment" className="sr-only">
          Your review
        </label>
        <textarea
          id="review-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
          placeholder="Share your thoughts..."
          className="w-full border border-gray-300 rounded-md mb-2 p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
        ></textarea>

        {formError && (
          <p role="alert" className="text-sm text-red-600 mb-3">
            {formError}
          </p>
        )}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={closeAndReset}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-4 py-2 bg-green-500 text-white rounded-md disabled:opacity-60"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostReview;
