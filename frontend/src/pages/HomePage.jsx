import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { REGIONS } from '../data/realEstate';

const YEARS = ['2026', '2025', '2024', '2023', '2022'];
const MONTHS = ['01','02','03','04','05','06','07','08','09','10','11','12'];

const STATS = [
  { label: '이번달 매매 거래', value: '4,821건', icon: '📈' },
  { label: '이번달 전월세 거래', value: '12,304건', icon: '📋' },
  { label: '전국 아파트 단지', value: '89,412개', icon: '🏢' },
  { label: '공시가격 등록', value: '1,240만건', icon: '📊' },
];

const RECENT_NEWS = [
  { id: 1, category: '시장동향', title: '서울 아파트 매매 거래량 3개월 연속 증가세', date: '2026.08.18' },
  { id: 2, category: '정책', title: '정부, 1주택자 재산세 한시 감면 연장 검토', date: '2026.08.17' },
  { id: 3, category: '분양', title: '강남권 대단지 분양 예정… 청약 경쟁률 수백 대 1 예상', date: '2026.08.16' },
  { id: 4, category: '금융', title: '주택담보대출 금리 소폭 하락… 3%대 진입 가능성', date: '2026.08.15' },
  { id: 5, category: '시장동향', title: '경기 수도권 전세가율 소폭 반등… 수요 회복 신호', date: '2026.08.14' },
];

const POPULAR_REGIONS = ['강남구', '서초구', '송파구', '마포구', '용산구', '분당구', '수지구', '일산동구'];

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [searchForm, setSearchForm] = useState({
    region: '',
    year: '2026',
    month: '08',
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchForm.region) return;
    const params = new URLSearchParams({
      regionCode: searchForm.region,
      year: searchForm.year,
      month: searchForm.month,
      regionName: REGIONS.find((r) => r.code === searchForm.region)?.name || '',
    });
    navigate(`/search?${params.toString()}`);
  };

  const handleQuickRegion = (regionName) => {
    const found = REGIONS.find((r) => r.name.includes(regionName));
    if (found) {
      const params = new URLSearchParams({
        regionCode: found.code,
        year: searchForm.year,
        month: searchForm.month,
        regionName: found.name,
      });
      navigate(`/search?${params.toString()}`);
    }
  };

  return (
    <div className='portal-home'>

      {/* ── 히어로 섹션 ── */}
      <section className='portal-hero'>
        <div className='portal-hero-inner'>
          <div className='hero-badge'>🏠 전국 부동산 실거래가 조회</div>
          <h1>아파트 실거래가,<br /><span>정확하게 확인하세요</span></h1>
          <p>국토교통부 공공데이터 기반 · 매매 · 전월세 · 단지정보 · 공시가격</p>

          <form className='hero-search-box' onSubmit={handleSearch}>
            <div className='hero-search-selects'>
              <select
                value={searchForm.region}
                onChange={(e) => setSearchForm({ ...searchForm, region: e.target.value })}
                className='hero-select'
              >
                <option value=''>지역 선택</option>
                {REGIONS.map((r) => (
                  <option key={r.code} value={r.code}>{r.name}</option>
                ))}
              </select>
              <select
                value={searchForm.year}
                onChange={(e) => setSearchForm({ ...searchForm, year: e.target.value })}
                className='hero-select'
              >
                {YEARS.map((y) => (
                  <option key={y} value={y}>{y}년</option>
                ))}
              </select>
              <select
                value={searchForm.month}
                onChange={(e) => setSearchForm({ ...searchForm, month: e.target.value })}
                className='hero-select'
              >
                {MONTHS.map((m) => (
                  <option key={m} value={m}>{parseInt(m)}월</option>
                ))}
              </select>
              <button type='submit' className='hero-search-btn'>조회하기</button>
            </div>
          </form>

          <div className='hero-quick-regions'>
            <span className='quick-label'>인기 지역</span>
            {POPULAR_REGIONS.map((r) => (
              <button key={r} className='quick-region-btn' onClick={() => handleQuickRegion(r)}>{r}</button>
            ))}
          </div>
        </div>
      </section>

      {/* ── 통계 배너 ── */}
      <section className='stats-banner'>
        <div className='stats-inner'>
          {STATS.map((s) => (
            <div key={s.label} className='stat-item'>
              <span className='stat-icon'>{s.icon}</span>
              <div>
                <div className='stat-value'>{s.value}</div>
                <div className='stat-label'>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className='portal-body'>
        <div className='portal-columns'>

          {/* ── 뉴스 섹션 ── */}
          <section className='portal-section'>
            <div className='section-header'>
              <h2 className='section-title'>📰 부동산 뉴스</h2>
              <span className='section-more'>더보기 →</span>
            </div>
            <div className='news-list'>
              {RECENT_NEWS.map((n) => (
                <div key={n.id} className='news-card'>
                  <div className='news-header'>
                    <span className='news-category'>{n.category}</span>
                    <span className='news-date'>{n.date}</span>
                  </div>
                  <div className='news-title'>{n.title}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ── 사이드바 ── */}
          <aside className='portal-aside'>

            {/* 로그인 위젯 */}
            <div className='aside-widget login-widget'>
              {user ? (
                <div className='login-widget-user'>
                  <div className='login-widget-avatar'>👤</div>
                  <p className='login-widget-name'>{user.name}님</p>
                  <p className='login-widget-email'>{user.email}</p>
                  <a href='/mypage' className='widget-btn widget-btn-primary'>마이페이지</a>
                </div>
              ) : (
                <>
                  <h3 className='widget-title'>로그인</h3>
                  <div className='login-widget-form'>
                    <input type='email' placeholder='이메일' className='widget-input' />
                    <input type='password' placeholder='비밀번호' className='widget-input' />
                    <a href='/login' className='widget-btn widget-btn-primary'>로그인</a>
                    <a href='/register' className='widget-btn widget-btn-outline'>회원가입</a>
                  </div>
                </>
              )}
            </div>

            {/* 빠른 조회 */}
            <div className='aside-widget'>
              <h3 className='widget-title'>⚡ 빠른 조회</h3>
              <div className='quick-search-list'>
                {REGIONS.slice(0, 8).map((r) => (
                  <button
                    key={r.code}
                    className='quick-search-item'
                    onClick={() => {
                      const params = new URLSearchParams({
                        regionCode: r.code,
                        year: searchForm.year,
                        month: searchForm.month,
                        regionName: r.name,
                      });
                      navigate(`/search?${params.toString()}`);
                    }}
                  >
                    <span>{r.name}</span>
                    <span className='quick-search-arrow'>›</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 조회 안내 */}
            <div className='aside-widget guide-widget'>
              <h3 className='widget-title'>📌 이용 안내</h3>
              <ul className='guide-list'>
                <li>지역과 기간을 선택하면 실거래가를 조회할 수 있습니다.</li>
                <li>매매, 전월세 탭으로 거래 유형을 구분합니다.</li>
                <li>단지명 클릭 시 단지 상세정보와 공시가격을 확인할 수 있습니다.</li>
                <li>데이터 출처: 국토교통부 공공데이터포털</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
