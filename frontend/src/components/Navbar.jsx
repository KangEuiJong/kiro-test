import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className='portal-navbar'>
      <div className='portal-navbar-inner'>
        {/* 로고 */}
        <div className='portal-logo'>
          <Link to='/'>
            <span className='logo-icon'>🏠</span>
            <span className='logo-text'>집찾자</span>
          </Link>
        </div>

        {/* 검색바 */}
        <div className='portal-search'>
          <input
            type='text'
            placeholder='지역, 단지명, 주소 검색'
          />
          <button className='portal-search-btn'>🔍</button>
        </div>

        {/* 메뉴 */}
        <div className='portal-nav-menu'>
          <Link to='/'>매매</Link>
          <Link to='/'>전월세</Link>
          <Link to='/'>분양</Link>
          <Link to='/'>인테리어</Link>
          {user ? (
            <>
              <Link to='/mypage' className='nav-mypage'>마이페이지</Link>
              <button onClick={handleLogout} className='nav-logout-btn'>로그아웃</button>
            </>
          ) : (
            <>
              <Link to='/login' className='nav-login-btn'>로그인</Link>
              <Link to='/register' className='nav-register-btn'>회원가입</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
