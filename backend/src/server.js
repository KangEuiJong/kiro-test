require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('./config/passport');

const authRoutes = require('./routes/auth.routes');
const socialRoutes = require('./routes/social.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// 미들웨어
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim());

app.use(cors({
  origin: (origin, callback) => {
    // origin이 없는 경우(같은 서버 요청, curl 등) 허용
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS 차단: ${origin}`));
    }
  },
  credentials: true,
}));
app.use(express.json());
app.use(passport.initialize());

// 라우터
app.use('/api/auth', authRoutes);
app.use('/api/auth', socialRoutes);

// 헬스 체크
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: '서버가 정상 동작 중입니다.' });
});

// 404 처리
app.use((req, res) => {
  res.status(404).json({ message: '요청한 경로를 찾을 수 없습니다.' });
});

// 에러 핸들러
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: '서버 내부 오류가 발생했습니다.' });
});

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});

module.exports = app;
