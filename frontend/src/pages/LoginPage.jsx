import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as loginApi } from '../api/auth';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginApi(form);
      login(res.data.token, res.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || '로그인에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='bg-shapes'>
        <div className='shape shape-1' />
        <div className='shape shape-2' />
        <div className='shape shape-3' />
      </div>
      <div className='page auth-page' style={{ position: 'relative', zIndex: 1 }}>
        <div className='auth-card'>
          <div className='auth-card-header'>
            <div className='auth-card-icon'>
              <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                <path d='M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z' />
              </svg>
            </div>
            <h2>로그인</h2>
            <p className='auth-card-subtitle'>계정에 로그인하세요</p>
          </div>

          <form onSubmit={handleSubmit} className='auth-form'>
            <div className='form-group'>
              <label htmlFor='email'>이메일</label>
              <input
                id='email'
                type='email'
                name='email'
                value={form.email}
                onChange={handleChange}
                placeholder='이메일을 입력하세요'
                autoComplete='email'
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>비밀번호</label>
              <input
                id='password'
                type='password'
                name='password'
                value={form.password}
                onChange={handleChange}
                placeholder='비밀번호를 입력하세요'
                autoComplete='current-password'
                required
              />
            </div>
            {error && <p className='error-message'>{error}</p>}
            <button type='submit' className='btn btn-primary btn-full' disabled={loading}>
              {loading ? '처리 중...' : '로그인'}
            </button>
          </form>

          <div className='social-divider'>
            <span>또는 소셜 계정으로 로그인</span>
          </div>

          <div className='social-buttons'>
            <a href={`${API_URL}/auth/google`} className='btn-social btn-google'>
              <img src='https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg' alt='Google' />
              Google로 로그인
            </a>
            <a href={`${API_URL}/auth/naver`} className='btn-social btn-naver'>
              <span className='social-icon'>N</span>
              네이버로 로그인
            </a>
            <a href={`${API_URL}/auth/kakao`} className='btn-social btn-kakao'>
              <span className='social-icon'>K</span>
              카카오로 로그인
            </a>
          </div>

          <p className='auth-link'>
            계정이 없으신가요? <Link to='/register'>회원가입</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
