import profilePic from "../images/profile.png";
import { HiOutlineSparkles } from "react-icons/hi";
import Input from "./Input";
import Tweet from "./Tweet";
import { useGetTweetQuery } from "../store/mainApi";
import React from "react";
import { HiArrowLeft } from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";
import {
  HiOutlineChatBubbleOvalLeft,
  HiOutlineArrowPath,
  HiOutlineHeart,
  HiArrowUpTray,
  HiBars3CenterLeft,
  HiEllipsisHorizontal,
} from "react-icons/hi2";

function CurrentTweet() {
  const { tweetId } = useParams();
  const { data: tweet, isLoading: tweetsLoading } = useGetTweetQuery(tweetId);
  const navigate = useNavigate();

  console.log(tweet);

  function returnToHome() {
    navigate("/home");
  }

  return (
    <React.Fragment>
      <div className="text-[#d9d9d9] flex gap-6 items-center py-2 px-3 sticky top-0 z-30 bg-white border-b border-greyBorder">
        <div
          onClick={returnToHome}
          className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
        >
          <HiArrowLeft className="w-5 h-5 text-blackText" />
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-blackText">Tweet</h2>
      </div>
      {tweetsLoading ? (
        <div>Loading</div>
      ) : (
        <div className="text-blackText border-b border-greyBorder m-4">
          <div className=" border-b border-greyBorder">
            <div className="flex gap-3">
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
            <div className="flex flex-col w-full gap-2">
              <div className="flex w-full justify-between">
                <div className="text-[#536471]">
                  Replying to{" "}
                  <span className="text-primaryColor">@ThePerson</span>
                </div>
              </div>
              <p>{tweet.content}</p>
              <div className="flex">
                <span className="text-[#536471]">4:45 PM March 20, 2023</span>
                <span className="font-bold">5</span>
                <span className="text-[#536471]">views</span>
              </div>
            </div>
          </div>
          <div className="flex gap-4 border-b border-greyBorder py-3 px-1">
            <span className="text-[#536471]">
              <span className="font-bold text-blackText">17</span> Retweets
            </span>
            <span>
              <span className="font-bold">17</span> Retweets
            </span>
            <span>
              <span className="font-bold">17</span> Retweets
            </span>
          </div>
          <div>Hello</div>
        </div>
      )}
      {tweetsLoading ? (
        <div>Loading</div>
      ) : (
        tweet.replies.map((reply) => {
          return (
            <Tweet
              key={reply.id}
              tweetId={reply.id}
              ownerHandle={reply.owner.handle}
              tweetOwner={`${reply.owner.first_name} ${reply.owner.last_name}`}
              tweetContent={reply.content}
              likeCount={reply.like_count}
              userHasLiked={reply.user_has_liked}
            />
          );
        })
      )}
    </React.Fragment>
  );
}

export default CurrentTweet;
