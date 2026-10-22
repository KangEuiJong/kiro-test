const jwt = require('jsonwebtoken');

// 소셜 로그인 성공 후 JWT 발급 및 프론트로 리다이렉트
const socialCallback = (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.redirect(
        `${process.env.CLIENT_URL?.split(',')[0] || 'http://localhost:5173'}/social-callback?error=인증에 실패했습니다.`
      );
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    const userData = encodeURIComponent(
      JSON.stringify({
        id: user.id,
        email: user.email,
        name: user.name,
        provider: user.provider,
        createdAt: user.createdAt,
      })
    );

    // 프론트엔드 콜백 페이지로 토큰과 유저 정보 전달
    const clientUrl = process.env.CLIENT_URL?.split(',')[0] || 'http://localhost:5173';
    return res.redirect(`${clientUrl}/social-callback?token=${token}&user=${userData}`);
  } catch (error) {
    console.error('소셜 로그인 콜백 오류:', error);
    const clientUrl = process.env.CLIENT_URL?.split(',')[0] || 'http://localhost:5173';
    return res.redirect(`${clientUrl}/social-callback?error=서버 오류가 발생했습니다.`);
  }
};

module.exports = { socialCallback };
