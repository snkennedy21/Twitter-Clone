from fastapi import FastAPI, status, HTTPException, Depends, APIRouter, Response
from app.schemas import UserCreate, UserResponse
from app import utils
from app.models import User
from sqlalchemy.orm import Session
from app.database import get_db
import re
from typing import Optional
from .. import oauth2

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=UserResponse)
def create_user(user: UserCreate, response: Response,  db: Session = Depends(get_db)):
    print(user)
    
    hashed_password = utils.hash(user.password)
    user.password = hashed_password

    new_user = User(**user.dict())

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    access_token = oauth2.create_access_token(data={"user_id": new_user.id, "handle": new_user.handle})

    response.set_cookie(
        key="access_token",
        value=f"Bearer {access_token}",
        httponly=True, expires=3600,
        secure=True,
        samesite="none"
    )
   
    return new_user


@router.get("/{id}", response_model=UserResponse)
def get_user(id: int, db: Session = Depends(get_db)):
    user = db.query(User).where(User.id == id).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id: {id} does not exist"
        )
    
    return user



@router.get("/valid/email/{email}")
def check_if_email_valid(email: str, db: Session=Depends(get_db)):
    if email is None:
        return {"Message": "Bad"}
    regex = re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+')

    email_invalid = not re.fullmatch(regex, email)
    user = db.query(User).where(User.email == email).first()
    detail = ''

    if email_invalid or user:
        if email_invalid:
            detail += "Invalid Email"
        if user:
            detail += "This email already exists"

        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=detail
        )

    return user is not None


@router.get("/valid/handle/{twitter_handle}")
def check_if_twitter_handle_valid(twitter_handle: str, db: Session=Depends(get_db)):
    user = db.query(User).where(User.handle == twitter_handle).first()

    if user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="This handle already exists"
        )
    

    return user is not None