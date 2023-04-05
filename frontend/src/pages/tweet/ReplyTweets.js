import React from "react";
import Tweet from "../../components/tweet/Tweet";

function ReplyTweets({ tweet }) {
  return tweet.replies.map((reply) => {
    return <Tweet key={reply.id} tweet={reply} extraPadding={"3"} />;
  });
}

export default ReplyTweets;
