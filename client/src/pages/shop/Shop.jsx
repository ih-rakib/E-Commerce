import { useEffect, useState } from "react"
import ProductCard from "./ProductCard"
import FilterProducts from "./FilterProducts"
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi"

const filters = {
    categories: ['all', 'accessories', 'jewellery', 'cosmetics', 'dress', 'toys', 'footwear', 'bags', 'hats-caps', 'sunglasses'],

    priceRange: [
        { label: '$0 - $50', min: 0, max: 50 },
        { label: '$50 - $100', min: 51, max: 100 },
        { label: '$100 - $150', min: 101, max: 150 },
        { label: '$150 & Above', min: 151, max: '' },
    ]
}

const Shop = () => {
    const [filteredState, setFilteredState] = useState({
        category: 'all',
        priceRange: ''
    })

    const [currentPage, setCurrentPage] = useState(1)
    const [productsPerPage] = useState(8)

    // Reset to page 1 whenever filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [filteredState.category, filteredState.priceRange]);

    const { category, priceRange } = filteredState;
    // priceRange format: "min - max" where max may be empty for open-ended
    const [minRaw, maxRaw] = priceRange ? priceRange.split('-').map(s => s.trim()) : [];
    const minPrice = minRaw !== undefined && minRaw !== '' && Number.isFinite(Number(minRaw)) ? Number(minRaw) : '';
    const maxPrice = maxRaw !== undefined && maxRaw !== '' && Number.isFinite(Number(maxRaw)) ? Number(maxRaw) : '';

    const { data: { products = [], totalPages = 1, totalProducts = 0 } = {}, error, isLoading } = useFetchAllProductsQuery({
        category: category !== 'all' ? category : '',
        minPrice,
        maxPrice,
        page: currentPage,
        limit: productsPerPage,
    })

    if (isLoading) return <div className="section__container text-center">Loading...</div>
    if (error) return <span className="section__container block text-center text-red-600"> Error loading products</span>

    const safeTotal = Number(totalProducts) || 0;
    const startingProduct = safeTotal === 0 ? 0 : (currentPage - 1) * productsPerPage + 1;
    const endingProduct = Math.min(startingProduct + products.length - 1, safeTotal);


    // clear filter
    const clearFilters = () => {
        setFilteredState({
            category: 'all',
            priceRange: ''
        })
    }

    // pagination
    const handlePageChange = (pageNo) => {
        const total = Number(totalPages) || 1;
        if (pageNo > 0 && pageNo <= total) {
            setCurrentPage(pageNo)
        }
    }

    const pageCount = Number.isFinite(Number(totalPages)) && Number(totalPages) > 0 ? Number(totalPages) : 1;

    return (
        <>
            <section className="section__container bg-primary-light">
                <h2 className="section__header uppercase">Shop Page</h2>
                <p className="section__subheader">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta odio earum corporis, nesciunt eligendi laboriosam.</p>
            </section>

            <section className="section__container">
                <div className="flex flex-col md:flex-row md:gap-16 gap-8">
                    {/* left: filter products */}
                    <FilterProducts filters={filters} filteredState={filteredState} setFilteredState={setFilteredState} clearFilters={clearFilters}></FilterProducts>

                    {/* right: available products */}
                    <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-medium mb-4">Showing {startingProduct} to {endingProduct} of {safeTotal} Products</h3>
                        <ProductCard products={products}></ProductCard>

                        {/* pagination controls */}
                        <div className="mt-6 flex justify-center flex-wrap gap-2">
                            <button type="button" aria-label="Previous page" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2 disabled:opacity-50">prev</button>

                            {
                                [...Array(pageCount)].map((_, index) => (
                                    <button type="button" aria-label={`Go to page ${index + 1}`} aria-current={currentPage === index + 1 ? "page" : undefined} onClick={() => handlePageChange(index + 1)} key={index} className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-slate-800 text-white' : 'bg-gray-300 text-gray-800'} rounded-md mx-1`}>{index + 1}</button>
                                ))
                            }

                            <button type="button" aria-label="Next page" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === pageCount} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2 disabled:opacity-50">next</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Shop
