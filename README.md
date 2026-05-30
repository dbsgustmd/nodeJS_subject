# 구독 다이어트 (Subscription Diet) 🥗

구독 다이어트는 사용자가 이용 중인 다양한 구독 서비스를 한눈에 파악하고, 월간 지출을 체계적으로 관리 및 최적화할 수 있도록 돕는 풀스택 웹 서비스입니다.

## 주요 기능
- **대시보드**: 월간 총 지출액, 이용 중인 서비스 수, 주요 지출 카테고리 요약 정보를 제공합니다.
- **지출 분석**: Recharts를 활용한 시각적 차트로 카테고리별 지출 비중을 한눈에 확인할 수 있습니다.
- **D-Day 알림**: 다음 결제일까지 남은 일수(D-Day)를 계산하여 배지로 표시해줍니다.
- **구독 관리**: 서비스 이름, 금액, 카테고리, 결제일, 자동 갱신 여부 등을 자유롭게 추가, 수정, 삭제(CRUD)할 수 있습니다.
- **보안 인증**: JWT(JSON Web Token) 기반의 보안 로그인 및 회원가입 기능을 제공합니다.
- **반응형 디자인**: PC, 태블릿, 모바일 등 모든 기기에서 최적화된 화면을 제공합니다.

## 기술 스택
- **프론트엔드**: React (Vite), TailwindCSS, Recharts, Lucide React, Axios.
- **백엔드**: Node.js, Express, Mongoose.
- **데이터베이스**: MongoDB Atlas.
- **컨테이너화**: Docker & Docker Compose.

## 시작하기

### 사전 준비 사항
- Node.js (v18 이상)
- MongoDB Atlas 계정
- Docker (선택 사항)

### 설치 방법
1. 저장소를 클론합니다.
2. `server` 디렉토리에 `.env` 파일을 생성하고 아래 내용을 입력합니다.
   ```env
   PORT=5000
   MONGO_URI=사용자의_MongoDB_Atlas_주소
   JWT_SECRET=사용자만의_보안_키
   NODE_ENV=development
   ```
3. 의존성 패키지를 설치합니다.
   ```bash
   # 서버 의존성 설치
   cd server
   npm install

   # 클라이언트 의존성 설치
   cd ../client
   npm install
   ```

### 실행 방법
#### 방법 1: 로컬 개발 환경
```bash
# 백엔드 실행 (server 디렉토리에서)
npm run dev

# 프론트엔드 실행 (client 디렉토리에서)
npm run dev
```

#### 방법 2: Docker Compose 사용
```bash
docker-compose up --build
```

## 배포
본 프로젝트는 **Render**와 같은 플랫폼에 배포할 준비가 되어 있습니다.
- **백엔드**: `server` 디렉토리를 기준으로 배포하며, 환경 변수를 설정해야 합니다.
- **프론트엔드**: `client`를 빌드(`npm run build`)한 후 정적 파일로 배포합니다.
