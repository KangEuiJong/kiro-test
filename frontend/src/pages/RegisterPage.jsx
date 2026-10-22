import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../api/auth';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      return setError('비밀번호가 일치하지 않습니다.');
    }

    const pw = form.password;
    if (pw.length < 10 || pw.length >= 15) {
      return setError('비밀번호는 10자 이상 15자 미만이어야 합니다.');
    }

    const hasLower = /[a-z]/.test(pw);
    const hasUpper = /[A-Z]/.test(pw);
    const hasNumber = /[0-9]/.test(pw);
    const hasSpecial = /[^a-zA-Z0-9]/.test(pw);
    const typeCount = [hasLower, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;
    if (typeCount < 2) {
      return setError('비밀번호는 영어 소문자, 대문자, 숫자, 특수문자 중 2가지 이상을 포함해야 합니다.');
    }

    setLoading(true);
    try {
      const res = await register({ name: form.name, email: form.email, password: form.password });
      login(res.data.token, res.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || '회원가입에 실패했습니다.');
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
                <path d='M15 12c2.7 0 4.8-2.1 4.8-4.8S17.7 2.4 15 2.4s-4.8 2.1-4.8 4.8S12.3 12 15 12zm-9 2.4c0-1.1.3-3.3 2.4-4.5C7.2 10.2 6 10.8 6 10.8c-3.2 1.6-3.6 4.3-3.6 4.8V18h7.2v-1.2C8.4 15.6 6 14.4 6 14.4zm9 0c-3.2 0-9.6 1.6-9.6 4.8V19h19.2v-1.8c0-3.2-6.4-4.8-9.6-4.8zm3.6-6a1.2 1.2 0 0 0-1.2 1.2v1.2h-1.2a1.2 1.2 0 0 0 0 2.4h1.2v1.2a1.2 1.2 0 0 0 2.4 0v-1.2h1.2a1.2 1.2 0 0 0 0-2.4h-1.2V9.6a1.2 1.2 0 0 0-1.2-1.2z' />
              </svg>
            </div>
            <h2>회원가입</h2>
            <p className='auth-card-subtitle'>새 계정을 만들어보세요</p>
          </div>

          <form onSubmit={handleSubmit} className='auth-form'>
            <div className='form-group'>
              <label htmlFor='name'>이름</label>
              <input
                id='name'
                type='text'
                name='name'
                value={form.name}
                onChange={handleChange}
                placeholder='이름을 입력하세요'
                autoComplete='name'
                required
              />
            </div>
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
                placeholder='10자 이상 15자 미만'
                autoComplete='new-password'
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='confirmPassword'>비밀번호 확인</label>
              <input
                id='confirmPassword'
                type='password'
                name='confirmPassword'
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder='비밀번호를 다시 입력하세요'
                autoComplete='new-password'
                required
              />
            </div>
            {error && <p className='error-message'>{error}</p>}
            <button type='submit' className='btn btn-primary btn-full' disabled={loading}>
              {loading ? '처리 중...' : '회원가입'}
            </button>
          </form>

          <p className='auth-link'>
            이미 계정이 있으신가요? <Link to='/login'>로그인</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
