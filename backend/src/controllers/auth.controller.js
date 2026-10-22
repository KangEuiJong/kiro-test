const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { users } = require('../config/db');

// 회원가입
const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // 입력값 검증
    if (!email || !password || !name) {
      return res.status(400).json({ message: '이메일, 비밀번호, 이름을 모두 입력해주세요.' });
    }

    // 비밀번호 유효성 검사
    if (password.length < 10 || password.length >= 15) {
      return res.status(400).json({ message: '비밀번호는 10자 이상 15자 미만이어야 합니다.' });
    }
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^a-zA-Z0-9]/.test(password);
    const typeCount = [hasLower, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;
    if (typeCount < 2) {
      return res.status(400).json({ message: '비밀번호는 영어 소문자, 대문자, 숫자, 특수문자 중 2가지 이상을 포함해야 합니다.' });
    }

    // 이메일 중복 확인
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return res.status(409).json({ message: '이미 사용 중인 이메일입니다.' });
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 생성
    const newUser = new User({ email, password: hashedPassword, name });
    users.push(newUser);

    // JWT 발급
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    return res.status(201).json({
      message: '회원가입이 완료되었습니다.',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    console.error('회원가입 오류:', error);
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

// 로그인
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: '이메일과 비밀번호를 입력해주세요.' });
    }

    // 사용자 조회
    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(401).json({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' });
    }

    // 비밀번호 확인
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' });
    }

    // JWT 발급
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    return res.status(200).json({
      message: '로그인 성공',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('로그인 오류:', error);
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

// 내 정보 조회 (인증 필요)
const getMe = (req, res) => {
  const user = users.find((u) => u.id === req.userId);
  if (!user) {
    return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
  }

  return res.status(200).json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    },
  });
};

module.exports = { register, login, getMe };
