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
import {articleApi} from "./api/article.api";
import {imageApi} from "./api/image.api";
import {reducer as filterReducer} from "./slices/filter.slice";
import {commentApi} from "./api/comment.api";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: [userApi.reducerPath, authApi.reducerPath, articleApi.reducerPath, imageApi.reducerPath, commentApi.reducerPath, filterReducer]
}

const reducers = combineReducers({
    filter: filterReducer,
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [articleApi.reducerPath]: articleApi.reducer,
    [imageApi.reducerPath]: imageApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
})

const persistRedusers = persistReducer(persistConfig, reducers)

export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(userApi.middleware).concat(authApi.middleware).concat(articleApi.middleware).concat(imageApi.middleware).concat(commentApi.middleware)
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>