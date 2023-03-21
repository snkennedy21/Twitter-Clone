import { HiOutlineSparkles } from "react-icons/hi";
import Input from "./Input";
import Tweet from "./Tweet";
import { useGetAllTweetsQuery } from "../store/mainApi";

function Feed() {
  const { data: tweets, isLoading: tweetsLoading } = useGetAllTweetsQuery();

  console.log(tweets);

  return (
    <div className="text-white flex-grow border-l border-r border-greyBorder max-w-2xl sm:ml-[73px] xl:ml-[370px]">
      <div className="text-[#d9d9d9] flex items-center sm:justify-between py-2 px-3 sticky top-0 z-30 bg-white border-b border-greyBorder">
        <h2 className="text-lg sm:text-xl font-bold text-blackText">Home</h2>
        <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0 ml-auto">
          <HiOutlineSparkles className="w-5 h-5 text-primaryColor" />
        </div>
      </div>
      <Input />
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
            />
          );
        })
      )}
    </div>
  );
}

export default Feed;
