import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-600">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 mt-4 max-w-md">
        Sorry, the page you're looking for doesn't exist or has been moved. Try
        heading back to the homepage.
      </p>
      <Link
        to="/"
        className="mt-6 text-white bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
