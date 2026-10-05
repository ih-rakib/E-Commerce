import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

import products from "../../data/products.json"
import ProductCard from "../shop/ProductCard";

const CategoryPage = () => {
    const { categoryName } = useParams();

    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const target = (categoryName || "").toLowerCase();
        const filtered = products.filter(product => (product.category || "").toLowerCase() === target);
        setFilteredProducts(filtered);
    }, [categoryName]);


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [categoryName])

    return (
        <>
            <section className="section__container bg-primary-light">
                <h2 className="section__header uppercase">{categoryName || 'Category'}</h2>
                <p className="section__subheader">Browse products in this category.</p>
            </section>

            {/* product card */}
            <div className="section__container">
                {filteredProducts.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">No products found in this category yet.</p>
                ) : (
                    <ProductCard products={filteredProducts}></ProductCard>
                )}
            </div>
        </>
    )
}

export default CategoryPage
