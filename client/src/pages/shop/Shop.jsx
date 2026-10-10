import { useEffect, useState } from "react";
// import productsData from "../../data/products.json";
import ProductCard from "./ProductCard";
import FilterProducts from "./FilterProducts";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";

const filters = {
  categories: [
    "all",
    "accessories",
    "jewellery",
    "cosmetics",
    "dress",
    "toys",
    "footwear",
    "bags",
    "tech",
    "hats-caps",
    "sunglasses",
  ],

  priceRange: [
    { label: "$0 - $50", min: 0, max: 50 },
    { label: "$50 - $100", min: 51, max: 100 },
    { label: "$100 - $150", min: 101, max: 150 },
    { label: "$150 & Above", min: 151, max: Infinity },
  ],
};

const Shop = () => {
  const [filteredState, setFilteredState] = useState({
    category: "all",
    priceRange: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(8);

  const { category, priceRange } = filteredState;
  const [minPrice, maxPrice] = priceRange.split("-").map(Number);

  const {
    data: { products = [], totalPages, totalProducts } = {},
    error,
    isLoading,
  } = useFetchAllProductsQuery({
    category: category !== "all" ? category : "",
    minPrice: isNaN(minPrice) ? "" : minPrice,
    maxPrice: isNaN(maxPrice) ? "" : maxPrice,
    page: currentPage,
    limit: productsPerPage,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <span> Error loading products</span>;

  const startingProduct = (currentPage - 1) * productsPerPage + 1;
  const endingProduct = Math.min(
    startingProduct + products.length - 1,
    totalProducts
  );

  // clear filter
  const clearFilters = () => {
    setFilteredState({
      category: "all",
      priceRange: "",
    });
  };

  // pagination
  const handlePageChange = (pageNo) => {
    if (pageNo > 0 && pageNo <= totalPages) {
      setCurrentPage(pageNo);
    }
  };

  return (
    <>
      <div className="mt-[110px]">
        <section className="section__container bg-primary-light">
          <h2 className="section__header uppercase">Shop Page</h2>
          <p className="section__subheader">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta odio
            earum corporis, nesciunt eligendi laboriosam.
          </p>
        </section>
      </div>

      <section className="section__container">
        <div className="flex flex-col md:flex-row md:gap-16 gap-8">
          {/* left: filter products */}
          <FilterProducts
            filters={filters}
            filteredState={filteredState}
            setFilteredState={setFilteredState}
            clearFilters={clearFilters}
          ></FilterProducts>

          {/* right: available products */}
          <div>
            <h3 className="text-xl font-medium mb-4">
              Showing {startingProduct} to {endingProduct} of {totalProducts}{" "}
              Products
            </h3>
            <ProductCard products={products}></ProductCard>

            {/* pagination controls */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  onClick={() => handlePageChange(index + 1)}
                  key={index}
                  className={`px-4 py-2 ${
                    currentPage === index + 1
                      ? "bg-slate-800 text-white"
                      : "bg-gray-300 text-gray-800"
                  } rounded-md mx-1`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;
