import React from "react";
import {
  HiOutlineChatBubbleOvalLeft,
  HiOutlineArrowPath,
  HiOutlineHeart,
  HiArrowUpTray,
  HiBars3CenterLeft,
  HiOutlineBookmark,
  HiEllipsisHorizontal,
} from "react-icons/hi2";
import profilePic from "../images/profile.png";

function CurrentTweetDetails({ tweet }) {
  return (
    <div className="text-blackText border-b border-greyBorder m-3 mt-0">
      <div className=" border-b border-greyBorder">
        <div className="flex gap-3 mb-4">
          <img
            src={profilePic}
            alt=""
            className="h-11 w-11 rounded-full cursor-pointer"
          />
          <div className="flex flex-col">
            <h3 className="font-semibold text-md">{`${tweet.owner.first_name} ${tweet.owner.last_name}`}</h3>
            <span className="text-[#536471]">@{tweet.owner.handle}</span>
          </div>
        </div>
        <div className="flex flex-col w-full gap-4 mb-4">
          <p>{tweet.content}</p>
          <div className="flex">
            <span className="text-[#536471] mr-2">4:45 PM March 20, 2023</span>
            <span className="text-[#536471] mr-2">·</span>
            <span className="font-bold mr-1">5</span>
            <span className="text-[#536471] mr-2">views</span>
          </div>
        </div>
      </div>
      <div className="flex gap-4 border-b border-greyBorder py-3 px-1">
        <span className="text-[#536471]">
          <span className="font-bold text-blackText">17</span> Retweets
        </span>
        <span className="text-[#536471]">
          <span className="font-bold text-blackText">17</span> Quotes
        </span>
        <span className="text-[#536471]">
          <span className="font-bold text-blackText">{tweet.like_count}</span>{" "}
          {tweet.like_count === 1 ? "Like" : "Likes"}
        </span>
      </div>
      <div className="flex justify-around py-3">
        <HiOutlineChatBubbleOvalLeft className="w-5 h-5" />
        <HiOutlineArrowPath className="w-5 h-5" />
        <HiOutlineHeart className="w-5 h-5" />
        <HiOutlineBookmark className="w-5 h-5" />
        <HiArrowUpTray className="w-5 h-5" />
      </div>
    </div>
  );
}

export default CurrentTweetDetails;
