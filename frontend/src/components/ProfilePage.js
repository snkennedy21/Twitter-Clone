import React from "react";
import { HiArrowLeft } from "react-icons/hi2";
import { useGetUserDataQuery, useGetUserTweetsQuery } from "../store/mainApi";
import profilePic from "../images/profile.png";
import Tweet from "./Tweet";

function ProfilePage() {
  const { data: userData, isLoading: userDataLoading } = useGetUserDataQuery(
    JSON.parse(localStorage.getItem("currentUser")).id
  );
  const { data: userTweets, isLoading: userTweetsLoading } =
    useGetUserTweetsQuery(JSON.parse(localStorage.getItem("currentUser")).id);

  console.log(userTweets);

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
            src={profilePic}
            className="w-36 h-36 rounded-full absolute bottom-0 left-4 translate-y-1/2 border-white border-4"
          />
        </div>
        <div className="flex w-full justify-end py-3 px-4">
          <button className="text-black border border-[#cfd9de] px-4 py-1 rounded-full font-semibold">
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
            tweetId={tweet.id}
            ownerHandle={tweet.owner.handle}
            tweetOwner={`${tweet.owner.first_name} ${tweet.owner.last_name}`}
            tweetContent={tweet.content}
            likeCount={tweet.like_count}
            replyCount={tweet.reply_count}
            viewCount={tweet.view_count}
            userHasLiked={tweet.user_has_liked}
            isChainOfTweets={false}
            extraPadding={"3"}
          />
        );
      })}
    </React.Fragment>
  );
}

export default ProfilePage;
