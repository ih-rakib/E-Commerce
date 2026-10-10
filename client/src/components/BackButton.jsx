import { useNavigate } from "react-router-dom";

/**
 * Back button that returns to the previous page, falling back to
 * `fallback` (default "/") when there is no in-app history
 * (e.g. page opened directly via URL or refresh).
 */
const BackButton = ({ label = "Back", fallback = "/", variant = "link", className = "" }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  };

  const styles =
    variant === "button"
      ? "bg-gray-500 text-white hover:bg-gray-600 px-6 py-2 rounded-lg"
      : "text-gray-600 hover:text-primary";

  return (
    <button
      type="button"
      onClick={handleBack}
      aria-label="Go back to previous page"
      className={`inline-flex items-center gap-1.5 text-sm font-medium transition ${styles} ${className}`}
    >
      <i className="ri-arrow-left-line" aria-hidden="true"></i>
      {label}
    </button>
  );
};

export default BackButton;
