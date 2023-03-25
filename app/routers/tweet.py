from fastapi import FastAPI, status, HTTPException, Response, Depends, APIRouter, Cookie
from app import utils
from app.schemas import TweetResponse, TweetCreate, TweetOut
from app.models import Tweet, Like, User, View
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database import get_db
from typing import List
from .. import oauth2

router = APIRouter(
    prefix="/tweets",
    tags=["Tweets"]
)

# , response_model=List[TweetOut]
@router.get("/")
def get_tweets(db: Session = Depends(get_db), access_token: str = Cookie(None)):
    current_user = oauth2.get_current_user(access_token, db)

    tweets = db.query(Tweet).filter(Tweet.parent_tweet_id == None).all()

    if current_user is None:
        user_has_liked = False
    

    list_of_tweets = []
    for tweet in tweets:
        reply_count = db.query(func.count(Tweet.id)).filter(Tweet.parent_tweet_id == tweet.id).scalar()
        like_count = db.query(func.count(Like.user_id)).filter(Like.tweet_id == tweet.id).scalar()
        view_count = db.query(func.count(View.tweet_id)).filter(View.tweet_id == tweet.id).scalar()
        owner = db.query(User.handle, User.email, User.id, User.first_name, User.last_name).filter(User.id == tweet.owner_id).first()._asdict()

        if current_user:
            user_has_liked = db.query(Like).filter(Like.user_id == current_user.id, Like.tweet_id == tweet.id).first() is not None

        tweet_dict = {
            "id": tweet.id,
            "content": tweet.content,
            "created_at": tweet.created_at,
            "owner_id": tweet.owner_id,
            "like_count": like_count,
            "owner": owner,
            "user_has_liked": user_has_liked,
            "reply_count": reply_count,
            "view_count": view_count
        }
        list_of_tweets.append(tweet_dict)

    return list_of_tweets


@router.get("/{id}")
def get_tweet(id: int, db: Session = Depends(get_db), access_token: str = Cookie(None)):
    current_user = oauth2.get_current_user(access_token, db)
    tweet = db.query(Tweet).where(Tweet.id == id).first()

    parent_tweet = tweet.parent_tweet
    parent_tweets = []
    while parent_tweet:
        parent_owner = db.query(User.handle, User.email, User.id, User.first_name, User.last_name).filter(User.id == parent_tweet.owner_id).first()._asdict()
        parent_like_count = db.query(func.count(Like.user_id)).filter(Like.tweet_id == parent_tweet.id).scalar()

        if current_user is None:
            parent_user_has_liked = False
        else:
            parent_user_has_liked = db.query(Like).filter(Like.user_id == current_user.id, Like.tweet_id == parent_tweet.id).first() is not None

        parent_tweet_dict = {
            "id": parent_tweet.id,
            "content": parent_tweet.content,
            "created_at": parent_tweet.created_at,
            "owner_id": parent_tweet.owner_id,
            "like_count": parent_like_count,
            "owner": parent_owner,
            "user_has_liked": parent_user_has_liked,
        }
        parent_tweets.append(parent_tweet_dict)
        parent_tweet = parent_tweet.parent_tweet

    owner = db.query(User.handle, User.email, User.id, User.first_name, User.last_name).filter(User.id == tweet.owner_id).first()._asdict()
    like_count = db.query(func.count(Like.user_id)).filter(Like.tweet_id == id).scalar()

    if current_user is None:
        user_has_liked = False

    if current_user:
        user_has_liked = db.query(Like).filter(Like.user_id == current_user.id, Like.tweet_id == tweet.id).first() is not None
    
    replies = []
    for reply in tweet.replies:
        if current_user is None:
            reply_user_has_liked = False
        
        if current_user:
            reply_user_has_liked = db.query(Like).filter(Like.user_id == current_user.id, Like.tweet_id == reply.id).first() is not None

        reply_owner = db.query(User.handle, User.email, User.id, User.first_name, User.last_name).filter(User.id == reply.owner_id).first()._asdict()
        reply_like_count = db.query(func.count(Like.user_id)).filter(Like.tweet_id == reply.id).scalar()
        reply_dict = {
            "id": reply.id,
            "content": reply.content,
            "created_at": reply.created_at,
            "owner_id": reply.owner_id,
            "like_count": reply_like_count,
            "owner": reply_owner,
            "user_has_liked": reply_user_has_liked,
        }
        replies.append(reply_dict)


    tweet_dict = {
        "id": tweet.id,
        "content": tweet.content,
        "created_at": tweet.created_at,
        "owner_id": tweet.owner_id,
        "like_count": like_count,
        "owner": owner,
        "user_has_liked": user_has_liked,
        "replies": replies,
        "parent_tweets": parent_tweets,
    }

    return tweet_dict


@router.post("/", status_code=status.HTTP_201_CREATED)
def create_tweet(tweet: TweetCreate, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):

    new_tweet = Tweet(owner_id=current_user.id, **tweet.dict())
    db.add(new_tweet)
    db.commit()
    db.refresh(new_tweet)
    return new_tweet


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_tweet(id: int, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    tweet_query = db.query(Tweet).where(Tweet.id == id)
    tweet = tweet_query.first()

    if tweet == None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"tweet with id: {id} does not exist"
        )
    
    if tweet.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"tweet with id: {id} does not belong to the current user"
        )
    
    tweet_query.delete(synchronize_session=False)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.put("/{id}", response_model=TweetResponse)
def update_tweet(id: int, updated_tweet: TweetCreate, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    tweet_query = db.query(Tweet).where(Tweet.id == id)
    tweet = tweet_query.first()

    if tweet == None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Tweet with id: {id} does not exist"
        )
    
    if tweet.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"tweet with id: {id} does not belong to the current user"
        )
    
    tweet_query.update(
        updated_tweet.dict(),
        synchronize_session=False
    )
    db.commit()
    return tweet_query.first()