import React from "react";
import { useState, useEffect } from "react";
import { HiArrowLeft } from "react-icons/hi2";
import {
  useGetUserDataQuery,
  useGetUserTweetsQuery,
  useUpdateUserMutation,
} from "../../store/mainApi";
import blankProfilePicture from "../../assets/blank-profile-picture.png";
import Tweet from "../../components/tweet/Tweet";
import { useDispatch } from "react-redux";
import { openModal, changeModalContent } from "../../store/modalSlice";

function ProfilePage() {
  const [activeButton, setActiveButton] = useState("Tweets");
  const dispatch = useDispatch();
  const { data: userData, isLoading: userDataLoading } = useGetUserDataQuery(
    JSON.parse(localStorage.getItem("currentUserId"))
  );
  const {
    data: userTweets,
    isLoading: userTweetsLoading,
    refetch,
  } = useGetUserTweetsQuery({
    id: JSON.parse(localStorage.getItem("currentUserId")),
    slug: activeButton,
  });

  useEffect(() => {
    refetch();
  }, [activeButton]);

  function openModalHandler(e) {
    const buttonText = e.target.value;
    dispatch(changeModalContent(buttonText));
    dispatch(openModal());
  }

  function changeActiveButtonHandler(e) {
    const newActiveButton = e.currentTarget.value;
    setActiveButton(newActiveButton);
  }

  if (userDataLoading || userTweetsLoading) return <div>Loading</div>;

  return (
    <React.Fragment>
      <div className="border-b border-greyBorder">
        <div className="text-[#d9d9d9] flex gap-6 items-center py-1 px-3 sticky top-0 z-30 bg-white border-b border-greyBorder">
          <div
            // onClick={returnToHome}
            className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
          >
            <HiArrowLeft className="w-5 h-5 text-blackText" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg sm:text-xl font-bold text-blackText">
              {userData.name}
            </h2>
            <p className="text-[#536471] text-sm">0 Tweets</p>
          </div>
        </div>
        <div className="bg-[#cfd9de] w-full h-48 relative">
          <img
            src={userData.photo_url ? userData.photo_url : blankProfilePicture}
            className="w-36 h-36 rounded-full absolute bottom-0 left-4 translate-y-1/2 border-white border-4"
          />
        </div>
        <div className="flex w-full justify-end py-3 px-4">
          <button
            onClick={openModalHandler}
            value="EditProfileForm"
            className="text-black border border-[#cfd9de] px-4 py-1 rounded-full font-semibold"
          >
            Edit profile
          </button>
        </div>
        <figure className="flex flex-col p-6">
          <p className="text-black font-bold text-xl">{userData.name}</p>
          <p className="text-[#536471]">@{userData.handle}</p>
        </figure>
        <div className="flex justify-between relative">
          <button
            onClick={changeActiveButtonHandler}
            className={`text-black font-semibold justify-center items-center p-4 pb-0 w-full hover:bg-[#363636] hover:bg-opacity-10 flex flex-col`}
            value="Tweets"
          >
            <span>Tweets</span>
            {activeButton === "Tweets" ? (
              <div className="w-14 h-1 bg-primaryColor rounded-sm mt-3"></div>
            ) : (
              <div className="h-1 w-14 opacity-0 mt-3"></div>
            )}
          </button>
          <button
            onClick={changeActiveButtonHandler}
            className={`text-black font-semibold justify-center items-center p-4 pb-0 w-full hover:bg-[#363636] hover:bg-opacity-10 flex flex-col`}
            value="Replies"
          >
            <span>Replies</span>
            {activeButton === "Replies" ? (
              <div className="w-14 h-1 bg-primaryColor rounded-sm mt-3"></div>
            ) : (
              <div className="h-1 w-14 opacity-0 mt-3"></div>
            )}
          </button>
          <button
            onClick={changeActiveButtonHandler}
            className={`text-black font-semibold justify-center items-center p-4 pb-0 w-full hover:bg-[#363636] hover:bg-opacity-10 flex flex-col`}
            value="Likes"
          >
            <span>Likes</span>
            {activeButton === "Likes" ? (
              <div className="w-14 h-1 bg-primaryColor rounded-sm mt-3"></div>
            ) : (
              <div className="h-1 w-14 opacity-0 mt-3"></div>
            )}
          </button>
        </div>
      </div>
      {userTweets.map((tweet) => {
        return (
          <Tweet
            key={tweet.id}
            tweet={tweet}
            isChainOfTweets={false}
            extraPadding={"3"}
          />
        );
      })}
    </React.Fragment>
  );
}

export default ProfilePage;
