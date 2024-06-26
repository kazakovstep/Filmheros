import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {useEffect} from "react";

const BASE_URL = `http://${process.env.REACT_APP_API_URL}`;

export const authApi = createApi({
    reducerPath: 'authApi',
    tagTypes: ['Authorization'],
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: "include"
    }),
    endpoints: builder => ({
        login: builder.mutation({
            query: (user) => ({
                body: user,
                headers: {
                  'Content-Type': 'application/json'
                },
                url: "/auth",
                method: 'POST'
            })
        }),
        addUser: builder.mutation({
            query: (user) => ({
                body: user,
                headers: {
                    'Content-Type': 'application/json'
                },
                url: "/registration",
                method: 'POST'
            })
        }),
        logout: builder.mutation({
            query: () => ({
                method: 'POST',
                url: "/logout"
            })
        })
    })
})
export const {useLoginMutation, useAddUserMutation, useLogoutMutation} = authApi