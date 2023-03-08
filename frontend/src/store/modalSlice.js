import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
    openModal: (state) => {
      console.log("hello");
      state.isModalOpen = true;
      console.log(state.isModalOpen);
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
