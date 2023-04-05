import React from "react";
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
  const dispatch = useDispatch();
  const { data: userData, isLoading: userDataLoading } = useGetUserDataQuery(
    JSON.parse(localStorage.getItem("currentUserId"))
  );
  const { data: userTweets, isLoading: userTweetsLoading } =
    useGetUserTweetsQuery(JSON.parse(localStorage.getItem("currentUserId")));

  function openModalHandler(e) {
    const buttonText = e.target.value;
    dispatch(changeModalContent(buttonText));
    dispatch(openModal());
  }

  console.log(userData);

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
            <h2 className="text-lg sm:text-xl font-bold text-blackText">{`${userData.first_name} ${userData.last_name}`}</h2>
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
          <p className="text-black font-bold text-xl">{`${userData.first_name} ${userData.last_name}`}</p>
          <p className="text-[#536471]">@{userData.handle}</p>
        </figure>
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
