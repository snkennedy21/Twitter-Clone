import { useState } from "react";
import React from "react";
import blankProfilePicture from "../../assets/blank-profile-picture.png";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { invalidateToken } from "../../store/tokenSlice";
import { useLogoutMutation, useGetUserDataQuery } from "../../store/mainApi";

function UserOptions() {
  const { data: userData, isLoading: userDataLoading } = useGetUserDataQuery(
    JSON.parse(localStorage.getItem("currentUserId"))
  );
  const [isUserOptionsOpen, setIsUserOptionsOpen] = useState(false);
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();

  function logoutHandler() {
    document.cookie = `session=; max-age=-1; path=/`;
    dispatch(invalidateToken());
    localStorage.removeItem("currentUserId");
    localStorage.removeItem("currentUser");
    logout();
  }

  if (userDataLoading) return <div>Loading...</div>;

  return (
    <React.Fragment>
      {isUserOptionsOpen && (
        <div
          onClick={() => {
            setIsUserOptionsOpen(false);
          }}
          className="fixed w-full h-screen bg-orange-500 left-0 top-0 opacity-0 z-40"
        ></div>
      )}
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
                Log out @{userData.handle}
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
            src={userData.photo_url ? userData.photo_url : blankProfilePicture}
            className="h-10 w-10 rounded-full xl:mr-2.5"
          />
        </div>

        <div className="hidden xl:inline leading-5">
          <h4>{userData.name}</h4>
          <p>@{userData.handle}</p>
        </div>
        <HiOutlineDotsHorizontal className="hidden h-5 w-5 ml-10 xl:inline" />
      </div>
    </React.Fragment>
  );
}

export default UserOptions;
