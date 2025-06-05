# auth/routes.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta

root_router = APIRouter(tags=["root"])
auth_router = APIRouter(prefix="/api/auth", tags=["auth"])
test_router = APIRouter(prefix="/api/test", tags=["test"])

# 메모리 기반 사용자 저장소
fake_user_db = {}

# 암호화 설정
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT 설정
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# 모델 정의
class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str


# JWT 생성 함수
def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


@root_router.get("/")
def read_root():
    return {"message": "FastAPI backend is running."}

# 🔐 회원가입
@auth_router.post("/signup")
def signup(user: UserCreate):
    if user.username in fake_user_db:
        raise HTTPException(status_code=400, detail="User already exists")
    
    hashed_pw = pwd_context.hash(user.password)
    fake_user_db[user.username] = {
        "username": user.username,
        "email": user.email,
        "hashed_password": hashed_pw,
        "role": "user"  # 기본 권한 설정
    }
    return {"message": "User registered successfully"}

# 🔐 로그인
@auth_router.post("/signin")
def signin(user: UserLogin):
    db_user = fake_user_db.get(user.username)
    if not db_user or not pwd_context.verify(user.password, db_user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = create_access_token(data={"sub": user.username}, expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    
    return {
        "accessToken": access_token,
        "username": db_user["username"],
        "email": db_user["email"],
        "role": db_user["role"]  # 기본 역할 설정
    }

@test_router.get("/all")
def get_all_access():
    return {"message": "Public content accessible by anyone"}