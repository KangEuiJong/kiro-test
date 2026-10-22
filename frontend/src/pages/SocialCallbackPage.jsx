import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SocialCallbackPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    const userParam = searchParams.get('user');
    const error = searchParams.get('error');

    if (error) {
      setErrorMsg(decodeURIComponent(error));
      setTimeout(() => navigate('/login'), 3000);
      return;
    }

    if (token && userParam) {
      try {
        const user = JSON.parse(decodeURIComponent(userParam));
        login(token, user);
        navigate('/');
      } catch {
        setErrorMsg('로그인 처리 중 오류가 발생했습니다.');
        setTimeout(() => navigate('/login'), 3000);
      }
      return;
    }

    // token도 error도 없는 경우
    setErrorMsg('잘못된 접근입니다.');
    setTimeout(() => navigate('/login'), 3000);
  }, []);

  if (errorMsg) {
    return (
      <div className="page auth-page">
        <div className="auth-card" style={{ textAlign: 'center' }}>
          <p className="error-message" style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>
            {errorMsg}
          </p>
          <p style={{ color: '#999', fontSize: '0.875rem' }}>3초 후 로그인 페이지로 이동합니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page auth-page">
      <div className="auth-card" style={{ textAlign: 'center' }}>
        <p style={{ color: '#666' }}>로그인 처리 중입니다...</p>
      </div>
    </div>
  );
};

export default SocialCallbackPage;
