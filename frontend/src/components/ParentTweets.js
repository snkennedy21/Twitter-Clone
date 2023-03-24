import React from "react";
import Tweet from "./Tweet";

function ParentTweets({ tweet }) {
  return tweet.parent_tweets
    .slice()
    .reverse()
    .map((tweet) => {
      return (
        <Tweet
          key={tweet.id}
          tweetId={tweet.id}
          ownerHandle={tweet.owner.handle}
          tweetOwner={`${tweet.owner.first_name} ${tweet.owner.last_name}`}
          tweetContent={tweet.content}
          likeCount={tweet.like_count}
          userHasLiked={tweet.user_has_liked}
          isChainOfTweets={true}
          extraPadding={"0"}
        />
      );
    });
}

export default ParentTweets;
