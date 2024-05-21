import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const BASE_URL_USERS = "http://localhost:8080/api/v1/users";

export const userApi = createApi({
    reducerPath: 'userApi',
    tagTypes: ['User'],
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL_USERS
    }),
    endpoints: (builder) => ({
        addUser: builder.mutation({
            query: (user) => ({
                body: user,
                url: "/add",
                method: 'POST'
            })
        })
    })
});
export const {useAddUserMutation} = userApi;

export interface User {
    userId: number;
    userName: string;
    email: string;
    password: string;
    photo: string;
    roles: string;
}