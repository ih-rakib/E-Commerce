import { useState } from "react"
import products from "../../data/products.json"
import ProductCard from "../shop/ProductCard";

const Search = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState(products)

    const handleSearch = () => {
        const query = searchQuery.toLowerCase();

        const filtered = products.filter(product => product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query))
        setFilteredProducts(filtered);
    }

    return (
        <>
            <section className="section__container bg-primary-light">
                <h2 className="section__header uppercase">Search Products</h2>
                <p className="section__subheader">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta odio earum corporis, nesciunt eligendi laboriosam.</p>
            </section>

            <section className="section__container">
                <div className="w-full mb-12 flex flex-col md:flex-row items-center justify-center gap-4">
                    <input type="text" placeholder="Search for products" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-bar w-full max-w-4xl p-2 border rounded" />
                    <button className="search-button w-full md:w-auto py-2 px-8 bg-primary text-white rounded" onClick={handleSearch}>Search</button>
                </div>

                <ProductCard products={filteredProducts}></ProductCard>
            </section>
        </>
    )
}

export default Search