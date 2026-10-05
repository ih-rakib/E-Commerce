import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../../utils/baseURL';

const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/products`,
        credentials: 'include'
    }),
    tagTypes: ["Products"],
    endpoints: (builder) => ({
        fetchAllProducts: builder.query({
            query: ({ category, minPrice, maxPrice, page = 1, limit = 10 } = {}) => {
                const queryParams = new URLSearchParams();
                if (category) queryParams.set('category', String(category));
                if (minPrice !== undefined && minPrice !== null && minPrice !== '' && Number.isFinite(Number(minPrice))) {
                    queryParams.set('minPrice', String(minPrice));
                }
                if (maxPrice !== undefined && maxPrice !== null && maxPrice !== '' && Number.isFinite(Number(maxPrice))) {
                    queryParams.set('maxPrice', String(maxPrice));
                }
                queryParams.set('page', String(page));
                queryParams.set('limit', String(limit));
                const qs = queryParams.toString();
                return qs ? `/?${qs}` : '/';
            },
            providesTags: ["Products"]
        }),

        fetchProductById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: "Products", id }]
        }),

        addProduct: builder.mutation({
            query: (newProduct) => ({
                url: "/create-product",
                method: "POST",
                body: newProduct,
                credentials: "include"
            }),
            invalidatesTags: ["Products"]
        }),

        fetchRelatedProducts: builder.query({
            query: (id) => `/related/${id}`
        }),

        updateProduct: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/update-product/${id}`,
                method: "PATCH",
                body: rest,
                credentials: "include"
            }),
            invalidatesTags: ["Products"]
        }),

        deleteProduct: builder.mutation({
            query: ({ id }) => ({
                url: `/${id}`,
                method: "DELETE",
                credentials: "include"
            }),
            invalidatesTags: (result, error, id) => [{ type: "Products", id }]
        }),
    })
});

export const {
    useFetchAllProductsQuery,
    useFetchProductByIdQuery,
    useAddProductMutation,
    useFetchRelatedProductsQuery,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productsApi;

export default productsApi; 