import {configureStore} from "@reduxjs/toolkit";
import {TestAPI} from "./api/TestAPI";

export const store = configureStore({
    reducer: {
        [TestAPI.reducerPath]: TestAPI.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(TestAPI.middleware),
    devTools: process.env.NODE_ENV !== "production"
})

export type RootState = ReturnType<typeof store.getState>