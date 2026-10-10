import { Link, useParams } from "react-router-dom";
import Ratings from "../../../components/Ratings";
import { useDispatch } from "react-redux";
import { useFetchProductByIdQuery } from "../../../redux/features/products/productsApi";
import { addToCart } from "../../../redux/features/cart/cartSlice";
import ReviewsCard from "../reviews/ReviewsCard";
import { toast } from "react-toastify";

const SingleProduct = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { data, error, isLoading } = useFetchProductByIdQuery(id);
  const singleProduct = data?.product || {};
  const productReviews = data?.reviews || {};

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product?.name} added to cart`);
  };

  // console.log({ data, error, isLoading });

  if (isLoading) return <span>Loading...</span>;
  if (error) return <span>Error loading product...</span>;

  return (
    <>
      <div className="mt-[110px]">
        <section className="section__container bg-primary-light">
          <h2 className="section__header uppercase">Single Product</h2>

          <div className="section__subheader space-x-2">
            <span className="hover:text-primary">
              <Link to="/">home</Link>
            </span>
            <i className="ri-arrow-right-s-line"></i>
            <span className="hover:text-primary">
              <Link to="/shop">shop</Link>
            </span>
            <i className="ri-arrow-right-s-line"></i>
            <span className="hover:text-primary">{singleProduct?.name}</span>
          </div>
        </section>
      </div>

      <section className="section__container mt-8">
        <div className="flex flex-col items-center md:flex-row gap-8">
          {/* product image */}
          <div className="md:w-1/2 w-full">
            <img
              src={singleProduct?.image}
              alt="product image"
              className="rounded-md w-full h-auto"
            />
          </div>

          <div className="md:w-1/2 w-full">
            <h3 className="text-2xl font-semibold mb-4">
              {singleProduct?.name}
            </h3>
            <p className="text-xl text-primary mb-4">
              ${singleProduct?.price}{" "}
              {singleProduct?.oldPrice && <s>${singleProduct?.oldPrice}</s>}{" "}
            </p>
            <p className="text-gray-700 mb-4">{singleProduct?.description}</p>

            {/* additional product info */}
            <div className="flex flex-col space-y-2">
              <p>
                <strong>Category: </strong>
                {singleProduct?.category}
              </p>
              <div className="flex gap-1 items-center">
                <strong>Rating:</strong>
                <Ratings rating={singleProduct?.rating}></Ratings>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(singleProduct);
              }}
              className="mt-6 px-6 py-3 bg-green-500 text-white rounded-md"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </section>

      {/* reviews */}
      <section className="section__container mt-8">
        <ReviewsCard productReviews={productReviews}></ReviewsCard>
      </section>
    </>
  );
};

export default SingleProduct;
