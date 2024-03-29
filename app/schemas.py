from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional
from pydantic.types import conint

################
# USER SCHEMAS #
################
 
class UserCreate(BaseModel):
    handle: str
    email: EmailStr
    name: str
    password: str

class UserResponse(BaseModel):
    id: int
    handle: str
    name: str
    email: EmailStr
    photo_url: Optional[str] = None

    class Config:
        orm_mode = True

class UserLogin(BaseModel):
    email: EmailStr
    password: str



#################
# TWEET SCHEMAS #
#################

class TweetCreate(BaseModel):
    content: str
    parent_tweet_id: Optional[int] = None

class TweetResponse(BaseModel):
    id: int
    content: str
    created_at: datetime
    owner_id: int
    owner: UserResponse
    
    class Config:
        orm_mode = True

class TweetOut(BaseModel):
    Tweet: TweetResponse
    likes: int

    class Config:
        orm_mode = True


################
# AUTH SCHEMAS #
################

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

class TokenData(BaseModel):
    id: Optional[str] = None



################
# LIKE SCHEMAS #
################

class LikeCreated(BaseModel):
    tweet_id: int
    dir: conint(le=1)


####################
# BOOKMARK SCHEMAS #
####################

class BookmarkCreated(BaseModel):
    tweet_id: int
    dir: conint(le=1)


################
# VIEW SCHEMAS #
################

class ViewCreated(BaseModel):
    tweet_id: int