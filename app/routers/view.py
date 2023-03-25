from fastapi import FastAPI, status, HTTPException, Response, Depends, APIRouter, Cookie
from sqlalchemy.orm import Session
from .. import database, oauth2
from ..schemas import ViewCreated
from ..models import View, Tweet

router = APIRouter(
    prefix="/view",
    tags=["View"]
)

@router.post("/", status_code=status.HTTP_201_CREATED)
def view(view: ViewCreated, db: Session = Depends(database.get_db), access_token: str = Cookie(None)):
    current_user = oauth2.get_current_user(access_token, db)

    if current_user:
        tweet_owned_by_current_user = db.query(Tweet).where(Tweet.id == view.tweet_id, Tweet.owner_id == current_user.id).first()

        if tweet_owned_by_current_user:
            return {"Message": f"This Tweet belongs to user with id: {current_user.id}"}
    
    new_view = View(tweet_id=view.tweet_id)
    db.add(new_view)
    db.commit()

    return {"Message": "Successfully added view"}

