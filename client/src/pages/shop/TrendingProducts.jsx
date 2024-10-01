import { useState } from "react";
import ProductCard from "./ProductCard";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";

const TrendingProducts = () => {
    const [visibleProducts, setVisibleProducts] = useState(8);

    // Query to fetch products
    const { data: { products = [], totalProducts = 0 } = {}, error, isLoading } = useFetchAllProductsQuery({
        limit: visibleProducts,
    });

    const loadMoreProducts = () => {
        setVisibleProducts((prev) => prev + 5);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <span>Error loading products</span>;

    return (
        <section className="section__container product__container">
            <h2 className="section__header">Trending Products</h2>
            <p className="section__subheader">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius corporis sicing elit. Eius corporissicing elit. Eius corporis</p>

            {/* Product cards */}
            <ProductCard products={products.slice(0, visibleProducts)} />

            {/* Load more products */}
            <div className="product__btn">
                {visibleProducts < totalProducts && (
                    <button className="btn" onClick={loadMoreProducts}>Load More</button>
                )}
            </div>
        </section>
    );
};

export default TrendingProducts;
