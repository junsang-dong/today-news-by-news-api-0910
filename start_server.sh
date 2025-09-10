#!/bin/bash
# 로컬 서버 시작 스크립트 (macOS/Linux)

echo "뉴스 웹앱 로컬 서버를 시작합니다..."
echo ""

# Python 3가 설치되어 있는지 확인
if command -v python3 &> /dev/null; then
    echo "Python 3를 사용하여 서버를 시작합니다."
    python3 server.py
elif command -v python &> /dev/null; then
    echo "Python을 사용하여 서버를 시작합니다."
    python server.py
else
    echo "Python이 설치되어 있지 않습니다."
    echo "Python 3를 설치하거나 다른 방법을 사용해주세요."
    echo ""
    echo "대안 방법:"
    echo "1. Live Server 확장 프로그램 사용 (VS Code)"
    echo "2. Node.js가 있다면: npx http-server"
    echo "3. 브라우저에서 직접 열기 (CORS 프록시 사용)"
fi
