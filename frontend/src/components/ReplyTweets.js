import React from "react";
import Tweet from "./Tweet";

function ReplyTweets({ tweet }) {
  return tweet.replies.map((reply) => {
    return (
      <Tweet
        key={reply.id}
        tweetId={reply.id}
        ownerHandle={reply.owner.handle}
        tweetOwner={`${reply.owner.first_name} ${reply.owner.last_name}`}
        tweetContent={reply.content}
        likeCount={reply.like_count}
        userHasLiked={reply.user_has_liked}
        extraPadding={"3"}
      />
    );
  });
}

export default ReplyTweets;
