import { HiOutlineSparkles } from "react-icons/hi";
import Input from "../../components/Input";
import Tweet from "../../components/tweet/Tweet";
import { useGetAllTweetsQuery } from "../../store/mainApi";
import React from "react";
import { useSelector } from "react-redux";

function Home() {
  const { data: tweets, isLoading: tweetsLoading } = useGetAllTweetsQuery();
  const token = useSelector((state) => state.token).token;

  return (
    <React.Fragment>
      <div className="text-[#d9d9d9] flex items-center sm:justify-between py-2 px-3 sticky top-0 z-30 bg-white border-b border-greyBorder">
        <h2 className="text-lg sm:text-xl font-bold text-blackText">Home</h2>
        <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0 ml-auto">
          <HiOutlineSparkles className="w-5 h-5 text-primaryColor" />
        </div>
      </div>
      {token && <Input placeholder="What's happening?" tweetId={null} />}

      {tweetsLoading ? (
        <div>Loading</div>
      ) : (
        tweets
          .slice()
          .reverse()
          .map((tweet) => {
            return (
              <Tweet
                key={tweet.id}
                tweet={tweet}
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
