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
import profilePicture from "../images/profile.png";
import { useSelector } from "react-redux";
import React from "react";
import { useLogoutMutation } from "../store/mainApi";
import { useDispatch } from "react-redux";
import { invalidateToken } from "../store/tokenSlice";
import { useState, useEffect } from "react";

function SideBar() {
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const [isUserOptionsOpen, setIsUserOptionsOpen] = useState(false);

  function logoutHandler() {
    document.cookie = `session=; max-age=-1; path=/`;
    dispatch(invalidateToken());
    logout();
  }

  const token = useSelector((state) => state.token).token;
  return (
    <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
      {isUserOptionsOpen && (
        <div
          onClick={() => {
            setIsUserOptionsOpen(false);
          }}
          className="fixed w-full h-screen bg-orange-500 left-0 top-0 opacity-0 z-40"
        ></div>
      )}

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
          <button className="bg-primaryColor p-4 rounded-full xl:hidden mt-4">
            <HiOutlinePencil className="w-5 h-5 text-white" />
          </button>
          <button className="hidden xl:inline ml-auto bg-primaryColor text-white rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:bg-[#1a8cd8]">
            Tweet
          </button>

          <div
            onClick={() => {
              setIsUserOptionsOpen(true);
            }}
            className="text-blackText flex items-center justify-center hoverAnimation xl:ml-auto xl:-mr-5 mt-auto relative"
          >
            {isUserOptionsOpen && (
              <React.Fragment>
                <div
                  className="absolute -top-[130px] left-2 sm:left-0 bg-white w-[320px] h-28 rounded-xl z-50 overflow-hidden"
                  style={{ boxShadow: "0px 0px 10px 1px rgba(0, 0, 0, 0.2)" }}
                >
                  <div className="h-[12px] border-b border-greyBorder"></div>
                  <div className="flex items-center font-bold h-[50px] px-3 hover:bg-[#f7f7f7]">
                    Add an existing account
                  </div>
                  <div
                    onClick={logoutHandler}
                    className="flex items-center font-bold h-[50px] px-3 hover:bg-[#f7f7f7]"
                  >
                    Log out @UserHandle
                  </div>
                </div>
                <div
                  className="absolute -top-[32px] bg-white w-[20px] h-[20px] rotate-45"
                  style={{ boxShadow: "0px 0px 10px 1px rgba(0, 0, 0, 0.2)" }}
                ></div>
              </React.Fragment>
            )}

            <div>
              <img
                src={profilePicture}
                className="h-10 w-10 rounded-full xl:mr-2.5"
              />
            </div>

            <div className="hidden xl:inline leading-5">
              <h4>Users Name</h4>
              <p>@Handle</p>
            </div>
            <HiOutlineDotsHorizontal className="hidden h-5 w-5 ml-10 xl:inline" />
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default SideBar;
