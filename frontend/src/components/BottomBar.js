import { useDispatch } from "react-redux";
import React from "react";

import {
  HiOutlineBell,
  HiOutlineHome,
  HiOutlineSearch,
  HiOutlinePencil,
} from "react-icons/hi";

import { IoMailOutline } from "react-icons/io5";

import { openModal, changeModalContent } from "../store/modalSlice";

function BottomBar() {
  const dispatch = useDispatch();

  function openModalHandler(e) {
    const buttonText = e.target.textContent;
    dispatch(changeModalContent(buttonText));
    dispatch(openModal());
  }

  return (
    <div className="sm:hidden">
      <button className="fixed bottom-16 right-6 bg-primaryColor p-4 rounded-full xl:hidden mt-4">
        <HiOutlinePencil className="w-5 h-5 text-white" />
      </button>
      <div className="w-full bg-white border-t border-greyBorder fixed bottom-0 p-3 sm:py-2">
        <div className="flex justify-around items-center">
          <HiOutlineHome className="w-6 h-6" />
          <HiOutlineSearch className="w-6 h-6" />
          <HiOutlineBell className="w-6 h-6" />
          <IoMailOutline className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

export default BottomBar;
