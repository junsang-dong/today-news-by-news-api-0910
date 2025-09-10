#!/usr/bin/env python3
"""
간단한 로컬 서버를 실행하여 CORS 문제를 해결합니다.
Python 3가 설치되어 있어야 합니다.

사용법:
1. 터미널에서 이 파일이 있는 디렉토리로 이동
2. python server.py 실행
3. 브라우저에서 http://localhost:8000 접속
"""

import http.server
import socketserver
import os
import webbrowser
from urllib.parse import urlparse, parse_qs

class CORSRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # CORS 헤더 추가
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        # OPTIONS 요청 처리 (CORS preflight)
        self.send_response(200)
        self.end_headers()

if __name__ == "__main__":
    PORT = 8000
    
    # 현재 디렉토리를 서버 루트로 설정
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    with socketserver.TCPServer(("", PORT), CORSRequestHandler) as httpd:
        print(f"서버가 http://localhost:{PORT} 에서 실행 중입니다.")
        print("브라우저에서 자동으로 열립니다...")
        print("서버를 중지하려면 Ctrl+C를 누르세요.")
        
        # 브라우저에서 자동으로 열기
        webbrowser.open(f'http://localhost:{PORT}')
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n서버가 중지되었습니다.")
