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
            <section className="section__container bg-primary-light !py-8 sm:!py-12">
                <h2 className="section__header uppercase break-words">{categoryName || 'Category'}</h2>
                <p className="section__subheader px-2">Browse products in this category.</p>
            </section>

            {/* product card */}
            <div className="section__container !pt-8 sm:!pt-12 min-w-0 max-w-full overflow-hidden">
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
