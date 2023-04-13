export const mockMovieRepository = {
  getAllRecord: jest.fn(),
  getFullRecord: jest.fn(),
  getOneRecord: jest.fn(),
  getOneRecordByTitle: jest.fn(),
  createOneData: jest.fn(),
  createOneRecord: jest.fn(),
  deleteOneRecord: jest.fn(),
};

export const mockDataBase = [
  {
    id: '73ce407e-376f-4476-bc50-d1725e059aaa',
    title: '어벤져스',
    original_title: 'The Avengers',
    director: 'Joss Whedon',
    runnint_time: 143,
    actors: ['Robert Downey Jr.', 'Chris Evans', 'Jeremy Renner'],
    synopsis:
      '마블 시네마틱 유니버스의 영화. 감독은 조스 웨던. 어벤져스 실사영화 시리즈의 1번째 작품이자 마블 시네마틱 유니버스 페이즈 1의 마지막 작품이다.',
    rating: 88,
  },
  {
    id: '82232254-7cd5-4d9b-b483-c48d000d5f92',
    title: '터미네이터2',
    original_title: 'TERMINATOR 2 JUDGMENT DAY',
    director: 'James Cameron',
    runnint_time: 143,
    actors: ['ARNOLD SCHWARZENEGGER', 'Linda Hamilton'],
    synopsis:
      '터미네이터 시리즈의 2번째 작품이자 1991년 개봉한 미국의 SF 액션 영화. 아놀드 슈워제네거와 린다 해밀턴 등이 주연을 맡고 제임스 카메론이 연출했다. 전편에 이어 미래에서 온 기계과 인간의 추격전을 그린다. "전편보다 나은 속편 없다"라는 할리우드 공식을 완전히 깨부순 작품이다.',
    rating: 88,
  },
];

export const mockCreateDto = {
  title: '화양연화',
  original_title: '花樣年華',
  director: 'Wong Kar-wai',
  runnint_time: 99,
  actors: ['Tony Leung Chiu-wai', 'Maggie Cheung'],
  synopsis:
    '홍콩의 지역 매일 신문 편집장인 초 모완(양조위 분), 수출회사의 비서로 근무하는 수 리첸(장만옥 분). 둘은 상하이 지역의 한 건물로 같은 날 이사하게 된다. 이사 날부터 의도치 않게 오가며 자주 부딪히게 되는 두 사람. 둘 다 가정이 있지만 어쩐지 배우자들은 자리를 비우는 날이 더 많고 두 사람의 외로움은 서로에게 낯설지 않게 다가와 둘을 가깝게 한다. 두 사람은 점점 감정이 깊어질수록 겉으로는 더욱 조심스러워지고 예견되어 있는 이별 앞에 마음이 혼란스럽고... 서로의 자리에서 마음으로 바라는 그들의 사랑은 애절하기만 하다.',
  rating: 88,
};

export const mockFindOneRecord = {
  id: '75611717-a8e9-4f93-bdad-77bbbcdcb41a',
  title: '화양연화',
  original_title: '花樣年華',
  director: 'Wong Kar-wai',
  runnint_time: 99,
  actors: ['Tony Leung Chiu-wai', 'Maggie Cheung'],
  synopsis:
    '홍콩의 지역 매일 신문 편집장인 초 모완(양조위 분), 수출회사의 비서로 근무하는 수 리첸(장만옥 분). 둘은 상하이 지역의 한 건물로 같은 날 이사하게 된다. 이사 날부터 의도치 않게 오가며 자주 부딪히게 되는 두 사람. 둘 다 가정이 있지만 어쩐지 배우자들은 자리를 비우는 날이 더 많고 두 사람의 외로움은 서로에게 낯설지 않게 다가와 둘을 가깝게 한다. 두 사람은 점점 감정이 깊어질수록 겉으로는 더욱 조심스러워지고 예견되어 있는 이별 앞에 마음이 혼란스럽고... 서로의 자리에서 마음으로 바라는 그들의 사랑은 애절하기만 하다.',
  rating: 88,
};
