import React, { useState } from "react";
import {
  useDeleteProductMutation,
  useFetchAllProductsQuery,
} from "../../../../redux/features/products/productsApi";
import { formateDate } from "../../../../utils/formatDate";
import { Link } from "react-router-dom";

const ManageProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(12);

  const {
    data: { products = [], totalPages, totalProducts } = {},
    isLoading,
    error,
    refetch,
  } = useFetchAllProductsQuery({
    category: "",
    minPrice: "",
    maxPrice: "",
    page: currentPage,
    limit: productPerPage,
  });

  //   console.log(products);

  // pagination
  const startProduct = (currentPage - 1) * productPerPage + 1;
  const endProduct = startProduct + products.length - 1;
  const handlePage = (pageNo) => {
    if (pageNo > 0 && pageNo <= totalPages) {
      setCurrentPage(pageNo);
    }
  };

  const [deleteProduct] = useDeleteProductMutation();
  const handleDeleteProduct = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (isConfirmed) {
      try {
        await deleteProduct(id).unwrap();
        alert("Product deleted successfully!");
        await refetch();
      } catch (error) {
        console.error("Error deleting product!", error);
        alert("Failed to delete the product");
      }
    } else {
      alert("Product deletion was canceled");
    }
  };

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error loading products!</div>}
      <section className="py-1 bg-blueGray-50">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">
                    All Products
                  </h3>
                </div>
              </div>
              <h3 className="text-sm my-2 text-gray-500 ml-4">
                Showing {startProduct} to {endProduct} of {totalProducts}{" "}
                products
              </h3>
            </div>

            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      #
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Product Name
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Published Date
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Edit
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {products?.map((product, index) => (
                    <tr key={index}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                        {index + 1}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {product?.name}
                      </td>
                      <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {formateDate(product?.createdAt)}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <Link to={`/dashboard/update-product/${product._id}`}>
                          <i class="ri-edit-2-line text-lg text-green-500 hover:text-green-800 cursor-pointer"></i>
                        </Link>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                        >
                          <i class="ri-delete-bin-6-line text-lg text-orange-600 hover:text-red-700 cursor-pointer"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* pagination */}
        <div className="mt-6 flex items-center justify-center">
          <button
            onClick={() => handlePage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
          >
            Prev
          </button>
          {Array(totalPages)
            .fill()
            .map((_, index) => (
              <button
                key={index}
                onClick={() => handlePage(index + 1)}
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
            onClick={() => handlePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2"
          >
            Next
          </button>
        </div>

        <footer className="relative pt-8 pb-6 mt-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center md:justify-between justify-center">
              <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                <div className="text-sm text-blueGray-500 font-semibold py-1">
                  Made with <strong>stress</strong> by Ikramul Hasan Rakib!
                </div>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </>
  );
};

export default ManageProducts;
