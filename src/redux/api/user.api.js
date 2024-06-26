import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const BASE_URL_USERS = `http://${process.env.REACT_APP_API_URL}/api/v1/users`;

export const userApi = createApi({
    reducerPath: 'userApi',
    tagTypes: ['User'],
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL_USERS,
        credentials: "include"
    }),
    endpoints: (builder) => ({
        getCurrentUser: builder.query({
            query: () => ({
                url: `/user`
            })
        }),
        getUser: builder.query({
            query: (userId) => ({
                url: `/${userId}`
            })
        }),
        getMyArticle: builder.query({
            query: () => "/my-articles"
        }),
        updateUser: builder.mutation({
            query: (user) => ({
                url: `/change`,
                body: user,
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'PUT'
            })
        }),
        getLikedArticle: builder.query({
            query: () => "/liked-articles"
        })
    })
});
export const {useGetCurrentUserQuery, useGetMyArticleQuery, useUpdateUserMutation, useGetLikedArticleQuery, useGetUserQuery} = userApi;