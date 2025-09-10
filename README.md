# 오늘의 뉴스 웹앱

News API를 사용하여 한국의 주요 헤드라인을 보여주는 간단한 웹앱입니다.

## 기능

- 한국 주요 헤드라인 5개를 카드 형태로 표시
- 각 뉴스 카드에는 제목, 설명, 기사 링크 포함
- 반응형 디자인으로 모바일과 데스크톱 모두 지원
- 로딩 상태 및 에러 처리

## 사용 방법

### 방법 1: 로컬 서버 사용 (권장)

1. 터미널에서 프로젝트 폴더로 이동
2. 다음 명령어 중 하나를 실행:
   ```bash
   # macOS/Linux
   ./start_server.sh
   
   # 또는 Python 직접 실행
   python3 server.py
   ```
3. 브라우저에서 `http://localhost:8000` 접속

### 방법 2: 브라우저에서 직접 열기

1. `index.html` 파일을 브라우저에서 직접 열기
2. CORS 프록시가 자동으로 적용되어 작동합니다

### 방법 3: VS Code Live Server 사용

1. VS Code에서 Live Server 확장 프로그램 설치
2. `index.html` 파일에서 우클릭 → "Open with Live Server"
3. `script.js`에서 CORS 프록시 주석 처리하고 직접 API URL 사용

## 파일 구조

- `index.html` - 메인 HTML 파일
- `style.css` - 스타일시트
- `script.js` - JavaScript 로직
- `README.md` - 이 파일

## 기술 스택

- HTML5
- CSS3 (Grid, Flexbox, 애니메이션)
- Vanilla JavaScript (ES6+)
- News API

## 브라우저 지원

- Chrome (권장)
- Firefox
- Safari
- Edge

## 주의사항

- News API는 무료 플랜에서 일일 요청 제한이 있습니다.
- API 키는 절대 공개 저장소에 커밋하지 마세요.
- CORS 정책으로 인해 일부 브라우저에서는 로컬 파일로 직접 열기보다는 로컬 서버를 사용하는 것이 좋습니다.
