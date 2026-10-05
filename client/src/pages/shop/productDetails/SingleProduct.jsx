import { Link, useParams } from "react-router-dom"
import { useState } from "react";
import Ratings from "../../../components/Ratings";
import { useDispatch } from "react-redux";
import { useFetchProductByIdQuery, useFetchRelatedProductsQuery } from "../../../redux/features/products/productsApi";
import { addToCart } from "../../../redux/features/cart/cartSlice";
import ReviewsCard from "../reviews/ReviewsCard";
import ProductCard from "../ProductCard";

const SingleProduct = () => {
    const { id } = useParams();

    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);

    const { data, error, isLoading } = useFetchProductByIdQuery(id, { skip: !id })
    const { data: relatedProducts = [] } = useFetchRelatedProductsQuery(id, { skip: !id });
    const singleProduct = data?.product || {}
    const productReviews = data?.reviews || []

    const handleAddToCart = (product) => {
        const qty = Math.max(1, Number(quantity) || 1);
        for (let i = 0; i < qty; i++) {
            dispatch(addToCart(product))
        }
    }

    if (isLoading) return <span className="section__container block text-center">Loading...</span>
    if (error) return <span className="section__container block text-center text-red-600">Error loading product...</span>
    if (!data?.product) return <span className="section__container block text-center">Product not found.</span>

    const price = Number(singleProduct?.price);

    return (
        <>
            <section className="section__container bg-primary-light">
                <h2 className="section__header uppercase">Single Product</h2>

                <div className="section__subheader space-x-2">
                    <span className="hover:text-primary"><Link to="/">home</Link></span>
                    <i className="ri-arrow-right-s-line"></i>
                    <span className="hover:text-primary"><Link to="/shop">shop</Link></span>
                    <i className="ri-arrow-right-s-line"></i>
                    <span className="hover:text-primary">{singleProduct?.name}</span>
                </div>
            </section>

            <section className="section__container mt-8">
                <div className="flex flex-col items-center md:flex-row gap-8">
                    {/* product image */}
                    <div className="md:w-1/2 w-full">
                        <img
                            src={singleProduct?.image || '/placeholder-product.png'}
                            alt={singleProduct?.name ? `${singleProduct.name} product image` : "product image"}
                            loading="lazy"
                            onError={(e) => { e.currentTarget.src = '/placeholder-product.png'; }}
                            className="rounded-md w-full h-auto aspect-square object-cover"
                        />
                    </div>

                    <div className="md:w-1/2 w-full">
                        <h3 className="text-2xl font-semibold mb-4">{singleProduct?.name}</h3>
                        <p className="text-xl text-primary mb-4">${Number.isFinite(price) ? price.toFixed(2) : '0.00'} {singleProduct?.oldPrice && <s className="text-gray-500 text-base">${Number(singleProduct?.oldPrice).toFixed(2)}</s>} </p>
                        <p className="text-gray-700 mb-4">{singleProduct?.description}</p>

                        {/* additional product info */}
                        <div className="flex flex-col space-y-2">
                            <p><strong>Category: </strong>{singleProduct?.category}</p>
                            <div className="flex gap-1 items-center">
                                <strong>Rating:</strong>
                                <Ratings rating={singleProduct?.rating}></Ratings>
                            </div>
                        </div>

                        {/* quantity selector */}
                        <div className="flex items-center gap-3 mt-6 flex-wrap">
                            <span className="font-medium">Quantity:</span>
                            <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="size-10 rounded bg-gray-200 hover:bg-slate-600 hover:text-white text-lg">-</button>
                            <span aria-live="polite" className="min-w-8 text-center">{quantity}</span>
                            <button type="button" aria-label="Increase quantity" onClick={() => setQuantity((q) => Math.min(99, q + 1))} className="size-10 rounded bg-gray-200 hover:bg-slate-600 hover:text-white text-lg">+</button>
                        </div>

                        <button onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(singleProduct)
                        }} className="mt-6 px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 w-full sm:w-auto">Add to Cart</button>
                    </div>
                </div>
            </section>

            {/* related products */}
            {relatedProducts.length > 0 && (
                <section className="section__container">
                    <h3 className="text-xl font-semibold mb-4">Related Products</h3>
                    <ProductCard products={relatedProducts.slice(0, 4)} />
                </section>
            )}

            {/* reviews */}
            <section className="section__container mt-8">
                <ReviewsCard productReviews={productReviews}></ReviewsCard>
            </section>
        </>
    )
}

export default SingleProduct
