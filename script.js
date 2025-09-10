// News API 설정
const API_KEY = 'ccf46f8cd362481b833eb29777cbdab0'; // 여기에 실제 API 키를 입력하세요

// CORS 프록시를 사용한 API URL (로컬 파일로 열 때 사용)
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
const API_URL = `${CORS_PROXY}${encodeURIComponent(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`)}`;

// 로컬 서버를 사용할 때는 아래 URL을 사용하세요 (주석 해제)
// const API_URL = `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`;

// DOM 요소들
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('error');
const newsContainer = document.getElementById('news-container');

// 뉴스 데이터를 가져오는 함수
async function fetchNews() {
    try {
        // API 키가 placeholder인지 확인
        if (API_KEY === 'YOUR_API_KEY') {
            showError('API 키를 설정해주세요. script.js 파일에서 YOUR_API_KEY를 실제 API 키로 변경하세요.');
            return;
        }

        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.status === 'ok' && data.articles) {
            displayNews(data.articles.slice(0, 5)); // 상위 5개 기사만 표시
        } else {
            throw new Error('뉴스 데이터를 가져올 수 없습니다.');
        }
        
    } catch (error) {
        console.error('Error fetching news:', error);
        showError('뉴스를 불러오는 중 오류가 발생했습니다. API 키를 확인해주세요.');
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
