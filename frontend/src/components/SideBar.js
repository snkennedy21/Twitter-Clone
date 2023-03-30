import { FaTwitter } from "react-icons/fa";
import {
  HiOutlineBell,
  HiOutlineHome,
  HiOutlineCog,
  HiOutlineSearch,
  HiOutlineBookmark,
  HiOutlinePencil,
  HiOutlineUser,
  HiOutlineDotsHorizontal,
  HiOutlineInbox,
  HiOutlineDotsCircleHorizontal,
} from "react-icons/hi";
import SidebarLink from "./SidebarLink";
import { openModal, changeModalContent } from "../store/modalSlice";

import { useSelector, useDispatch } from "react-redux";
import React from "react";

import UserOptions from "./UserOptions";

function SideBar() {
  const dispatch = useDispatch();

  function openModalHandler(e) {
    const buttonText = e.currentTarget.value;
    dispatch(changeModalContent(buttonText));
    dispatch(openModal());
  }

  const token = useSelector((state) => state.token).token;
  return (
    <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
      <div className="flex items-center justify-center w-14 h-14 hoverAnimation hover:bg-[#e8f5fe] p-0 xl:ml-24">
        <FaTwitter className="w-8 h-8 text-primaryColor" />
      </div>

      {token ? (
        <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24">
          <SidebarLink text="Search" Icon={HiOutlineHome} />
          <SidebarLink text="Search" Icon={HiOutlineSearch} />
          <SidebarLink text="Notifications" Icon={HiOutlineBell} />
          <SidebarLink text="More" Icon={HiOutlineInbox} />
          <SidebarLink text="Messages" Icon={HiOutlineBookmark} />

          <SidebarLink text="Lists" Icon={HiOutlineUser} />
          <SidebarLink text="Profile" Icon={HiOutlineDotsCircleHorizontal} />
        </div>
      ) : (
        <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24">
          <SidebarLink text="Search" Icon={HiOutlineSearch} active />
          <SidebarLink text="Settings" Icon={HiOutlineCog} />
        </div>
      )}

      {token && (
        <React.Fragment>
          <button
            onClick={openModalHandler}
            value="Tweet"
            className="bg-primaryColor p-4 rounded-full xl:hidden mt-4 hover:bg-[#1a8cd8]"
          >
            <HiOutlinePencil className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={openModalHandler}
            value="Tweet"
            className="hidden xl:inline ml-auto bg-primaryColor text-white rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:bg-[#1a8cd8]"
          >
            Tweet
          </button>

          <UserOptions />
        </React.Fragment>
      )}
    </div>
  );
}

export default SideBar;
