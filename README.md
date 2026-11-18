# 삼성아이웰 홈페이지 미리보기

**미리보기 링크 (이 주소 하나만 보내면 됩니다)**

https://playground.wordpress.net/?blueprint-url=https://raw.githubusercontent.com/Titanomics/samsung-iwell-preview/main/blueprint.json

## 이게 뭔가요

- 실제 홈페이지와 같은 테마·플러그인·콘텐츠·화면을 **보는 사람의 브라우저 안에서** 돌리는 시험본입니다(WordPress Playground). 서버가 없습니다.
- **입력한 내용(상담 글 등)은 각자 브라우저에만 남고, 창을 닫으면 사라집니다.** 다른 사람에게 보이지 않고 병원에 전달되지도 않습니다.
- 처음 열 때 워드프레스를 브라우저 안에서 설치하느라 **약 PREVIEW_FIRST_LOAD 걸립니다**(인터넷·컴퓨터 사양에 따라 다름). 그다음 페이지 이동은 빠릅니다.
- 관리 화면 로그인은 막혀 있습니다(방문자 화면만).

## 무엇이 들어 있나

| 파일 | 내용 |
|---|---|
| `blueprint.json` | Playground 설치 순서(콘텐츠 → 부모 테마·플러그인 → 우리 테마·플러그인 → 설정 → 주소 바꾸기 → 원장 검토 표시 다시 계산) |
| `iwell-theme.zip`, `iwell-core.zip` | 우리 테마·플러그인 — 기준 커밋 `foundation` `8f4175b`에서 `pnpm build-zip`으로 만든 것(개발·시험 파일 없음) |
| `content.zip` | 콘텐츠 데이터베이스(로컬 시험 사이트에서 만든 페이지·공지·칼럼·상담 게시판 설정). 계정 비밀번호는 아무도 모르는 임의 값으로 바꿨고, 응용 프로그램 비밀번호·로그인 세션·크론 비밀값은 지웠습니다 |
| `kboard-6.8.zip`, `kboard-comments-5.7.zip` | 상담 게시판 플러그인 KBoard(코스모스팜 공식 배포본 그대로) |

부모 테마 Twenty Twenty-Five, Rank Math SEO 1.0.282, PublishPress Revisions 4.3.2는 wordpress.org에서 바로 설치합니다.

## 라이선스

KBoard 게시판·댓글 플러그인은 GNU GPL v2 이상(각 zip 안 `license.txt`)으로 배포되며, 수정 없이 그대로 다시 배포합니다.

## 실제 사이트와 다른 점

- 사이트 이름은 아직 설정 전 값(“My WordPress Website”)입니다. 운영에서 설정합니다.
- 원장 검토 표시의 검토일은 미리보기를 연 날짜로 찍힙니다(미리보기마다 주소가 달라 검토 표시를 그 자리에서 다시 계산하기 때문).
- 상담 글·댓글, 칼럼 자동 가져오기, 예약 공개 같은 서버 작업은 이 시험본 안에서만 돌고 아무 곳에도 보내지 않습니다.
