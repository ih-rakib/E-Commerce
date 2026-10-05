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

    if (isLoading) return (
        <div className="section__container" aria-busy="true" aria-label="Loading trending products">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="skeleton-card">
                        <div className="skeleton aspect-[3/4] w-full !rounded-none" />
                        <div className="p-4 space-y-2">
                            <div className="skeleton h-4 w-3/4" />
                            <div className="skeleton h-4 w-1/2" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
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
