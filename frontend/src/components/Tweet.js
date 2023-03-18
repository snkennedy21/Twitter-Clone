import profilePic from "../images/profile.png";
import TweetIcon from "./TweetIcon";
import {
  HiOutlineChatBubbleOvalLeft,
  HiOutlineArrowPath,
  HiOutlineHeart,
  HiArrowUpTray,
  HiBars3CenterLeft,
  HiEllipsisHorizontal,
} from "react-icons/hi2";

function Tweet({ ownerHandle, tweetOwner, tweetContent }) {
  function likeTweetHandler() {
    
  }

  function viewTweetHandler() {}

  return (
    <div
      onClick={viewTweetHandler}
      className="flex gap-3 text-blackText border-b border-greyBorder hover:bg-[#f9f9f9] hover:cursor-pointer p-3"
    >
      <img
        src={profilePic}
        alt=""
        className="h-11 w-11 rounded-full cursor-pointer"
      />

      <div className="flex flex-col w-full">
        <div className="flex w-full justify-between">
          <div className="flex gap-1">
            <h3 className="font-semibold text-md">{tweetOwner}</h3>
            <span className="text-[#536471]">@{ownerHandle}</span>
          </div>
          <div className="p-1 hover:bg-[#deeffb] hover:text-primaryColor rounded-full transition">
            <HiEllipsisHorizontal className="h-5 w-5" />
          </div>
        </div>
        <p>{tweetContent}</p>
        <div className="flex w-full justify-between pr-28">
          <TweetIcon
            Icon={HiOutlineChatBubbleOvalLeft}
            backgroundColor={"bg-[#deeffb]"}
            textColor={"text-primaryColor"}
          />
          <TweetIcon
            Icon={HiOutlineArrowPath}
            backgroundColor={"bg-[#e4f2ed]"}
            textColor={"text-[#01ba7c]"}
            rotate={true}
          />
          <TweetIcon
            Icon={HiOutlineHeart}
            backgroundColor={"bg-[#f9e2ed]"}
            textColor={"text-[#f91c80]"}
            clickFunction={likeTweetHandler}
          />
          <TweetIcon
            Icon={HiBars3CenterLeft}
            backgroundColor={"bg-[#deeffb]"}
            textColor={"text-primaryColor"}
            rotate={true}
          />
          <TweetIcon
            Icon={HiArrowUpTray}
            backgroundColor={"bg-[#deeffb]"}
            textColor={"text-primaryColor"}
          />
        </div>
      </div>
    </div>
  );
}

export default Tweet;
