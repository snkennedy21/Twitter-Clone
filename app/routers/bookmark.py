from fastapi import FastAPI, status, HTTPException, Response, Depends, APIRouter
from sqlalchemy.orm import Session
from .. import database, oauth2
from ..schemas import BookmarkCreated
from ..models import Bookmark, Tweet

router = APIRouter(
    prefix="/bookmark",
    tags=["Bookmark"]
)


@router.post("/", status_code=status.HTTP_201_CREATED)
def bookmark(bookmark: BookmarkCreated, db: Session = Depends(database.get_db), current_user: int = Depends(oauth2.get_current_user)):


    tweet = db.query(Tweet).where(Tweet.id == bookmark.tweet_id).first()
    if not tweet:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"tweet with id: {bookmark.tweet_id} does not exist"
        )
    
    print(bookmark)

    bookmark_query = db.query(Bookmark).filter(Bookmark.tweet_id == bookmark.tweet_id, Bookmark.user_id == current_user.id)
    found_bookmark = bookmark_query.first()
    print(found_bookmark)
    if bookmark.dir == 1:
        if found_bookmark:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=f"user {current_user.id} has already voted on tweet {bookmark.tweet_id}"
            )
        
        new_bookmark = Bookmark(tweet_id=bookmark.tweet_id, user_id=current_user.id)
        db.add(new_bookmark)
        db.commit()
        print("add bookmark")
        return {"Message": "Successfully added vote"}
    else: 
        if not found_bookmark:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="bookmark does not exist"
            )
        bookmark_query.delete(synchronize_session=False)
        db.commit()

        print("remove bookmark")
        return {"Message": "Successfully deleted vote"}
