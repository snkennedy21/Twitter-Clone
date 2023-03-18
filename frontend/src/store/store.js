import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { modalSlice } from "./modalSlice";
import { tokenSlice } from "./tokenSlice";

import { mainApi } from "./mainApi";

export const store = configureStore({
  reducer: {
    [mainApi.reducerPath]: mainApi.reducer,
    [modalSlice.name]: modalSlice.reducer,
    [tokenSlice.name]: tokenSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainApi.middleware),
});

export const modalActions = modalSlice.actions;
export const tokenActions = tokenSlice.actions;

setupListeners(store.dispatch);
