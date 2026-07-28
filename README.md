# 유니드컴즈 홈페이지 (uneedcomms-homepage)

유니드컴즈 공식 홈페이지. **React + Vite** 로 개발하고 **GitHub Pages** 에 배포합니다.

- 배포 URL: https://keeepgrow.github.io/uneedcomms-homepage/
- 디자인(Figma): https://www.figma.com/design/6x5kQw3M8cZtFWnymppT8m/%ED%99%88%ED%8E%98%EC%9D%B4%EC%A7%80?node-id=266-463
  - 작업 기준 프레임: **Main 1-1** (`node-id=266-463`)

---

## 기술 스택

| 항목 | 내용 |
|------|------|
| 프레임워크 | React 18 |
| 빌드 도구 | Vite 6 |
| 언어 / 스타일 | JavaScript + CSS Modules |
| 폰트 | Pretendard (CDN) |
| 배포 | GitHub Pages (GitHub Actions 자동 배포) |

---

## 로컬 개발

```bash
npm install      # 최초 1회 (또는 의존성 변경 시)
npm run dev      # 개발 서버 실행
```

- 개발 서버 주소: http://localhost:5173/uneedcomms-homepage/
  (포트를 바꾸려면 `npm run dev -- --port 5188`)
- 코드를 저장하면 브라우저에 즉시 반영됩니다(HMR).

기타 명령:

```bash
npm run build    # 프로덕션 빌드 (결과물: dist/)
npm run preview  # 빌드 결과를 로컬에서 미리보기
```

---

## 폴더 구조

```
src/
  App.jsx                  # 페이지 진입 (현재 Main 하나)
  main.jsx
  pages/
    main/
      MainPage.jsx         # Main 페이지 조립
      sections/            # Main 전용 섹션
        Hero/ Products/ Partners/ Newsroom/
  components/
    layout/                # 페이지 공통 (Header, Footer)
    ui/                    # 공용 UI 조각 (ArrowButton 등)
  data/                    # 콘텐츠 데이터 (products, news, partners)
  styles/                  # tokens.css(디자인 토큰), global.css
  assets/                  # 이미지 (제품 3D 렌더, 파트너 로고 등)
```

> 이후 회사소개·뉴스룸 등 페이지가 추가되면 `pages/` 아래에 나란히 두고,
> `components/layout` 의 Header/Footer 를 그대로 재사용합니다.

### 디자인 토큰 (`src/styles/tokens.css`)

Figma 변수에서 추출한 값입니다.

| 이름 | 값 |
|------|-----|
| Uneed Blue | `#312FD8` |
| Black | `#000111` |
| Gray 00 / 01 / 02 / 05 / 07 | `#F3F3F6` / `#E5E5E7` / `#C6C6CA` / `#9999A0` / `#4A4A56` |

---

## 빌드 & 배포

`main` 브랜치에 push 하면 **GitHub Actions** 가 자동으로 빌드해서 GitHub Pages 에 배포합니다.
(워크플로우: `.github/workflows/deploy.yml`)

### 방법 1 — 배포 스크립트 (권장)

로컬 빌드로 사전 검증한 뒤 커밋·push 까지 한 번에 처리합니다.

```bash
./deploy.sh "커밋 메시지"     # 메시지 지정
./deploy.sh                   # 생략 시 타임스탬프 자동
```

스크립트 동작:
1. `main` 브랜치 확인
2. 의존성 설치(`node_modules` 없을 때만)
3. `npm run build` — **빌드 실패 시 배포 중단**
4. 변경사항 없으면 종료
5. `git add → commit → push origin main` → Actions 배포 트리거

### 방법 2 — 수동

```bash
npm run build          # 빌드 확인
git add -A
git commit -m "메시지"
git push origin main   # push 시 Actions 자동 배포
```

- 배포 진행 상황: https://github.com/keeepgrow/uneedcomms-homepage/actions

### ⚠️ 최초 1회 설정 (필수)

저장소 **Settings → Pages → Build and deployment → Source** 를
**`GitHub Actions`** 로 지정해야 합니다.
(기본값 `Deploy from a branch` 상태면 Actions 배포가 실패합니다.)
