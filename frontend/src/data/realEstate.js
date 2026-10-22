// 더미 데이터 - 공공 API 연동 전 UI 구성용
// 실제 연동 시 이 파일을 API 호출로 교체

// 지역 코드 목록 (법정동 코드 앞 5자리)
export const REGIONS = [
  { code: '11110', name: '서울 종로구' },
  { code: '11140', name: '서울 중구' },
  { code: '11170', name: '서울 용산구' },
  { code: '11200', name: '서울 성동구' },
  { code: '11215', name: '서울 광진구' },
  { code: '11230', name: '서울 동대문구' },
  { code: '11260', name: '서울 중랑구' },
  { code: '11290', name: '서울 성북구' },
  { code: '11305', name: '서울 강북구' },
  { code: '11320', name: '서울 도봉구' },
  { code: '11350', name: '서울 노원구' },
  { code: '11380', name: '서울 은평구' },
  { code: '11410', name: '서울 서대문구' },
  { code: '11440', name: '서울 마포구' },
  { code: '11470', name: '서울 양천구' },
  { code: '11500', name: '서울 강서구' },
  { code: '11530', name: '서울 구로구' },
  { code: '11545', name: '서울 금천구' },
  { code: '11560', name: '서울 영등포구' },
  { code: '11590', name: '서울 동작구' },
  { code: '11620', name: '서울 관악구' },
  { code: '11650', name: '서울 서초구' },
  { code: '11680', name: '서울 강남구' },
  { code: '11710', name: '서울 송파구' },
  { code: '11740', name: '서울 강동구' },
  { code: '41117', name: '경기 수원시 장안구' },
  { code: '41135', name: '경기 수원시 영통구' },
  { code: '41281', name: '경기 성남시 분당구' },
  { code: '41390', name: '경기 고양시 일산동구' },
  { code: '41630', name: '경기 용인시 수지구' },
];

// 아파트 매매 실거래가 더미 데이터
export const DUMMY_TRADE = [
  { aptName: '래미안 퍼스티지', dong: '반포동', floor: 15, area: 84.93, price: 325000, dealYear: 2026, dealMonth: 8, dealDay: 5, buildYear: 2009 },
  { aptName: '아크로리버파크', dong: '반포동', floor: 22, area: 59.98, price: 285000, dealYear: 2026, dealMonth: 8, dealDay: 3, buildYear: 2016 },
  { aptName: '반포자이', dong: '반포동', floor: 8, area: 114.97, price: 420000, dealYear: 2026, dealMonth: 7, dealDay: 28, buildYear: 2009 },
  { aptName: '래미안 퍼스티지', dong: '반포동', floor: 7, area: 59.98, price: 240000, dealYear: 2026, dealMonth: 7, dealDay: 20, buildYear: 2009 },
  { aptName: '반포힐스테이트', dong: '반포동', floor: 11, area: 84.93, price: 198000, dealYear: 2026, dealMonth: 7, dealDay: 15, buildYear: 2012 },
  { aptName: '신반포 팰리스', dong: '잠원동', floor: 5, area: 76.54, price: 175000, dealYear: 2026, dealMonth: 7, dealDay: 10, buildYear: 2005 },
  { aptName: '아크로리버파크', dong: '반포동', floor: 18, area: 84.93, price: 310000, dealYear: 2026, dealMonth: 6, dealDay: 25, buildYear: 2016 },
  { aptName: '반포자이', dong: '반포동', floor: 3, area: 59.98, price: 235000, dealYear: 2026, dealMonth: 6, dealDay: 18, buildYear: 2009 },
];

// 아파트 전월세 실거래가 더미 데이터
export const DUMMY_RENT = [
  { aptName: '래미안 퍼스티지', dong: '반포동', floor: 12, area: 84.93, deposit: 180000, monthlyRent: 0, contractType: '전세', dealYear: 2026, dealMonth: 8, dealDay: 7 },
  { aptName: '아크로리버파크', dong: '반포동', floor: 9, area: 59.98, deposit: 150000, monthlyRent: 0, contractType: '전세', dealYear: 2026, dealMonth: 8, dealDay: 4 },
  { aptName: '반포힐스테이트', dong: '반포동', floor: 6, area: 84.93, deposit: 30000, monthlyRent: 300, contractType: '월세', dealYear: 2026, dealMonth: 7, dealDay: 30 },
  { aptName: '신반포 팰리스', dong: '잠원동', floor: 14, area: 76.54, deposit: 120000, monthlyRent: 0, contractType: '전세', dealYear: 2026, dealMonth: 7, dealDay: 22 },
  { aptName: '반포자이', dong: '반포동', floor: 2, area: 59.98, deposit: 50000, monthlyRent: 200, contractType: '월세', dealYear: 2026, dealMonth: 7, dealDay: 17 },
  { aptName: '래미안 퍼스티지', dong: '반포동', floor: 20, area: 114.97, deposit: 220000, monthlyRent: 0, contractType: '전세', dealYear: 2026, dealMonth: 6, dealDay: 28 },
];

// 단지 기본정보 더미 데이터
export const DUMMY_COMPLEX = [
  {
    aptName: '래미안 퍼스티지',
    dong: '반포동',
    address: '서울 서초구 반포동 15-1',
    totalHousehold: 2444,
    parkingCount: 3560,
    buildYear: 2009,
    floorCount: 35,
    dongCount: 28,
    managementCost: 32,
    heatType: '지역난방',
  },
  {
    aptName: '아크로리버파크',
    dong: '반포동',
    address: '서울 서초구 반포동 1-1',
    totalHousehold: 1612,
    parkingCount: 2890,
    buildYear: 2016,
    floorCount: 38,
    dongCount: 11,
    managementCost: 28,
    heatType: '지역난방',
  },
  {
    aptName: '반포자이',
    dong: '반포동',
    address: '서울 서초구 반포동 20',
    totalHousehold: 3410,
    parkingCount: 4200,
    buildYear: 2009,
    floorCount: 35,
    dongCount: 32,
    managementCost: 25,
    heatType: '지역난방',
  },
];

// 공시가격 더미 데이터
export const DUMMY_PUB_PRICE = [
  { aptName: '래미안 퍼스티지', dong: '반포동', area: 84.93, floor: 15, pubPrice: 195000, baseYear: 2026 },
  { aptName: '래미안 퍼스티지', dong: '반포동', area: 59.98, floor: 7, pubPrice: 142000, baseYear: 2026 },
  { aptName: '아크로리버파크', dong: '반포동', area: 59.98, floor: 22, pubPrice: 168000, baseYear: 2026 },
  { aptName: '아크로리버파크', dong: '반포동', area: 84.93, floor: 18, pubPrice: 187000, baseYear: 2026 },
  { aptName: '반포자이', dong: '반포동', area: 114.97, floor: 8, pubPrice: 248000, baseYear: 2026 },
  { aptName: '반포자이', dong: '반포동', area: 59.98, floor: 3, pubPrice: 138000, baseYear: 2026 },
];
