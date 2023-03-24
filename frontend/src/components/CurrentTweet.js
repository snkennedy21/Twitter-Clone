import { HiOutlineSparkles } from "react-icons/hi";
import Input from "./Input";
import Tweet from "./Tweet";
import { useGetTweetQuery } from "../store/mainApi";
import React from "react";
import { useSelector } from "react-redux";
import { HiArrowLeft } from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";

import ParentTweets from "./ParentTweets";
import ReplyTweets from "./ReplyTweets";
import CurrentTweetDetails from "./CurrentTweetDetails";

function CurrentTweet() {
  const token = useSelector((state) => state.token).token;
  const { tweetId } = useParams();
  const { data: tweet, isLoading: tweetsLoading } = useGetTweetQuery(tweetId);
  const navigate = useNavigate();

  console.log(tweet);

  function returnToHome() {
    navigate("/home");
  }

  return (
    <React.Fragment>
      <div className="text-[#d9d9d9] flex gap-6 items-center py-2 px-3 sticky top-0 z-30 bg-white border-b border-greyBorder mb-3">
        <div
          onClick={returnToHome}
          className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
        >
          <HiArrowLeft className="w-5 h-5 text-blackText" />
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-blackText">Tweet</h2>
      </div>
      {tweetsLoading ? <div>Loading</div> : <ParentTweets tweet={tweet} />}
      {tweetsLoading ? (
        <div>Loading</div>
      ) : (
        <>
          <CurrentTweetDetails tweet={tweet} />
          {token && (
            <Input placeholder={"Tweet your reply"} tweetId={tweet.id} />
          )}
        </>
      )}

      {tweetsLoading ? <div>Loading</div> : <ReplyTweets tweet={tweet} />}
    </React.Fragment>
  );
}

export default CurrentTweet;
