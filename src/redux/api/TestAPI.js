import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://10.192.210.210:8080/api/v1/users/welcome"

export const TestAPI = createApi({
    reducerPath: "TestAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL
    }),
    endpoints: (builder) => ({
        getTest: builder.query({query: () => ''})
    })
})

export const {useGetTestQuery} = TestAPI