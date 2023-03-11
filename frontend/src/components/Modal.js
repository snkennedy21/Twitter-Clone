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
        <div className="bg-white w-full h-screen sm:h-5/6 sm:max-h-[600px] relative sm:rounded-2xl sm:w-[600px] z-40 overflow-hidden overflow-y-scroll pb-4">
          <div className="flex sticky top-0 z-50">
            <div className="flex w-1/2 justify-between z-50 bg-white py-3 pl-3">
              <HiXMark onClick={closeModalHandler} className="h-6 w-6" />

              <FaTwitter className="h-8 w-8 text-primaryColor translate-x-1/2" />
            </div>
            <div className="bg-white w-1/2 sticky"></div>
          </div>
          {children}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Modal;
