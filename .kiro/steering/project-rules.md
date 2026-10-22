---
inclusion: always
---

# 프로젝트 규칙

## 기술 스택
- 프론트엔드: React 19, Vite, React Router v7, Axios
- 백엔드: Node.js, Express, JWT, bcryptjs, Passport.js
- 인증: JWT (Bearer Token), 소셜 로그인 (Google, Kakao, Naver)

---

## 프로젝트 구조

### 백엔드 (backend/src/)
- `config/`      : DB, passport 등 설정 파일
- `controllers/` : 비즈니스 로직 처리
- `middleware/`  : 인증 등 미들웨어
- `models/`      : 데이터 모델 정의
- `routes/`      : API 라우터

### 프론트엔드 (frontend/src/)
- `api/`         : axios 인스턴스 및 API 호출 함수
- `components/`  : 재사용 가능한 공통 컴포넌트
- `context/`     : 전역 상태 관리 (AuthContext 등)
- `pages/`       : 라우트별 페이지 컴포넌트

### 신규 기능 추가 시 순서
1. 백엔드 모델 → 컨트롤러 → 라우터 순으로 작성
2. server.js에 라우터 등록
3. 프론트엔드 api/ 에 호출 함수 추가
4. pages/ 또는 components/ 에 UI 작성

---

## 코딩 컨벤션

### 공통
- 들여쓰기는 2칸 스페이스 사용
- 문자열은 작은따옴표(' ') 사용 (JSX 속성 제외)
- 세미콜론 항상 포함
- 파일명: 컴포넌트는 PascalCase, 나머지는 camelCase
- 불필요한 주석 및 console.log는 커밋 전 제거

### 백엔드 (Node.js/Express)
- 라우터, 컨트롤러, 미들웨어 역할별로 파일 분리 유지
- 비동기 함수는 async/await 사용, 콜백 방식 금지
- 에러 응답은 반드시 `{ message: '...' }` 형태로 통일
- 환경변수는 .env에서만 관리, 코드에 직접 하드코딩 금지
- 새로운 라우터 추가 시 server.js에 반드시 등록

### 프론트엔드 (React)
- 컴포넌트는 함수형으로만 작성, 클래스형 컴포넌트 사용 금지
- 상태 관리는 useState, 전역 상태는 Context API 사용
- API 호출은 반드시 src/api/ 폴더에서만 처리, 컴포넌트 내 직접 호출 금지
- 페이지 컴포넌트는 src/pages/, 공통 컴포넌트는 src/components/에 위치
- 인증이 필요한 페이지는 반드시 ProtectedRoute로 감싸기

---

## API 응답 규칙

### 응답 형태 통일
모든 API 응답은 아래 형태를 따른다.

성공:
```json
{ "message": "...", "data": { } }
```

실패:
```json
{ "message": "에러 내용" }
```

### HTTP 상태코드
- 200: 조회 성공
- 201: 생성 성공
- 400: 잘못된 요청 (입력값 오류)
- 401: 인증 실패
- 403: 권한 없음
- 404: 리소스 없음
- 409: 중복 (이메일 중복 등)
- 500: 서버 오류

### 인증이 필요한 API
- Authorization 헤더에 Bearer 토큰 포함
- 토큰이 없거나 유효하지 않으면 401 반환
- 로그인/회원가입 API는 401 응답 시 로그인 페이지로 리다이렉트하지 않음

---

## 보안 규칙

- 비밀번호는 bcryptjs로 해싱 후 저장, 평문 저장 절대 금지
- JWT 시크릿은 반드시 .env에서 관리, 코드에 직접 작성 금지
- .env 파일은 절대 git에 커밋하지 않는다 (.gitignore 확인)
- 사용자 입력값은 프론트엔드와 백엔드 양쪽 모두에서 검증
- 프론트엔드 검증만으로 신뢰 금지, 백엔드에서 반드시 재검증
- API 응답에서 password 필드는 절대 포함하지 않는다
- 소셜 로그인 Client ID/Secret은 반드시 .env에서 관리

---

## 비밀번호 정책
- 10자 이상 15자 미만
- 영어 소문자, 대문자, 숫자, 특수문자 중 2가지 이상 포함

---

## 환경변수 목록

### backend/.env
```
PORT                  : 서버 포트 (기본 5000)
JWT_SECRET            : JWT 서명 키 (프로덕션에서 반드시 변경)
JWT_EXPIRES_IN        : JWT 만료 시간 (기본 7d)
CLIENT_URL            : 허용할 프론트엔드 URL (콤마로 구분, CORS 설정에 사용)
SERVER_URL            : 백엔드 서버 URL (소셜 로그인 콜백 URL 생성에 사용)
GOOGLE_CLIENT_ID      : Google OAuth 클라이언트 ID
GOOGLE_CLIENT_SECRET  : Google OAuth 클라이언트 시크릿
KAKAO_CLIENT_ID       : 카카오 REST API 키
KAKAO_CLIENT_SECRET   : 카카오 클라이언트 시크릿 (선택)
NAVER_CLIENT_ID       : 네이버 클라이언트 ID
NAVER_CLIENT_SECRET   : 네이버 클라이언트 시크릿
```

### frontend/.env
```
VITE_API_URL          : 백엔드 API 기본 URL (기본 http://localhost:5000/api)
```
