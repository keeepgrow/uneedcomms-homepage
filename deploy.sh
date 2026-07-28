#!/usr/bin/env bash
#
# 유니드컴즈 홈페이지 빌드·배포 스크립트
#
# 흐름: 로컬 빌드로 사전 검증 → 변경사항 커밋 → main push
#       → GitHub Actions(.github/workflows/deploy.yml)가 자동으로 Pages에 배포
#
# 사용법:
#   ./deploy.sh "커밋 메시지"      # 메시지 지정
#   ./deploy.sh                    # 메시지 생략 시 타임스탬프 사용
#
set -euo pipefail

cd "$(dirname "$0")"

BRANCH="main"
MSG="${1:-"deploy: $(date '+%Y-%m-%d %H:%M:%S')"}"

# ── 0) 현재 브랜치 확인 ─────────────────────────────
CURRENT="$(git rev-parse --abbrev-ref HEAD)"
if [ "$CURRENT" != "$BRANCH" ]; then
  echo "✗ 현재 브랜치가 '$CURRENT' 입니다. '$BRANCH' 에서 실행해 주세요."
  exit 1
fi

# ── 1) 의존성 설치 (lockfile 기준) ──────────────────
echo "▶ 의존성 확인…"
if [ ! -d node_modules ]; then
  npm ci
fi

# ── 2) 로컬 빌드 (실패 시 배포 중단) ────────────────
echo "▶ 빌드 검증…"
npm run build

# ── 3) 변경사항 확인 ────────────────────────────────
if [ -z "$(git status --porcelain)" ]; then
  echo "✔ 커밋할 변경사항이 없습니다. 배포 중단."
  exit 0
fi

# ── 4) 커밋 & 푸시 → Actions 배포 트리거 ────────────
echo "▶ 커밋: $MSG"
git add -A
git commit -m "$MSG"

echo "▶ push → $BRANCH (GitHub Actions 배포 시작)"
git push origin "$BRANCH"

echo ""
echo "✅ push 완료. 배포 진행 상황:"
echo "   https://github.com/keeepgrow/uneedcomms-homepage/actions"
echo "   배포 후 URL: https://keeepgrow.github.io/uneedcomms-homepage/"
