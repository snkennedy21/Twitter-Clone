import { HiOutlineSparkles } from "react-icons/hi";
import Input from "./Input";
import Tweet from "./Tweet";
import { useGetTweetQuery } from "../store/mainApi";
import React from "react";
import { HiArrowLeft } from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";

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
        <Tweet
          key={tweet.id}
          tweetId={tweet.id}
          ownerHandle={tweet.owner.handle}
          tweetOwner={`${tweet.owner.first_name} ${tweet.owner.last_name}`}
          tweetContent={tweet.content}
          likeCount={tweet.like_count}
          userHasLiked={tweet.user_has_liked}
        />
      )}
    </React.Fragment>
  );
}

export default CurrentTweet;
