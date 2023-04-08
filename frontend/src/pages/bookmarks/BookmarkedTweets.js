import React from "react";
import { useState, useEffect } from "react";
import {
  useGetUserDataQuery,
  useGetUserTweetsQuery,
} from "../../store/mainApi";
import Tweet from "../../components/tweet/Tweet";
import { HiArrowLeft } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import birdcagePhoto from "../../assets/birdcage.png";

function BookmarkedTweets() {
  const { data: bookmarkedTweets, isLoading: bookmarkedTweetsLoading } =
    useGetUserTweetsQuery({
      id: JSON.parse(localStorage.getItem("currentUserId")),
      slug: "Bookmarks",
    });

  if (bookmarkedTweetsLoading) return <div>Loading...</div>;

  return (
    <React.Fragment>
      <div className="text-[#d9d9d9] flex items-center sm:justify-between py-2 px-3 sticky top-0 z-30 bg-white border-b border-greyBorder">
        <h2 className="text-lg sm:text-xl font-bold text-blackText">
          Bookmarks
        </h2>
        <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0 ml-auto">
          <div>Hello</div>
        </div>
      </div>
      {bookmarkedTweets.map((tweet) => {
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

export default BookmarkedTweets;
