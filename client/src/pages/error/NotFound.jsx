import { Link } from "react-router-dom";
import BackButton from "../../components/BackButton";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-center px-4 py-10">
      <h1 className="text-5xl sm:text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-600">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 mt-4 max-w-md text-sm sm:text-base">
        Sorry, the page you're looking for doesn't exist or has been moved. Try
        heading back to the homepage.
      </p>
      <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto max-w-xs sm:max-w-none">
        <BackButton
          label="Go back"
          variant="button"
        />
        <Link
          to="/"
          className="text-white bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
