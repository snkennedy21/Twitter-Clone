import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  modalContent: "",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
    changeModalContent: (state, action) => {
      state.modalContent = action.payload;
    },
  },
});

export const { openModal, closeModal, changeModalContent } = modalSlice.actions;
