# main.py

from fastapi import FastAPI
from auth.routes import root_router,auth_router,test_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS 설정: React 개발 서버와 통신 허용
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8081"],  # 프론트엔드 주소
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 라우터 등록
app.include_router(root_router)
app.include_router(auth_router)
app.include_router(test_router)