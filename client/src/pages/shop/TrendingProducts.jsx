import { useState } from "react";
import ProductCard from "./ProductCard";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";

const TrendingProducts = () => {
    const [visibleProducts, setVisibleProducts] = useState(8);

    // Query to fetch products
    const { data: { products = [], totalProducts = 0 } = {}, error, isLoading } = useFetchAllProductsQuery({
        page: 1,
        limit: visibleProducts,
    });

    const loadMoreProducts = () => {
        setVisibleProducts((prev) => prev + 4);
    };

    if (isLoading) return <div className="section__container text-center">Loading...</div>;
    if (error) return <span className="section__container block text-center text-red-600">Error loading products</span>;

    const total = Number(totalProducts) || 0;

    return (
        <section className="section__container product__container">
            <h2 className="section__header">Trending Products</h2>
            <p className="section__subheader">Check out our most popular products right now.</p>

            {/* Product cards */}
            {products.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No trending products available.</p>
            ) : (
                <ProductCard products={products} />
            )}

            {/* Load more products */}
            <div className="product__btn">
                {total > 0 && visibleProducts < total && (
                    <button className="btn" onClick={loadMoreProducts}>Load More</button>
                )}
            </div>
        </section>
    );
};

export default TrendingProducts;
