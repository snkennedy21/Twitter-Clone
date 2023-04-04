import profilePic from "../images/profile.png";
import TweetIcon from "./TweetIcon";
import {
  HiOutlineChatBubbleOvalLeft,
  HiOutlineArrowPath,
  HiOutlineHeart,
  HiHeart,
  HiArrowUpTray,
  HiBars3CenterLeft,
  HiEllipsisHorizontal,
} from "react-icons/hi2";
import { useLikeTweetMutation } from "../store/mainApi";
import { useNavigate } from "react-router-dom";
import { useIncreaseViewCountMutation } from "../store/mainApi";

function Tweet({
  tweetId,
  ownerHandle,
  tweetOwner,
  ownerPhoto,
  tweetContent,
  likeCount,
  replyCount,
  viewCount,
  userHasLiked,
  isChainOfTweets,
  extraPadding,
}) {
  const [likeTweet] = useLikeTweetMutation();
  const [increaseViewCount] = useIncreaseViewCountMutation();
  const navigate = useNavigate();

  function likeTweetHandler(e) {
    e.stopPropagation();
    const tweetData = {
      tweet_id: tweetId,
      dir: userHasLiked ? 0 : 1,
    };
    likeTweet(tweetData);
  }

  function viewTweetHandler() {
    const tweetData = {
      tweet_id: tweetId,
    };
    increaseViewCount(tweetData);
    navigate(`/tweets/${tweetId}`);
  }

  return (
    <div
      onClick={viewTweetHandler}
      className={`flex gap-3 text-blackText border-greyBorder hover:bg-[#f9f9f9] hover:cursor-pointer px-3 p-${extraPadding} ${
        isChainOfTweets ? "" : "border-b"
      }`}
    >
      <div className="flex flex-col w-12">
        <img src={ownerPhoto} alt="" className="h-11 w-11 rounded-full" />
        <div
          className={`${
            isChainOfTweets ? "w-[2px] h-full bg-[#c9c9c9] ml-5 my-1" : ""
          }`}
        ></div>
      </div>

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
            number={replyCount}
          />
          <TweetIcon
            Icon={HiOutlineArrowPath}
            backgroundColor={"bg-[#e4f2ed]"}
            textColor={"text-[#01ba7c]"}
            rotate={true}
          />
          <TweetIcon
            Icon={userHasLiked ? HiHeart : HiOutlineHeart}
            iconToggled={userHasLiked}
            backgroundColor={"bg-[#f9e2ed]"}
            textColor={"text-[#f91c80]"}
            clickFunction={likeTweetHandler}
            number={likeCount}
          />
          <TweetIcon
            Icon={HiBars3CenterLeft}
            backgroundColor={"bg-[#deeffb]"}
            textColor={"text-primaryColor"}
            rotate={true}
            number={viewCount}
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
