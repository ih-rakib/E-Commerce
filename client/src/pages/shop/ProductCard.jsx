import { Link } from "react-router-dom";
import Ratings from "../../components/Ratings";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { useDispatch } from 'react-redux';

const getId = (product) => product?._id ?? product?.id;

const ProductCard = ({ products }) => {
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }

    if (!products) return <p className="text-center text-gray-500 py-8">Loading products...</p>;
    if (products.length === 0) return <p className="text-center text-gray-500 py-8">No products found. Try adjusting your filters.</p>;


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {
                products.map((product) => {
                    const pid = getId(product);
                    const price = Number(product.price);
                    return (
                    <div key={pid} className="product__card">
                        <div className="relative overflow-hidden rounded-md">
                            <Link to={`/shop/${pid}`} aria-label={`View ${product.name}`}>
                                <img src={product.image} alt={product.name ? `${product.name} product image` : "product image"} loading="lazy" className="w-full aspect-[3/4] object-cover hover:scale-105 transition-all duration-300" />
                            </Link>

                            <div className="absolute top-3 right-3">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleAddToCart(product)
                                    }}
                                    aria-label={`Add ${product.name || 'product'} to cart`}
                                ><i className="ri-shopping-cart-line bg-primary p-1.5 text-white hover:bg-primary-dark rounded"></i>

                                </button>
                            </div>
                        </div>

                        {/* product description */}
                        <div className="product__card__content">
                            <h4>{product.name}</h4>
                            <p>${Number.isFinite(price) ? price.toFixed(2) : '0.00'} {product.oldPrice ? <s>${Number(product.oldPrice).toFixed(2)}</s> : null}</p>

                            {/* rating (star) */}
                            <Ratings rating={product.rating}></Ratings>
                        </div>
                    </div>
                    );
                })
            }
        </div>
    )
}

export default ProductCard
