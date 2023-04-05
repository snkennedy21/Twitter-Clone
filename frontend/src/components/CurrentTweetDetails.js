import React from "react";
import {
  HiOutlineChatBubbleOvalLeft,
  HiOutlineArrowPath,
  HiOutlineHeart,
  HiArrowUpTray,
  HiBars3CenterLeft,
  HiOutlineBookmark,
  HiEllipsisHorizontal,
  HiBookmark,
  HiHeart,
} from "react-icons/hi2";
import blankProfilePicture from "../images/blank-profile-picture.png";
import TweetIcon from "./TweetIcon";
import {
  useBookmarkTweetMutation,
  useLikeTweetMutation,
} from "../store/mainApi";
// import { HiBookmark } from "react-icons/hi";

function CurrentTweetDetails({ tweet }) {
  const [bookmarkTweet] = useBookmarkTweetMutation();
  const [likeTweet] = useLikeTweetMutation();

  function bookmarkTweetHandler() {
    const tweetData = {
      tweet_id: tweet.id,
      dir: tweet.user_has_bookmarked ? 0 : 1,
    };

    bookmarkTweet(tweetData);
  }

  function likeTweetHandler() {
    const tweetData = {
      tweet_id: tweet.id,
      dir: tweet.user_has_liked ? 0 : 1,
    };
    likeTweet(tweetData);
  }

  return (
    <div className="text-blackText border-b border-greyBorder m-3 mt-0">
      <div className=" border-b border-greyBorder">
        <div className="flex gap-3 mb-4">
          <img
            src={
              tweet.owner.photo_url
                ? tweet.owner.photo_url
                : blankProfilePicture
            }
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
            <span className="font-bold mr-1">{tweet.view_count}</span>
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
        <TweetIcon
          Icon={HiOutlineChatBubbleOvalLeft}
          backgroundColor={"bg-[#deeffb]"}
          textColor={"text-primaryColor"}
          number={null}
        />
        <TweetIcon
          Icon={HiOutlineArrowPath}
          backgroundColor={"bg-[#e4f2ed]"}
          textColor={"text-[#01ba7c]"}
          rotate={true}
        />
        <TweetIcon
          Icon={tweet.user_has_liked ? HiHeart : HiOutlineHeart}
          iconToggled={tweet.user_has_liked}
          backgroundColor={"bg-[#f9e2ed]"}
          textColor={"text-[#f91c80]"}
          number={null}
          clickFunction={likeTweetHandler}
        />
        <TweetIcon
          Icon={tweet.user_has_bookmarked ? HiBookmark : HiOutlineBookmark}
          iconToggled={tweet.user_has_bookmarked}
          backgroundColor={"bg-[#deeffb]"}
          textColor={"text-primaryColor"}
          clickFunction={bookmarkTweetHandler}
        />
        <TweetIcon
          Icon={HiArrowUpTray}
          backgroundColor={"bg-[#deeffb]"}
          textColor={"text-primaryColor"}
        />
      </div>
    </div>
  );
}

export default CurrentTweetDetails;
