import {userApi} from "./api/user.api";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {authApi} from "./api/auth.api";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: [userApi.reducerPath, authApi.reducerPath]
}

const reducers = combineReducers({
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer
})

const persistRedusers = persistReducer(persistConfig, reducers)

export const store = configureStore({
    reducer: persistRedusers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(userApi.middleware).concat(authApi.middleware)
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>