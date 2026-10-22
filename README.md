# 풀스택 회원가입 웹앱

React + Node.js/Express 기반의 회원가입/로그인 웹 애플리케이션입니다.

## 기술 스택

| 영역 | 기술 |
|------|------|
| 프론트엔드 | React 19, Vite, React Router v7, Axios |
| 백엔드 | Node.js, Express, JWT, bcryptjs |
| 인증 방식 | JWT (Bearer Token) |

## 프로젝트 구조

```
kiroTest/
├── backend/
│   ├── src/
│   │   ├── config/        # DB 설정 (인메모리)
│   │   ├── controllers/   # 비즈니스 로직
│   │   ├── middleware/    # JWT 인증 미들웨어
│   │   ├── models/        # 데이터 모델
│   │   ├── routes/        # API 라우터
│   │   └── server.js      # 서버 진입점
│   ├── .env
│   └── package.json
└── frontend/
    ├── src/
    │   ├── api/           # Axios 인스턴스 및 API 함수
    │   ├── components/    # 공통 컴포넌트 (Navbar, ProtectedRoute)
    │   ├── context/       # AuthContext (전역 인증 상태)
    │   ├── pages/         # 페이지 컴포넌트
    │   └── main.jsx       # 앱 진입점
    ├── .env
    └── package.json
```

## 시작하기

### 백엔드 실행

```bash
cd backend
npm run dev
```

서버가 `http://localhost:5000` 에서 실행됩니다.

### 프론트엔드 실행

```bash
cd frontend
npm run dev
```

앱이 `http://localhost:3000` 에서 실행됩니다.

## API 엔드포인트

| 메서드 | 경로 | 설명 | 인증 필요 |
|--------|------|------|-----------|
| POST | /api/auth/register | 회원가입 | X |
| POST | /api/auth/login | 로그인 | X |
| GET | /api/auth/me | 내 정보 조회 | O |
| GET | /api/health | 서버 상태 확인 | X |

## 주요 기능

- 회원가입 (이름, 이메일, 비밀번호)
- 로그인 / 로그아웃
- JWT 토큰 기반 인증
- 마이페이지 (인증된 사용자만 접근)
- 보호된 라우트 (로그인하지 않은 사용자는 자동으로 로그인 페이지로 이동)

## 환경변수 설정

### backend/.env

```
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
```

### frontend/.env

```
VITE_API_URL=http://localhost:5000/api
```

## 주의사항

- 프로덕션 배포 시 `JWT_SECRET`은 반드시 예측하기 어려운 랜덤 값으로 변경하세요.
- 현재 백엔드는 인메모리 저장소를 사용하므로 서버 재시작 시 데이터가 초기화됩니다.
- 실제 서비스 운영에는 MongoDB, PostgreSQL 등의 데이터베이스 연동을 권장합니다.
