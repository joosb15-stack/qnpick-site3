import { useMemo, useState } from 'react'

const QUESTIONS = [
  {
    id: 'category',
    title: '무엇에 관한 걸 찾고 있나요?',
    subtitle: '큰 카테고리부터 골라주세요',
    options: [
      { label: '집', scores: { home: 4, living: 2, cleaning: 2 } },
      { label: '차', scores: { car: 5, gadget: 1 } },
      { label: '선물', scores: { gift: 5, pretty: 1 } },
      { label: '공부', scores: { study: 5, gadget: 1 } },
      { label: '어린이', scores: { kids: 5, toy: 2 } },
      { label: '놀이', scores: { toy: 4, hobby: 2 } },
      { label: '회사', scores: { office: 5, gadget: 1 } },
      { label: '운동', scores: { fitness: 5, outdoor: 1 } },
      { label: '여행', scores: { travel: 5, outdoor: 2 } },
      { label: '랜덤', scores: { random: 10 } },
    ],
  },
  {
    id: 'budget',
    title: '예산은 어느 정도예요?',
    subtitle: '대충 이 정도로 생각해도 돼요',
    options: [
      { label: '1만원 이하', scores: { budgetLow: 4 } },
      { label: '3만원 이하', scores: { budgetMid: 4 } },
      { label: '5만원 이하', scores: { budgetMidHigh: 4 } },
      { label: '10만원 이상도 가능', scores: { budgetHigh: 4 } },
      { label: '랜덤', scores: { random: 5 } },
    ],
  },
  {
    id: 'priceStyle',
    title: '어떤 느낌을 원해요?',
    subtitle: '가성비를 볼지, 돈값 하는 걸 볼지 골라주세요',
    options: [
      { label: '무조건 가성비', scores: { cheap: 5, simple: 1 } },
      { label: '적당히 괜찮은 거', scores: { balanced: 5 } },
      { label: '비싸도 좋으면 됨', scores: { premium: 5, flashy: 1 } },
      { label: '랜덤', scores: { random: 5 } },
    ],
  },
  {
    id: 'visualStyle',
    title: '원하는 물건 스타일은 뭐예요?',
    subtitle: '겉으로 보이는 느낌도 중요하죠',
    options: [
      { label: '깔끔한 느낌', scores: { simple: 5, home: 1, office: 1 } },
      { label: '화려한 느낌', scores: { flashy: 5, gift: 1, toy: 1 } },
      { label: '귀여운 느낌', scores: { cute: 5, kids: 1, gift: 1 } },
      { label: '실용적인 느낌', scores: { useful: 5, study: 1, car: 1 } },
      { label: '감성 있는 느낌', scores: { pretty: 5, home: 1, travel: 1 } },
      { label: '랜덤', scores: { random: 5 } },
    ],
  },
]

const PRODUCTS = [
  {
    id: 1,
    category: 'home',
    name: '깔끔한 무선 청소기',
    price: '3만~6만원대',
    reason: '집에서 가장 체감이 큰 실전형 추천템',
    tags: ['집', '실용', '깔끔'],
    image:
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
    link: 'https://partners.coupang.com/',
  },
  {
    id: 2,
    category: 'car',
    name: '차량용 고속 충전 거치대',
    price: '2만~5만원대',
    reason: '운전할 때 바로 체감되는 인기 실용템',
    tags: ['차', '편의', '실사용'],
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    link: 'https://partners.coupang.com/',
  },
  {
    id: 3,
    category: 'gift',
    name: '센스있는 선물 세트',
    price: '1만~4만원대',
    reason: '반응 좋고 실패 확률이 낮은 선물용 추천',
    tags: ['선물', '센스', '인기'],
    image:
      'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1200&q=80',
    link: 'https://partners.coupang.com/',
  },
  {
    id: 4,
    category: 'study',
    name: '데스크 집중 스탠드',
    price: '2만~5만원대',
    reason: '공부하거나 일할 때 만족도가 높은 책상템',
    tags: ['공부', '집중', '책상'],
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
    link: 'https://partners.coupang.com/',
  },
  {
    id: 5,
    category: 'kids',
    name: '어린이 감성 놀이템',
    price: '1만~3만원대',
    reason: '귀엽고 반응 좋은 어린이용 추천템',
    tags: ['어린이', '귀여움', '놀이'],
    image:
      'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80',
    link: 'https://partners.coupang.com/',
  },
  {
    id: 6,
    category: 'toy',
    name: '재미있는 놀이 아이템',
    price: '1만~5만원대',
    reason: '심심할 때 만족감 높은 가벼운 추천',
    tags: ['놀이', '재미', '랜덤'],
    image:
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1200&q=80',
    link: 'https://partners.coupang.com/',
  },
  {
    id: 7,
    category: 'office',
    name: '회사 책상 정리 세트',
    price: '1만~4만원대',
    reason: '회사에서 보기 좋고 실용적인 사무용 추천',
    tags: ['회사', '깔끔', '실용'],
    image:
      'https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=1200&q=80',
    link: 'https://partners.coupang.com/',
  },
  {
    id: 8,
    category: 'fitness',
    name: '홈트 입문 운동템',
    price: '2만~6만원대',
    reason: '운동 시작할 때 무난하게 고르기 좋은 추천',
    tags: ['운동', '입문', '실용'],
    image:
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80',
    link: 'https://partners.coupang.com/',
  },
  {
    id: 9,
    category: 'travel',
    name: '여행용 파우치 세트',
    price: '1만~3만원대',
    reason: '여행 갈 때 깔끔하게 챙기기 좋은 필수템',
    tags: ['여행', '정리', '깔끔'],
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    link: 'https://partners.coupang.com/',
  },
  {
    id: 10,
    category: 'random',
    name: '오늘의 랜덤 추천템',
    price: '랜덤',
    reason: '고르기 귀찮을 때 그냥 눌러보는 재미용 추천',
    tags: ['랜덤', '재미', '추천'],
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    link: 'https://partners.coupang.com/',
  },
  {
    id: 11,
    category: 'pretty',
    name: '감성 무드 조명',
    price: '2만~4만원대',
    reason: '예쁘고 분위기 있는 스타일을 원할 때 잘 맞음',
    tags: ['감성', '예쁨', '분위기'],
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    link: 'https://partners.coupang.com/',
  },
  {
    id: 12,
    category: 'gadget',
    name: '작고 유용한 전자템',
    price: '2만~5만원대',
    reason: '가볍게 만족도 높은 전자제품 추천',
    tags: ['전자', '유용', '인기'],
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    link: 'https://partners.coupang.com/',
  },
]

function calculateScores(answers) {
  const total = {}
  answers.forEach((answer) => {
    Object.entries(answer.scores).forEach(([category, value]) => {
      total[category] = (total[category] || 0) + value
    })
  })
  return total
}

function getTopCategories(scoreMap) {
  const hasRandom = (scoreMap.random || 0) >= 10
  if (hasRandom) return ['random', 'pretty', 'gadget']

  return Object.entries(scoreMap)
    .filter(
      ([key]) =>
        ![
          'budgetLow',
          'budgetMid',
          'budgetMidHigh',
          'budgetHigh',
          'cheap',
          'balanced',
          'premium',
          'simple',
          'flashy',
          'cute',
          'useful',
        ].includes(key)
    )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([key]) => key)
}

function pickFeaturedProducts(result) {
  if (!result) return PRODUCTS.slice(0, 3)
  return result.matchedProducts.slice(0, 3)
}

export default function App() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])

  const currentQuestion = QUESTIONS[step]
  const isFinished = answers.length === QUESTIONS.length

  const result = useMemo(() => {
    if (!isFinished) return null
    const scoreMap = calculateScores(answers)
    const topCategories = getTopCategories(scoreMap)
    const matchedProducts = PRODUCTS.filter((product) =>
      topCategories.includes(product.category)
    ).slice(0, 6)
    return { scoreMap, topCategories, matchedProducts }
  }, [answers, isFinished])

  const featuredProducts = pickFeaturedProducts(result)

  const handleSelect = (option) => {
    setAnswers([...answers, option])
    setStep(step + 1)
  }

  const handleReset = () => {
    setStep(0)
    setAnswers([])
  }

  return (
    <div className="page">
      <div className="top">
        <h1>큐엔픽</h1>
        <p>질문으로 원하는 쿠팡템 찾기</p>
      </div>

      <div className="question-box">
        <div className="question-head">
          <div>
            <div className="small-text">
              {isFinished ? '추천 완료' : `질문 ${step + 1} / ${QUESTIONS.length}`}
            </div>
            <h2>{isFinished ? '당신한테 맞는 추천 결과' : currentQuestion.title}</h2>
            {!isFinished && <p>{currentQuestion.subtitle}</p>}
          </div>
          <button className="reset-btn" onClick={handleReset}>
            다시하기
          </button>
        </div>

        {!isFinished ? (
          <div className="option-grid">
            {currentQuestion.options.map((option) => (
              <button
                key={option.label}
                className="option-btn"
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="result-grid">
            {result?.matchedProducts.map((product, index) => (
              <div className="card" key={product.id}>
                <img src={product.image} alt={product.name} />
                <div className="card-body">
                  <div className="badge-row">
                    <span className="badge">추천 {index + 1}</span>
                    <span className="price">{product.price}</span>
                  </div>
                  <h3>{product.name}</h3>
                  <p>{product.reason}</p>
                  <div className="tag-row">
                    {product.tags.map((tag) => (
                      <span className="tag" key={tag}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <a href={product.link} target="_blank" rel="noreferrer">
                    <button className="buy-btn">쿠팡에서 보기</button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="featured-grid">
        {featuredProducts.map((product) => (
          <div className="featured-card" key={product.id}>
            <p className="featured-label">쿠팡파트너스</p>
            <h3>오늘 가장 잘 나가는 추천</h3>
            <p>{product.name}</p>
            <a href={product.link} target="_blank" rel="noreferrer">
              <button className="featured-btn">보러가기</button>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
