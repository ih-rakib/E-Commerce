import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../../utils/baseURL';


const reviewsApi = createApi({
    reducerPath: 'reviewsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/reviews`,
        credentials: 'include'
    }),
    tagTypes: ["Reviews"],

    endpoints: (builder) => ({
        postReview: builder.mutation({
            query: (reviewData) => ({
                url: "/post-review",
                method: "POST",
                body: reviewData,
                credentials: "include",
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Reviews", id: arg?.productId ?? arg?.postId ?? "LIST" },
            ]
        }),

        getReviewCount: builder.query({
            query: () => ({
                url: "/total-reviews"
            })
        }),

        getReviewByUserId: builder.query({
            query: (userId) => ({
                url: `/${userId}`,
                credentials: "include",
            }),
            providesTags: (result, error, userId) => [{ type: "Reviews", id: userId }]
        })
    })
})

export const { usePostReviewMutation, useGetReviewCountQuery, useGetReviewByUserIdQuery } = reviewsApi

export default reviewsApi