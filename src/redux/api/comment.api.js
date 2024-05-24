import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const BASE_URL_COMMENT = `http://${process.env.REACT_APP_API_URL}/api/v1/comments`;

export const commentApi = createApi({
    reducerPath: 'commentApi',
    tagTypes: ['Comment'],
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL_COMMENT,
        credentials: "include"
    }),
    endpoints: (builder) => ({
        addComment: builder.mutation({
            query: (comment) => ({
                body: comment,
                headers: {
                    'Content-Type': 'application/json'
                },
                url: "/add",
                method: 'POST'
            })
        }),
        likeComment: builder.mutation({
            query: (commentId) => ({
                url: `/like/${commentId}`,
                method: 'POST'
            })
        }),
        dislikeComment: builder.mutation({
            query: (commentId) => ({
                url: `/dislike/${commentId}`,
                method: 'POST'
            })
        }),
        deleteLike: builder.mutation({
            query: (commentId) => ({
                url: `/deletelike/${commentId}`,
                method: 'POST'
            })
        }),
        deleteDislike: builder.mutation({
            query: (commentId) => ({
                url: `/deletedislike/${commentId}`,
                method: 'POST'
            })
        })
    })
});
export const {
    useAddCommentMutation,
    useLikeCommentMutation,
    useDislikeCommentMutation,
    useDeleteLikeMutation,
    useDeleteDislikeMutation,
} = commentApi;