import React from "react";
import { useState, useEffect } from "react";
import { HiXMark } from "react-icons/hi2";
import { FaTwitter } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../store/modalSlice";

function Modal({ children }) {
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
  const dispatch = useDispatch();

  function closeModalHandler() {
    dispatch(closeModal());
  }

  return (
    <React.Fragment>
      <div
        className={` bg-[#000000] opacity-40 absolute top-0 left-0 right-0 z-40 w-full h-screen flex items-center justify-center ${
          isModalOpen ? "" : "hidden"
        }`}
      ></div>
      <div
        className={`z-50 w-full absolute flex justify-center items-center h-screen ${
          isModalOpen ? "" : "hidden"
        }`}
      >
        <div className="bg-white w-full h-screen p-3 relative sm:rounded-2xl sm:w-[600px] sm:max-h-[650px] z-50 overflow-y-scroll">
          <HiXMark
            onClick={closeModalHandler}
            className="absolute top-4 left-4 h-6 w-6"
          />
          <div className="flex justify-center">
            <FaTwitter className="h-8 w-8 text-primaryColor" />
          </div>
          {children}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Modal;
