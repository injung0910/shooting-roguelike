#!/bin/bash

# 로컬 Git 초기화
git init

# 변경 사항 모두 추가
git add .

# 첫 커밋 메시지
git commit -m "first commit"

# 브랜치 이름을 main으로 변경
git branch -M main

# 원격 저장소 연결
git remote add origin https://github.com/injung0910/shooting-roguelike.git

# GitHub로 푸시
git push -u origin main
