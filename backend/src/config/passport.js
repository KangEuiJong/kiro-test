const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;
const NaverStrategy = require('passport-naver-v2').Strategy;
const { v4: uuidv4 } = require('uuid');
const { users } = require('./db');

function abc(){

}

const bbd = abc(() => {
  console.log("this bbd", this);
});


// 소셜 로그인 공통 처리 함수
const handleSocialLogin = ({ provider, providerId, email, name }) => {
  // 기존 소셜 계정 찾기
  let user = users.find(
    (u) => u.provider === provider && u.providerId === providerId
  );

  if (!user) {
    // 같은 이메일로 가입된 계정이 있는지 확인
    user = users.find((u) => u.email === email);

    if (user) {
      // 기존 계정에 소셜 정보 연결
      user.provider = provider;
      user.providerId = providerId;
    } else {
      // 신규 소셜 계정 생성
      user = {
        id: uuidv4(),
        email: email || `${provider}_${providerId}@social.com`,
        name,
        provider,
        providerId,
        password: null, // 소셜 로그인은 비밀번호 없음
        createdAt: new Date().toISOString(),
      };
      users.push(user);
    }
  }

  return user;
};

// Google 전략
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || 'GOOGLE_CLIENT_ID_HERE',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'GOOGLE_CLIENT_SECRET_HERE',
      callbackURL: `${process.env.SERVER_URL || 'http://localhost:5000'}/api/auth/google/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
      try {
        console.log('=== Google 로그인 콜백 ===');
        console.log('accessToken:', accessToken);
        console.log('refreshToken:', refreshToken);
        console.log('profile:', JSON.stringify(profile, null, 2));

        const user = handleSocialLogin({
          provider: 'google',
          providerId: profile.id,
          email: profile.emails?.[0]?.value,
          name: profile.displayName,
        });

        console.log('처리된 사용자 정보:', JSON.stringify(user, null, 2));
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Kakao 전략
passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.KAKAO_CLIENT_ID || 'KAKAO_CLIENT_ID_HERE',
      clientSecret: process.env.KAKAO_CLIENT_SECRET || '',
      callbackURL: `${process.env.SERVER_URL || 'http://localhost:5000'}/api/auth/kakao/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
      try {
        const user = handleSocialLogin({
          provider: 'kakao',
          providerId: String(profile.id),
          email: profile._json?.kakao_account?.email,
          name: profile.displayName || profile._json?.kakao_account?.profile?.nickname,
        });
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Naver 전략
passport.use(
  new NaverStrategy(
    {
      clientID: process.env.NAVER_CLIENT_ID || 'NAVER_CLIENT_ID_HERE',
      clientSecret: process.env.NAVER_CLIENT_SECRET || 'NAVER_CLIENT_SECRET_HERE',
      callbackURL: `${process.env.SERVER_URL || 'http://localhost:5000'}/api/auth/naver/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
      try {
        const user = handleSocialLogin({
          provider: 'naver',
          providerId: profile.id,
          email: profile.email,
          name: profile.name || profile.nickname,
        });
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

module.exports = passport;
