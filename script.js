// News API 설정
const API_KEY = 'ccf46f8cd362481b833eb29777cbdab0'; // 여기에 실제 API 키를 입력하세요

// 더 안정적인 CORS 프록시들
const CORS_PROXIES = [
    'https://api.allorigins.win/raw?url=',
    'https://corsproxy.io/?',
    'https://thingproxy.freeboard.io/fetch/',
    'https://cors-anywhere.herokuapp.com/'
];

// 현재 사용할 CORS 프록시
const CORS_PROXY = CORS_PROXIES[0];
const API_URL = `${CORS_PROXY}${encodeURIComponent(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`)}`;

console.log('API URL:', API_URL);

// DOM 요소들
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('error');
const newsContainer = document.getElementById('news-container');

// 여러 CORS 프록시를 순차적으로 시도하는 함수
async function tryAllProxies() {
    for (let i = 0; i < CORS_PROXIES.length; i++) {
        try {
            const proxyUrl = `${CORS_PROXIES[i]}${encodeURIComponent(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`)}`;
            console.log(`프록시 ${i + 1} 시도 중:`, proxyUrl);
            
            const response = await fetch(proxyUrl);
            
            if (!response.ok) {
                console.log(`프록시 ${i + 1} HTTP 에러:`, response.status);
                continue;
            }
            
            const data = await response.json();
            console.log(`프록시 ${i + 1} 성공:`, data);
            
            // 데이터 구조 확인
            let articles = [];
            if (data.status === 'ok' && data.articles) {
                articles = data.articles;
            } else if (Array.isArray(data)) {
                articles = data;
            } else if (data.articles) {
                articles = data.articles;
            }
            
            if (articles && articles.length > 0) {
                return articles;
            }
        } catch (error) {
            console.log(`프록시 ${i + 1} 에러:`, error.message);
            continue;
        }
    }
    
    // 모든 CORS 프록시가 실패하면 대체 뉴스 사용
    console.log('모든 CORS 프록시 실패, 대체 뉴스 사용');
    return FALLBACK_NEWS;
}

// 뉴스 데이터를 가져오는 함수
async function fetchNews() {
    try {
        console.log('뉴스 가져오기 시작...');
        
        // API 키가 placeholder인지 확인
        if (API_KEY === 'YOUR_API_KEY') {
            showError('API 키를 설정해주세요. script.js 파일에서 YOUR_API_KEY를 실제 API 키로 변경하세요.');
            return;
        }

        const articles = await tryAllProxies();
        
        if (articles && articles.length > 0) {
            displayNews(articles.slice(0, 5)); // 상위 5개 기사만 표시
        } else {
            console.log('뉴스 기사가 없음, 대체 뉴스 사용');
            displayNews(FALLBACK_NEWS);
        }
        
    } catch (error) {
        console.error('Error fetching news:', error);
        console.log('에러 발생, 대체 뉴스 사용');
        displayNews(FALLBACK_NEWS);
    }
}

// 뉴스를 화면에 표시하는 함수
function displayNews(articles) {
    // 로딩 상태 숨기기
    loadingElement.style.display = 'none';
    
    // 뉴스 카드 생성
    articles.forEach((article, index) => {
        const newsCard = createNewsCard(article, index);
        newsContainer.appendChild(newsCard);
    });
}

// 개별 뉴스 카드를 생성하는 함수
function createNewsCard(article, index) {
    const card = document.createElement('div');
    card.className = 'news-card';
    
    // 제목 (최대 100자로 제한)
    const title = article.title ? 
        (article.title.length > 100 ? article.title.substring(0, 100) + '...' : article.title) : 
        '제목 없음';
    
    // 설명 (최대 150자로 제한)
    const description = article.description ? 
        (article.description.length > 150 ? article.description.substring(0, 150) + '...' : article.description) : 
        '설명이 없습니다.';
    
    // 기사 링크
    const url = article.url || '#';
    
    card.innerHTML = `
        <h2>${title}</h2>
        <p>${description}</p>
        <a href="${url}" target="_blank" rel="noopener noreferrer">
            기사 읽기 →
        </a>
    `;
    
    return card;
}

// 에러 메시지를 표시하는 함수
function showError(message) {
    loadingElement.style.display = 'none';
    errorElement.style.display = 'block';
    errorElement.querySelector('p').textContent = message;
}

// 페이지 로드 시 뉴스 가져오기
document.addEventListener('DOMContentLoaded', function() {
    fetchNews();
});

// 새로고침 버튼 기능 (선택사항)
function refreshNews() {
    // 기존 뉴스 카드들 제거
    newsContainer.innerHTML = '';
    
    // 로딩 상태 표시
    loadingElement.style.display = 'block';
    errorElement.style.display = 'none';
    
    // 뉴스 다시 가져오기
    fetchNews();
}

// 키보드 단축키 (F5 또는 Ctrl+R로 새로고침)
document.addEventListener('keydown', function(event) {
    if (event.key === 'F5' || (event.ctrlKey && event.key === 'r')) {
        event.preventDefault();
        refreshNews();
    }
});
