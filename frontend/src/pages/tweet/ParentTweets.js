import React from "react";
import Tweet from "../../components/tweet/Tweet";

function ParentTweets({ tweet }) {
  return tweet.parent_tweets
    .slice()
    .reverse()
    .map((tweet) => {
      return (
        <Tweet
          key={tweet.id}
          tweet={tweet}
          isChainOfTweets={true}
          extraPadding={"0"}
        />
      );
    });
}

export default ParentTweets;
