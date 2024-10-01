import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

import products from "../../data/products.json"
import ProductCard from "../shop/ProductCard";

const CategoryPage = () => {
    const { categoryName } = useParams();

    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const filtered = products.filter(product => product.category.toLowerCase() === categoryName.toLowerCase());
        setFilteredProducts(filtered);
    }, [categoryName]);


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <section className="section__container bg-primary-light">
                <h2 className="section__header uppercase">{categoryName}</h2>
                <p className="section__subheader">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta odio earum corporis, nesciunt eligendi laboriosam.</p>
            </section>

            {/* product card */}
            <div className="section__container">
                <ProductCard products={filteredProducts}></ProductCard>
            </div>
        </>
    )
}

export default CategoryPage