const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const { socialCallback } = require('../controllers/social.controller');

// ─── Google ───────────────────────────────────────────
// GET /api/auth/google  →  구글 로그인 페이지로 이동
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);

// GET /api/auth/google/callback  →  구글 인증 후 콜백
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  socialCallback
);

// ─── Kakao ────────────────────────────────────────────
// GET /api/auth/kakao  →  카카오 로그인 페이지로 이동
router.get(
  '/kakao',
  passport.authenticate('kakao', { session: false })
);

// GET /api/auth/kakao/callback  →  카카오 인증 후 콜백
router.get(
  '/kakao/callback',
  passport.authenticate('kakao', { session: false, failureRedirect: '/login' }),
  socialCallback
);

// ─── Naver ────────────────────────────────────────────
// GET /api/auth/naver  →  네이버 로그인 페이지로 이동
router.get(
  '/naver',
  passport.authenticate('naver', { session: false })
);

// GET /api/auth/naver/callback  →  네이버 인증 후 콜백
router.get(
  '/naver/callback',
  passport.authenticate('naver', { session: false, failureRedirect: '/login' }),
  socialCallback
);

module.exports = router;
