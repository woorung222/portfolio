function star(id, label, type, x, y, description, evidence = [], code = []) {
  return { id, label, type, x, y, description, evidence, code };
}

export const constellations = {
  "cloud-ev-security": {
    kind: "project",
    motif: "Shield Radar",
    tone: "gold",
    stars: [
      star("guardduty", "GuardDuty", "security", 50, 16, "위협 탐지의 시작점. GuardDuty Finding을 이벤트 기반 대응 흐름으로 연결한다.", ["README MITRE ATT&CK 대응 매핑", "시연 영상 서버 이전 예정"], ["terraform/modules/guardduty", "terraform/modules/eventbridge"]),
      star("eventbridge", "이벤트/아키텍처 흐름", "stack", 32, 31, "IoT Core, GuardDuty, EventBridge, Lambda, 저장소와 알림이 이어지는 전체 이벤트 흐름.", ["AEGIS 전체 아키텍처"], ["terraform/modules/eventbridge"]),
      star("lambda", "Lambda 대응", "feature", 68, 31, "공격 유형별 대응을 분기해 격리, 차단, 로그 보존 같은 조치를 실행한다.", ["Lambda 실행 결과 후보", "시연 영상 서버 이전 예정"], ["lambda/handler.py"]),
      star("isolate", "IoT 격리", "security", 22, 56, "IoT 정책 분리, 인증서 revoke 등 피해 확산을 줄이는 자동 대응 포인트.", ["T0855/T1078 대응 매핑"], ["terraform/modules/iot", "lambda/handler.py"]),
      star("evidence", "관측/감사 로그", "outcome", 50, 73, "CloudWatch 지표, CloudTrail 감사 로그, DynamoDB 이벤트 저장으로 대응 이후 추적성을 확보한다.", ["코드 기반 관측/감사 구조"], ["terraform/modules/monitoring"]),
      star("dashboard", "운영 대시보드", "feature", 78, 56, "지도, 이벤트 로그, 공격 시뮬레이터, 충전기 상태를 보는 AEGIS 운영 화면.", ["AEGIS 대시보드 화면"], ["lambda/stats_handler.py", "lambda/simulate_handler.py"])
    ],
    connections: [["guardduty", "eventbridge"], ["guardduty", "lambda"], ["eventbridge", "isolate"], ["lambda", "dashboard"], ["isolate", "evidence"], ["dashboard", "evidence"], ["eventbridge", "lambda"]]
  },
  "pentest-web": {
    kind: "project",
    motif: "Lock Route",
    tone: "rust",
    stars: [
      star("authSession", "인증/세션", "security", 18, 48, "로그인, 세션 저장, 로그인 감사 흐름을 기준으로 인증 안정성을 점검한다.", [], ["AuthService.login", "saveAudit"]),
      star("objectAccess", "권한/객체 접근", "security", 36, 25, "사용자, 문서, 결재 객체 접근 제어를 서버 측 권한 기준으로 점검한다.", [], ["ApprovalService.canActOnDocument", "EmployeeService"]),
      star("documentFiles", "파일/문서 접근", "feature", 58, 38, "문서 업로드, 다운로드, 저장 경로 처리에서 민감 파일 노출 위험을 점검한다.", [], ["DocumentService.downloadDocument", "storeDocumentFile"]),
      star("payslipAccess", "급여명세 접근", "security", 78, 54, "급여명세 조회, 검색, 다운로드 권한이 사용자와 부서 기준으로 제한되는지 점검한다.", [], ["PayslipService.searchPayslipIds", "assertCanAccessPayslip"]),
      star("inputValidation", "입력값 검증", "stack", 58, 76, "SQL Injection과 Stored XSS 위험을 입력값 검증과 출력 처리 관점에서 정리한다.", [], ["searchPayslipIds", "runApprovalTypeListQuery"]),
      star("browserSecurity", "브라우저 보안 설정", "stack", 30, 72, "CORS, 쿠키, CSRF, 보안 헤더 같은 브라우저 보안 설정을 개선 기준으로 정리한다.", [], ["LocalCorsConfig.addCorsMappings", "healthCorsFilter"])
    ],
    connections: [["authSession", "objectAccess"], ["objectAccess", "documentFiles"], ["documentFiles", "payslipAccess"], ["payslipAccess", "inputValidation"], ["inputValidation", "browserSecurity"], ["browserSecurity", "authSession"], ["objectAccess", "browserSecurity"]]
  },
  "isms-automation": {
    kind: "project",
    motif: "Automation Checklist",
    tone: "teal",
    stars: [
      star("architecture", "시스템 아키텍처", "stack", 18, 32, "Control Node, Scan Node, Ansible, PostgreSQL, Streamlit이 이어지는 전체 보안 자동화 구조.", ["시스템 아키텍처 이미지"], ["dashboard/app.py", "run_ansible_simple"]),
      star("scan", "자동 진단", "security", 38, 18, "Ubuntu와 Rocky Linux별 스크립트로 ISMS-P 점검 항목을 자동 진단한다.", [], ["scanner.sh", "Rocky_U_*.sh", "Ubuntu_U_*.sh"]),
      star("loggingDb", "결과 표준화/DB", "stack", 62, 30, "JSONL 로그와 audit DB로 진단 결과를 표준화하고 최신 상태를 조회한다.", ["audit DB 구조 이미지"], ["common_logging.sh", "fetch_data"]),
      star("remediation", "자동 조치/재점검", "security", 78, 55, "자동 조치 가능한 항목을 Ansible로 실행하고 DB 반영과 재점검 상태를 확인한다.", [], ["run_ansible_simple", "_poll_db_latest_is_vul"]),
      star("dashboard", "운영 대시보드", "feature", 50, 75, "Streamlit으로 이행률, 자산 상태, 상세 결과, 일괄/개별 조치 흐름을 제공한다.", ["PDF 22페이지 Dashboard 화면"], ["fetch_data", "parse_diagnostic_log"]),
      star("improvement", "As-Is / To-Be", "outcome", 72, 82, "수동 점검·분리된 조치·보고 흐름을 자동 진단/조치와 대시보드 운영 흐름으로 개선했다.", [], ["current_page state", "run_ansible_simple", "generate_unix_report_excel"]),
      star("reportAudit", "리포트/감사 로그", "outcome", 24, 66, "진단·조치 결과를 보고서로 만들고 주요 사용자 행동을 감사 로그로 남긴다.", ["dashboard 로그/권한 DB 구조 이미지"], ["generate_unix_report_excel", "write_dashboard_log"])
    ],
    connections: [["architecture", "scan"], ["scan", "loggingDb"], ["loggingDb", "remediation"], ["remediation", "dashboard"], ["dashboard", "improvement"], ["improvement", "reportAudit"], ["reportAudit", "architecture"], ["loggingDb", "dashboard"]]
  },
  "bookstar-new": {
    kind: "project",
    motif: "Book Network",
    tone: "violet",
    stars: [
      star("feed", "리뷰 피드", "feature", 30, 22, "사용자가 도서 리뷰를 작성하고 피드 형태로 공유하는 핵심 화면.", ["README 홈/작성 화면 이미지"], ["feed views/templates"]),
      star("user", "사용자 모델", "stack", 54, 25, "사용자, 게시글, 좋아요, 북마크, 팔로우 관계를 데이터 모델로 설계한다.", ["README 담당 역할"], ["models.py"]),
      star("kobert", "KoBERT", "stack", 72, 44, "리뷰와 책 소개글의 유사도를 분석해 추천 점수에 반영한다.", ["README 프로젝트 개요"], ["KoBERT 분석 코드 후보"]),
      star("ncf", "NCF 추천", "feature", 46, 57, "협업 필터링 기반 점수를 추천 로직에 결합한다.", ["README 추천 페이지 이미지"], ["train_ncf_main 후보"]),
      star("cold", "Cold-Start", "outcome", 24, 62, "온보딩 기반 데이터로 초기 사용자 추천 문제를 완화한다.", ["README Features"], ["onboarding/recommendation logic"]),
      star("auth", "인증/관계", "security", 58, 78, "회원가입/로그인과 사용자 관계 기능을 통해 기본 웹 서비스 흐름을 구성한다.", ["README 로그인/회원가입 이미지"], ["auth views"])
    ],
    connections: [["feed", "user"], ["user", "kobert"], ["kobert", "ncf"], ["ncf", "cold"], ["feed", "cold"], ["user", "auth"], ["ncf", "auth"]]
  },
  hearthstock: {
    kind: "project",
    motif: "Event Branch",
    tone: "rust",
    stars: [
      star("menu", "메인 메뉴", "feature", 18, 34, "게임 진입과 주요 화면 전환의 시작점.", ["Unity 실행 캡처 예정"], ["MainMenu script 후보"]),
      star("event", "이벤트 선택", "feature", 39, 24, "사용자 선택에 따라 게임 이벤트가 발생하는 분기 구조.", ["커밋: 이벤트 추가 및 랜덤 뽑기"], ["event script 후보"]),
      star("random", "랜덤 뽑기", "stack", 58, 41, "랜덤 요소로 게임 진행의 변수를 만든다.", ["커밋 메시지 기반"], ["random draw logic"]),
      star("state", "상태 변화", "outcome", 43, 62, "이벤트 결과가 플레이 상태와 지표에 반영되는 흐름.", ["Play Mode 캡처 예정"], ["state manager 후보"]),
      star("time", "날짜 진행", "feature", 70, 66, "이벤트 선택 후 하루가 진행되는 게임 시간 처리.", ["커밋: 이벤트 최종 성공"], ["time progression logic"]),
      star("chart", "상태 UI", "stack", 82, 28, "XCharts와 UI 패키지로 상태를 시각화하는 후보 영역.", ["Packages/manifest.json"], ["XCharts UI code"])
    ],
    connections: [["menu", "event"], ["event", "random"], ["random", "state"], ["random", "chart"], ["state", "time"], ["event", "state"]]
  },
  orakgarak: {
    kind: "project",
    motif: "Mobile Flow",
    tone: "teal",
    stars: [
      star("splash", "Splash", "feature", 28, 18, "앱 시작 화면과 초기 진입 경험을 구성한다.", ["Android Studio 캡처 예정"], ["SplashActivity"]),
      star("main", "Main", "feature", 50, 28, "앱의 중심 화면과 내비게이션 흐름.", ["AndroidManifest.xml"], ["MainActivity"]),
      star("select", "시설 선택", "feature", 68, 47, "여러 시설 유형을 선택하는 모바일 UI 흐름.", ["Android Emulator 캡처 예정"], ["FacilitySelectionActivity"]),
      star("facility", "시설 화면", "outcome", 48, 67, "당구장, 볼링장, PC방, 노래방 등 화면을 분리해 앱 확장성을 만든다.", ["AndroidManifest.xml"], ["BilliardsActivity", "BowlingActivity", "PcActivity", "SingingActivity"]),
      star("manifest", "Manifest", "security", 22, 56, "Activity exported 설정과 앱 진입점을 확인할 수 있는 Android 보안 기본 자료.", ["app/src/main/AndroidManifest.xml"], ["AndroidManifest.xml"]),
      star("compose", "Compose", "stack", 76, 76, "Jetpack Compose와 Material 기반 UI 구성.", ["app/build.gradle.kts"], ["build.gradle.kts"])
    ],
    connections: [["splash", "main"], ["main", "select"], ["select", "facility"], ["manifest", "main"], ["facility", "compose"], ["select", "compose"]]
  }
};

export function getConstellation(id) {
  return constellations[id];
}
