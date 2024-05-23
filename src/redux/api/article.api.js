import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const BASE_URL_ARTICLE = `http://${process.env.REACT_APP_API_URL}/api/v1/articles`;

export const articleApi = createApi({
    reducerPath: 'articleApi',
    tagTypes: ['Article'],
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL_ARTICLE,
        credentials: "include"
    }),
    endpoints: (builder) => ({
        addArticle: builder.mutation({
            query: (article) => ({
                body: article,
                headers: {
                    'Content-Type': 'application/json'
                },
                url: "/add",
                method: 'POST'
            })
        }),
        getAllArticles: builder.query({
            query: () => "/all"
        }),
        getArticle: builder.query({
            query: (articleId) => `/${articleId}`
        }),
        getFilteredArticles: builder.mutation({
            query: (info) => ({
                body: info,
                headers: {
                    'Content-Type': 'application/json'
                },
                url: "/filter",
                method: 'POST'
            })
        }),
        doLike: builder.mutation({
            query: (id) => ({
                url: `/like?id=${id}`,
                method: 'POST'
            })
        }),
        doDislike: builder.mutation({
            query: (id) => ({
                url: `/dislike?id=${id}`,
                method: 'POST'
            })
        })
    })
});
export const {
    useAddArticleMutation,
    useGetAllArticlesQuery,
    useGetArticleQuery,
    useGetFilteredArticlesMutation,
    useDoLikeMutation,
    useDoDislikeMutation
} = articleApi;