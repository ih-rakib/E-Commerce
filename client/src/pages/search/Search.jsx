import { useMemo, useState } from "react"
import products from "../../data/products.json"
import ProductCard from "../shop/ProductCard";

const Search = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [submittedQuery, setSubmittedQuery] = useState("");

    const filteredProducts = useMemo(() => {
        const query = (submittedQuery || "").trim().toLowerCase();
        if (!query) return products;
        return products.filter(product =>
            (product.name || "").toLowerCase().includes(query) ||
            (product.description || "").toLowerCase().includes(query) ||
            (product.category || "").toLowerCase().includes(query)
        );
    }, [submittedQuery]);

    const handleSearch = (e) => {
        if (e) e.preventDefault();
        setSubmittedQuery(searchQuery);
    }

    return (
        <>
            <section className="section__container bg-primary-light">
                <h2 className="section__header uppercase">Search Products</h2>
                <p className="section__subheader">Search our catalogue by name, category or description.</p>
            </section>

            <section className="section__container">
                <form onSubmit={handleSearch} className="w-full mb-12 flex flex-col md:flex-row items-center justify-center gap-4" role="search">
                    <label htmlFor="site-search" className="sr-only">Search for products</label>
                    <input id="site-search" type="search" placeholder="Search for products" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full max-w-4xl p-2 min-h-[44px] border rounded focus:outline-none focus:ring-2 focus:ring-primary" />
                    <button type="submit" className="w-full md:w-auto py-2 px-8 min-h-[44px] bg-primary text-white rounded hover:bg-primary-dark">Search</button>
                </form>

                {submittedQuery && filteredProducts.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">No products found for &ldquo;{submittedQuery}&rdquo;.</p>
                ) : (
                    <ProductCard products={filteredProducts}></ProductCard>
                )}
            </section>
        </>
    )
}

export default Search
