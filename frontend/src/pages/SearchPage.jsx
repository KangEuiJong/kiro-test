import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  DUMMY_TRADE,
  DUMMY_RENT,
  DUMMY_COMPLEX,
  DUMMY_PUB_PRICE,
  REGIONS,
} from '../data/realEstate';

const YEARS = ['2026', '2025', '2024', '2023', '2022'];
const MONTHS = ['01','02','03','04','05','06','07','08','09','10','11','12'];

const TABS = [
  { key: 'trade', label: '매매 실거래가' },
  { key: 'rent', label: '전월세 실거래가' },
  { key: 'complex', label: '단지 정보' },
  { key: 'pubPrice', label: '공시가격' },
];

const formatPrice = (price) => {
  if (!price) return '-';
  if (price >= 10000) {
    const uk = Math.floor(price / 10000);
    const man = price % 10000;
    return man > 0 ? `${uk}억 ${man.toLocaleString()}` : `${uk}억`;
  }
  return `${price.toLocaleString()}만`;
};

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const regionCode = searchParams.get('regionCode') || '';
  const regionName = searchParams.get('regionName') || '';
  const initYear = searchParams.get('year') || '2026';
  const initMonth = searchParams.get('month') || '08';

  const [activeTab, setActiveTab] = useState('trade');
  const [selectedApt, setSelectedApt] = useState(null);
  const [form, setForm] = useState({ region: regionCode, year: initYear, month: initMonth });

  const handleSearch = (e) => {
    e.preventDefault();
    const found = REGIONS.find((r) => r.code === form.region);
    const params = new URLSearchParams({
      regionCode: form.region,
      year: form.year,
      month: form.month,
      regionName: found?.name || '',
    });
    navigate(`/search?${params.toString()}`);
    setSelectedApt(null);
  };

  // 선택된 단지의 공시가격 필터
  const filteredPubPrice = selectedApt
    ? DUMMY_PUB_PRICE.filter((p) => p.aptName === selectedApt)
    : DUMMY_PUB_PRICE;

  const filteredComplex = selectedApt
    ? DUMMY_COMPLEX.filter((c) => c.aptName === selectedApt)
    : DUMMY_COMPLEX;

  return (
    <div className='portal-home'>
      {/* ── 검색바 ── */}
      <section className='search-top-bar'>
        <div className='search-top-inner'>
          <form className='search-top-form' onSubmit={handleSearch}>
            <select
              value={form.region}
              onChange={(e) => setForm({ ...form, region: e.target.value })}
              className='search-select'
            >
              <option value=''>지역 선택</option>
              {REGIONS.map((r) => (
                <option key={r.code} value={r.code}>{r.name}</option>
              ))}
            </select>
            <select
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
              className='search-select'
            >
              {YEARS.map((y) => (
                <option key={y} value={y}>{y}년</option>
              ))}
            </select>
            <select
              value={form.month}
              onChange={(e) => setForm({ ...form, month: e.target.value })}
              className='search-select'
            >
              {MONTHS.map((m) => (
                <option key={m} value={m}>{parseInt(m)}월</option>
              ))}
            </select>
            <button type='submit' className='search-top-btn'>재조회</button>
          </form>
          {regionName && (
            <div className='search-result-label'>
              📍 <strong>{regionName}</strong> · {initYear}년 {parseInt(initMonth)}월 조회 결과
            </div>
          )}
        </div>
      </section>

      <div className='portal-body'>
        {/* ── 탭 ── */}
        <div className='result-tabs'>
          {TABS.map((t) => (
            <button
              key={t.key}
              className={`result-tab ${activeTab === t.key ? 'active' : ''}`}
              onClick={() => setActiveTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── 단지 필터 버튼 ── */}
        {(activeTab === 'pubPrice' || activeTab === 'complex') && (
          <div className='apt-filter'>
            <span className='apt-filter-label'>단지 선택</span>
            <button
              className={`apt-filter-btn ${!selectedApt ? 'active' : ''}`}
              onClick={() => setSelectedApt(null)}
            >
              전체
            </button>
            {DUMMY_COMPLEX.map((c) => (
              <button
                key={c.aptName}
                className={`apt-filter-btn ${selectedApt === c.aptName ? 'active' : ''}`}
                onClick={() => setSelectedApt(c.aptName)}
              >
                {c.aptName}
              </button>
            ))}
          </div>
        )}

        {/* ── 매매 실거래가 탭 ── */}
        {activeTab === 'trade' && (
          <div className='result-section'>
            <div className='result-summary'>
              총 <strong>{DUMMY_TRADE.length}건</strong>의 매매 거래 내역
              <span className='result-notice'>※ 더미 데이터 · API 연동 전</span>
            </div>
            <div className='result-table-wrap'>
              <table className='result-table'>
                <thead>
                  <tr>
                    <th>단지명</th>
                    <th>법정동</th>
                    <th>거래금액</th>
                    <th>전용면적</th>
                    <th>층</th>
                    <th>거래일</th>
                    <th>건축년도</th>
                  </tr>
                </thead>
                <tbody>
                  {DUMMY_TRADE.map((t, i) => (
                    <tr key={i}>
                      <td className='apt-name-cell'>{t.aptName}</td>
                      <td>{t.dong}</td>
                      <td className='price-cell'>{formatPrice(t.price)}원</td>
                      <td>{t.area}㎡</td>
                      <td>{t.floor}층</td>
                      <td>{t.dealYear}.{String(t.dealMonth).padStart(2,'0')}.{String(t.dealDay).padStart(2,'0')}</td>
                      <td>{t.buildYear}년</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── 전월세 실거래가 탭 ── */}
        {activeTab === 'rent' && (
          <div className='result-section'>
            <div className='result-summary'>
              총 <strong>{DUMMY_RENT.length}건</strong>의 전월세 거래 내역
              <span className='result-notice'>※ 더미 데이터 · API 연동 전</span>
            </div>
            <div className='result-table-wrap'>
              <table className='result-table'>
                <thead>
                  <tr>
                    <th>단지명</th>
                    <th>법정동</th>
                    <th>유형</th>
                    <th>보증금</th>
                    <th>월세</th>
                    <th>전용면적</th>
                    <th>층</th>
                    <th>거래일</th>
                  </tr>
                </thead>
                <tbody>
                  {DUMMY_RENT.map((r, i) => (
                    <tr key={i}>
                      <td className='apt-name-cell'>{r.aptName}</td>
                      <td>{r.dong}</td>
                      <td>
                        <span className={`contract-badge ${r.contractType === '전세' ? 'jeonse' : 'monthly'}`}>
                          {r.contractType}
                        </span>
                      </td>
                      <td className='price-cell'>{formatPrice(r.deposit)}원</td>
                      <td>{r.monthlyRent > 0 ? `${r.monthlyRent.toLocaleString()}만원` : '-'}</td>
                      <td>{r.area}㎡</td>
                      <td>{r.floor}층</td>
                      <td>{r.dealYear}.{String(r.dealMonth).padStart(2,'0')}.{String(r.dealDay).padStart(2,'0')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── 단지 정보 탭 ── */}
        {activeTab === 'complex' && (
          <div className='result-section'>
            <div className='result-summary'>
              총 <strong>{filteredComplex.length}개</strong> 단지 정보
              <span className='result-notice'>※ 더미 데이터 · API 연동 전</span>
            </div>
            <div className='complex-grid'>
              {filteredComplex.map((c, i) => (
                <div key={i} className='complex-card'>
                  <div className='complex-card-header'>
                    <h3 className='complex-name'>{c.aptName}</h3>
                    <span className='complex-year'>{c.buildYear}년 준공</span>
                  </div>
                  <div className='complex-address'>📍 {c.address}</div>
                  <div className='complex-info-grid'>
                    <div className='complex-info-item'>
                      <span className='info-key'>세대 수</span>
                      <span className='info-val'>{c.totalHousehold.toLocaleString()}세대</span>
                    </div>
                    <div className='complex-info-item'>
                      <span className='info-key'>주차 대수</span>
                      <span className='info-val'>{c.parkingCount.toLocaleString()}대</span>
                    </div>
                    <div className='complex-info-item'>
                      <span className='info-key'>최고층</span>
                      <span className='info-val'>{c.floorCount}층</span>
                    </div>
                    <div className='complex-info-item'>
                      <span className='info-key'>동 수</span>
                      <span className='info-val'>{c.dongCount}동</span>
                    </div>
                    <div className='complex-info-item'>
                      <span className='info-key'>난방 방식</span>
                      <span className='info-val'>{c.heatType}</span>
                    </div>
                    <div className='complex-info-item'>
                      <span className='info-key'>관리비(평균)</span>
                      <span className='info-val'>약 {c.managementCost}만원</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 공시가격 탭 ── */}
        {activeTab === 'pubPrice' && (
          <div className='result-section'>
            <div className='result-summary'>
              총 <strong>{filteredPubPrice.length}건</strong>의 공시가격 정보
              <span className='result-notice'>※ 더미 데이터 · API 연동 전</span>
            </div>
            <div className='result-table-wrap'>
              <table className='result-table'>
                <thead>
                  <tr>
                    <th>단지명</th>
                    <th>법정동</th>
                    <th>전용면적</th>
                    <th>층</th>
                    <th>공시가격</th>
                    <th>기준연도</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPubPrice.map((p, i) => (
                    <tr key={i}>
                      <td className='apt-name-cell'>{p.aptName}</td>
                      <td>{p.dong}</td>
                      <td>{p.area}㎡</td>
                      <td>{p.floor}층</td>
                      <td className='price-cell'>{formatPrice(p.pubPrice)}원</td>
                      <td>{p.baseYear}년</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
