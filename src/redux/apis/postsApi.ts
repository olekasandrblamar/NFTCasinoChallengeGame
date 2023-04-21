import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper';

type QueryArgs = {
    region: string;
    name: string;
    tag: string;
}

export const postsApi = createApi({
    reducerPath: 'postsApi',
    keepUnusedDataFor: 60 * 60,
    tagTypes:['Posts'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://6396aee2a68e43e41808fa18.mockapi.io/api'
    }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
          return action.payload[reducerPath]
        }
    },
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => `posts?page=1&limit=5`
        }),
        getPostsLimit: builder.query({
            query: (limit) => `posts?page=1&limit=${limit}`
        }),
        getFilteredPosts: builder.query({
            query: (query) => `posts?filter=${query}`
        }),
        getPost: builder.query({
            query: (id) => `posts/${id}`
        })
    })
})

export const {
    useGetPostsQuery,
    useGetPostQuery,
    useGetFilteredPostsQuery,
    useGetPostsLimitQuery,
    util: { getRunningQueriesThunk },
  } = postsApi;

export const {getPosts, getFilteredPosts, getPost, getPostsLimit} = postsApi.endpoints