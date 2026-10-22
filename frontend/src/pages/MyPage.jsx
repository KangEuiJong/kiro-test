import { useAuth } from '../context/AuthContext';

const MyPage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="page mypage">
      <div className="mypage-card">
        <h2>마이페이지</h2>
        <div className="user-info">
          <div className="info-row">
            <span className="info-label">이름</span>
            <span className="info-value">{user?.name}</span>
          </div>
          <div className="info-row">
            <span className="info-label">이메일</span>
            <span className="info-value">{user?.email}</span>
          </div>
          <div className="info-row">
            <span className="info-label">가입일</span>
            <span className="info-value">
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('ko-KR') : '-'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
