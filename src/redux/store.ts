import { postsApi } from "./apis/postsApi";
import { playersApi } from "./apis/playersApi";
import playersSlice from "./slices/playersSlice";
import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

export const makeStore = () => configureStore({
  reducer: {
    players: playersSlice,
    [playersApi.reducerPath]: playersApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat( playersApi.middleware ).concat( postsApi.middleware )
});

export type AppDispatch = AppStore["dispatch"];
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export const wrapper = createWrapper<AppStore>(makeStore);
