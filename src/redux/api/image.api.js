import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const BASE_URL_IMAGE = "http://localhost:8080/api/v1/image";

export const imageApi = createApi({
    reducerPath: 'imageApi',
    tagTypes: ['Image'],
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL_IMAGE,
        credentials: "include"
    }),
    endpoints: (builder) => ({
        getImage: builder.mutation({
            query: (imageId) => ({
                url: `/${imageId}`,
                method: 'POST'
            })
        })
    })
});
export const {useGetImageMutation} = imageApi;