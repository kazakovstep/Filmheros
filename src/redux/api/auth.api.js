import {userApi} from "./user.api";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:8080";

export const authApi = createApi({
    reducerPath: 'authApi',
    tagTypes: ['Authorization'],
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL
    }),
    endpoints: builder => ({
        login: builder.mutation({
            query: (user) => ({
                body: user,
                url: "/auth",
                method: 'POST'
            })
        })
    })
})

export const {useLoginMutation} = authApi