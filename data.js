const BOOKS = [
  {
    id: 'train',
    emoji: '🚂',
    title: '우진이의 기차 여행',
    subtitle: '사계절을 지나 바다와 터널을 지나요',
    theme: 'spring',
    cover: 'assets/books/train/01_cover.jpg',
    pages: [
      {image:'assets/books/train/01_cover.jpg', kicker:'첫 번째 이야기', title:'우진이의 기차 여행', text:'파란 기차가 칙칙폭폭 출발했어요. 우진이는 창밖을 보며 새로운 여행을 꿈꾸었어요.'},
      {image:'assets/books/train/02_spring.jpg', kicker:'봄', title:'꽃길을 달려요', text:'따뜻한 봄바람이 불고 꽃잎이 살랑살랑 날렸어요. 우진이는 “와, 예쁘다!” 하고 웃었어요.'},
      {image:'assets/books/train/03_summer.jpg', kicker:'여름', title:'바다를 만났어요', text:'파란 바다가 반짝반짝 빛났어요. 갈매기는 하늘을 날고 기차는 바닷가를 따라 달렸어요.'},
      {image:'assets/books/train/04_autumn.jpg', kicker:'가을', title:'단풍에게 인사해요', text:'알록달록 단풍잎이 우수수 떨어졌어요. 우진이는 손을 흔들며 가을에게 인사했어요.'},
      {image:'assets/books/train/05_winter.jpg', kicker:'겨울', title:'눈마을을 지나가요', text:'하얀 눈이 포근하게 내렸어요. 우진이는 눈사람에게 “안녕!” 하고 손을 흔들었어요.'},
      {image:'assets/books/train/06_tunnel.jpg', kicker:'마지막', title:'터널을 지나 노을 속으로', text:'깜깜한 터널을 지나자 따뜻한 노을과 바다가 펼쳐졌어요. 다음 여행도 기대해요!'}
    ]
  },
  {
    id: 'jeju1',
    emoji: '🌼',
    title: '우진이의 제주도 여행 Part 1',
    subtitle: '노란 꽃길과 파란 바다',
    theme: 'flower',
    cover: 'assets/books/jeju1/02_flower_road.jpg',
    pages: [
      {image:'assets/books/jeju1/01_arrival.jpg', kicker:'제주도에 도착했어요', title:'새로운 세상으로 출발', text:'우진이는 엄마 손을 꼭 잡고 제주도의 바람을 만났어요. 오늘은 아주 특별한 여행이 시작되는 날이에요.'},
      {image:'assets/books/jeju1/02_flower_road.jpg', kicker:'노란 꽃길', title:'한 걸음, 또 한 걸음', text:'길 양옆에는 노란 유채꽃이 가득 피어 있었어요. 우진이는 꽃길 사이를 천천히 걸어갔어요.'},
      {image:'assets/books/jeju1/03_yellow_flowers.jpg', kicker:'꽃 향기', title:'꽃들이 반겨주었어요', text:'바람이 살짝 불자 꽃들이 흔들흔들 춤을 췄어요. 우진이는 꽃들을 바라보며 한참을 구경했어요.'},
      {image:'assets/books/jeju1/04_mom_hug.jpg', kicker:'엄마 품', title:'따뜻한 순간', text:'조금 피곤해질 때는 엄마 품이 가장 따뜻했어요. 엄마는 우진이를 꼭 안아주었어요.'},
      {image:'assets/books/jeju1/05_family.jpg', kicker:'우리 가족', title:'함께라서 더 행복해요', text:'엄마, 아빠, 그리고 우진이. 셋이 함께라서 제주도의 풍경은 더 오래 기억될 거예요.'},
      {image:'assets/books/jeju1/06_little_haenyeo.jpg', kicker:'꼬마 해녀', title:'멋진 변신', text:'우진이는 꼬마 해녀가 되었어요. 아직 바다에 들어가진 않았지만, 누구보다 멋진 해녀였답니다.'},
      {image:'assets/books/jeju1/07_blue_sea.jpg', kicker:'파란 바다', title:'넓은 세상을 바라보며', text:'파도가 철썩철썩 노래했어요. 우진이는 넓은 바다를 보며 새로운 세상을 상상했어요.'},
      {image:'assets/books/jeju1/08_peekaboo.jpg', kicker:'까꿍!', title:'바위 뒤의 작은 장난', text:'우진이가 바위 뒤에 살짝 숨었어요. “까꿍!” 엄마 아빠는 웃음이 빵 터졌어요.'},
      {image:'assets/books/jeju1/09_scooter.jpg', kicker:'부릉부릉', title:'상상 속 제주 드라이브', text:'민트색 스쿠터를 발견한 우진이. 마음속에서는 이미 바닷길을 신나게 달리고 있었어요.'},
      {image:'assets/books/jeju1/10_high_sky.jpg', kicker:'하늘 높이', title:'아빠가 들어 올린 세상', text:'아빠가 우진이를 하늘 높이 들어 올렸어요. 우진이는 제주 바다보다 더 높은 곳에서 웃었답니다.'}
    ]
  },
  {
    id: 'sea',
    emoji: '🌊',
    title: '제주 바다 이야기',
    subtitle: 'Part 2 미리보기 — 바다, 바위, 하늘',
    theme: 'sea',
    cover: 'assets/books/sea/01_sea_rock.jpg',
    pages: [
      {image:'assets/books/sea/01_sea_rock.jpg', kicker:'바다 이야기', title:'돌 위에 앉은 작은 여행자', text:'푸른 바다 앞 커다란 돌 위에 우진이가 앉았어요. 파도는 조용히 우진이에게 인사했어요.'},
      {image:'assets/books/sea/02_hide_rock.jpg', kicker:'숨바꼭질', title:'바위 뒤에서 까꿍', text:'우진이는 바위 뒤에 숨어 바다를 바라보았어요. 바람도 우진이와 함께 장난치는 것 같았어요.'},
      {image:'assets/books/sea/03_scooter.jpg', kicker:'출발 준비', title:'민트 스쿠터와 바닷길', text:'귀여운 스쿠터 옆에서 우진이는 손가락을 번쩍 들었어요. “다음 장소로 출발!”'},
      {image:'assets/books/sea/04_sky.jpg', kicker:'가족의 하늘', title:'높이, 더 높이', text:'아빠는 우진이를 번쩍 들어 올리고, 엄마는 박수를 쳤어요. 제주 바다는 우리 가족의 웃음을 오래 기억할 거예요.'}
    ]
  }
];
