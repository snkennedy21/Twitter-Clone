from fastapi import APIRouter, Depends, status, HTTPException, Response, Request
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from sqlalchemy import or_
from ..schemas import UserLogin, Token, TokenData
from ..models import User
from jose import JWTError, jwt

from .. import database, utils, oauth2

router = APIRouter(
  tags = ["Authentication"]
)
# response_model=Token
@router.post('/login', response_model=Token)
def login(response: Response, user_credentials: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    
    user = db.query(User).where(User.email == user_credentials.username).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid Login Credentials"
        )
    if not utils.verify(user_credentials.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid Login Credentials"
        ) 

    access_token = oauth2.create_access_token(data={"user_id": user.id, "handle": user.handle})

    response.set_cookie(
        key="access_token",
        value=f"Bearer {access_token}",
        httponly=True, expires=3600,
        secure=True,
        samesite="none"
    )

    print('hello')

    return {"access_token": access_token, "token_type": "bearer", "user": user}
    