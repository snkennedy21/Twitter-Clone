import { HiOutlineSparkles } from "react-icons/hi";
import Input from "./Input";
import Tweet from "./Tweet";
import { useGetAllTweetsQuery } from "../store/mainApi";
import React from "react";

function Home() {
  const { data: tweets, isLoading: tweetsLoading } = useGetAllTweetsQuery();

  console.log(tweets);

  return (
    <React.Fragment>
      <div className="text-[#d9d9d9] flex items-center sm:justify-between py-2 px-3 sticky top-0 z-30 bg-white border-b border-greyBorder">
        <h2 className="text-lg sm:text-xl font-bold text-blackText">Home</h2>
        <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0 ml-auto">
          <HiOutlineSparkles className="w-5 h-5 text-primaryColor" />
        </div>
      </div>
      <Input placeholder="What's happening?" />
      {tweetsLoading ? (
        <div>Loading</div>
      ) : (
        tweets.map((tweet) => {
          return (
            <Tweet
              key={tweet.id}
              tweetId={tweet.id}
              ownerHandle={tweet.owner.handle}
              tweetOwner={`${tweet.owner.first_name} ${tweet.owner.last_name}`}
              tweetContent={tweet.content}
              likeCount={tweet.like_count}
              userHasLiked={tweet.user_has_liked}
              isChainOfTweets={false}
              extraPadding={"3"}
            />
          );
        })
      )}
    </React.Fragment>
  );
}

export default Home;
