export const uiText = {
  ko: {
    portfolioName: "정우성",
    portfolioSummary: "포트폴리오 요약",
    previous: "이전",
    next: "다음",
    previousConstellation: "이전 성좌",
    nextConstellation: "다음 성좌",
    detailPage: "상세 페이지로 이동",
    detailCta: "상세 성좌 보기",
    moveHint: "← / → 이동",
    quickNav: "성좌 바로 이동",
    selectConstellation: "성좌 선택",
    backToConstellations: "성좌 목록으로",
    github: "GitHub",
    evidenceCandidates: "증빙 자료 후보",
    codeCandidates: "코드/파일 후보",
    projectOverview: "프로젝트 개요",
    techStack: "기술 스택",
    highlights: "핵심 기능",
    securityBackendPoints: "보안/백엔드 포인트",
    publicSafetyStandard: "공개 안전 기준",
    demoVideo: "시연 영상",
    readmeImages: "README 이미지 후보",
    executionPlanned: "실행 검증 예정",
    mediaCandidates: "미디어 후보",
    environmentPending: "환경 준비 후 추가",
    readmeSlot: "README 이미지 슬롯",
    safetyNote:
      "이 프로젝트는 private 보안 진단 자료를 포함할 수 있어 원본 파일, 샘플 문서, 공격 절차는 공개하지 않고 마스킹된 증거와 개선 중심 설명만 사용한다.",
    status: {
      "partial-runnable": "부분 실행 가능",
      "local-source-available": "로컬 소스 확인",
      "execution-deferred": "실행 검증 예정"
    },
    starTypes: {
      feature: "기능",
      security: "보안",
      stack: "스택",
      outcome: "성과"
    }
  },
  en: {
    portfolioName: "Wooseong Choung",
    portfolioSummary: "Portfolio summary",
    previous: "Previous",
    next: "Next",
    previousConstellation: "Previous constellation",
    nextConstellation: "Next constellation",
    detailPage: "Open project detail",
    detailCta: "View details",
    moveHint: "Use ← / →",
    quickNav: "Jump to constellation",
    selectConstellation: "Select constellation",
    backToConstellations: "Back to constellations",
    github: "GitHub",
    evidenceCandidates: "Evidence candidates",
    codeCandidates: "Code/file candidates",
    projectOverview: "Project overview",
    techStack: "Tech stack",
    highlights: "Core features",
    securityBackendPoints: "Security/backend points",
    publicSafetyStandard: "Public safety rule",
    demoVideo: "Demo video",
    readmeImages: "README image candidates",
    executionPlanned: "Execution verification planned",
    mediaCandidates: "Media candidates",
    environmentPending: "Pending local environment",
    readmeSlot: "README image slot",
    safetyNote:
      "This project may include private security assessment materials, so raw files, sample documents, and exploit steps are excluded. Only masked evidence and remediation-focused explanations are used.",
    status: {
      "partial-runnable": "Partially runnable",
      "local-source-available": "Local source verified",
      "execution-deferred": "Execution deferred"
    },
    starTypes: {
      feature: "Feature",
      security: "Security",
      stack: "Stack",
      outcome: "Outcome"
    }
  }
};

export const projectText = {
  ko: {
    "cloud-ev-security": {
      title: "AEGIS cloud-ev-security",
      summary: "AWS 기반 EV 충전 인프라 사이버 위협 탐지 및 자동 대응 시스템.",
      problem: "EV 충전기 IoT 환경에서 발생 가능한 공격 이벤트를 탐지하고 Lambda 기반 자동 대응으로 확산을 줄이는 것을 목표로 했다.",
      role: "MITRE ATT&CK 기반 시나리오 구현, Lambda 대응 로직, IAM/GuardDuty/EventBridge 연계, 문서 최신화에 참여.",
      highlights: [
        "GuardDuty Finding을 EventBridge로 받아 Lambda 자동 대응 실행",
        "T0855/T0839/T1499/T1078/T1548/T1565 등 6종 공격 대응 매핑",
        "EV 충전기 MQTT 시뮬레이터와 CloudWatch 대시보드 구성"
      ],
      securityNotes: [
        "MITRE ATT&CK 기반 탐지/대응 모델링",
        "IAM 정책 회수, IoT 인증서 revoke, IoT 정책 격리 등 자동 대응",
        "Terraform 모듈 기반 클라우드 보안 인프라 구성",
        "CloudTrail/CloudWatch 기반 증거 보존과 운영 가시성 확보"
      ]
    },
    "pentest-web": {
      title: "pentest-web",
      summary: "웹 서비스 대상 모의해킹 및 취약점 진단 프로젝트.",
      problem: "인증, 권한, 파일 접근, CORS, 세션/쿠키 등 웹 보안 취약점을 점검하고 개선 방향을 도출했다.",
      role: "취약점 재현, 영향도 분석, 개선 가이드 작성, 보안 검증 케이스 정리.",
      highlights: [
        "인증/권한 흐름 진단",
        "민감 파일 및 다운로드 경로 접근 제어 점검",
        "보안 헤더, CORS, 쿠키 속성 등 운영 보안 설정 확인"
      ],
      securityNotes: [
        "공격 절차보다 취약점 원인, 영향, 개선 중심으로 정리",
        "인증 우회, IDOR, 파일 노출, CORS 설정을 체크리스트화",
        "개선 전후 요청/응답 차이를 마스킹해 증거 자료로 사용 가능",
        "private repo이므로 공개 코드와 로그는 반드시 선별 필요",
        "로컬 샘플 문서와 업로드 자료는 공개/캡처 전 민감정보 검토 필요",
        "실행형 샘플 파일과 급여/세금/서버 접근/문서 샘플은 원본 노출 금지"
      ]
    },
    "isms-automation": {
      title: "KISA ISMS-P 자동 진단 및 조치",
      summary: "KISA ISMS-P 평가 항목을 Ansible로 자동 진단/조치하고 Streamlit 대시보드로 시각화한 보안 자동화 프로젝트.",
      problem: "반복적인 수동 보안 점검과 조치 작업을 자동화해 운영 효율과 검증 가능성을 높였다.",
      role: "자동 진단/조치 구조 설계, Rocky Linux/Ubuntu 스크립트 작성, 결과 적재와 대시보드 연계에 참여.",
      highlights: [
        "OS/서비스 상태 기반 자동 진단 및 조치",
        "Ansible Playbook/Role 기반 모듈형 보안 점검",
        "Watchdog 기반 DB 자동 적재와 대시보드 시각화"
      ],
      securityNotes: [
        "ISMS-P 기준 보안 점검 자동화 경험",
        "Linux 계정/파일/로그/패치/서비스 영역별 진단과 조치 분리",
        "중앙 DB 적재와 대시보드 기반 결과 가시화",
        "자동 조치 불가 항목은 수동 가이드로 분리하는 운영 설계"
      ]
    },
    "bookstar-new": {
      title: "LitMatch / bookstar_new",
      summary: "개인화 독서 리뷰 피드와 추천 기능을 제공하는 Django 웹 플랫폼.",
      problem: "사용자 리뷰와 취향 데이터를 활용해 도서 탐색과 추천 경험을 개선했다.",
      role: "프론트엔드 구현, 사용자 피드/좋아요/북마크/프로필 테이블 설계 및 구현, KoBERT 기반 유사도 분석.",
      highlights: [
        "회원가입, 로그인, 로그아웃",
        "독서 리뷰 피드 작성/수정/삭제, 좋아요, 북마크, 프로필",
        "NCF와 KoBERT를 결합한 개인화 도서 추천과 Cold-Start 완화"
      ],
      securityNotes: [
        "사용자 피드와 관계형 데이터 모델링 경험",
        "인증 기능과 사용자 생성 콘텐츠 처리 경험",
        "외부 API/크롤링 데이터를 추천 로직과 연결하는 데이터 흐름 설명 가능",
        "공개 시 API 키와 사용자 데이터는 제외"
      ]
    },
    hearthstock: {
      title: "hearthstock",
      summary: "Unity 기반 이벤트와 랜덤 요소가 포함된 게임 프로젝트.",
      problem: "게임 내 이벤트 선택, 랜덤 뽑기, 날짜 진행 등 상호작용 로직을 구현했다.",
      role: "이벤트 로직, 랜덤 요소, 게임 진행 흐름 구현에 참여.",
      highlights: [
        "게임 이벤트 선택 및 처리",
        "랜덤 뽑기와 상태 변화 로직",
        "이벤트 선택 후 하루 진행 및 게임 시간 흐름 처리"
      ],
      securityNotes: [
        "보안 메인 프로젝트는 아니지만 상태 관리와 이벤트 기반 로직 구현 경험으로 제시",
        "데이터 저장, 점수 계산, 랜덤 로직을 구조적으로 설명 가능",
        "클라이언트 단독 프로젝트라 공개 전 빌드 산출물과 에셋 관리 필요"
      ]
    },
    orakgarak: {
      title: "orakgarak",
      summary: "Kotlin 기반 Android 여가/시설 탐색 앱 프로토타입.",
      problem: "사용자가 여러 시설 유형을 선택하고 화면별 기능을 탐색할 수 있는 모바일 UI 흐름을 구현했다.",
      role: "Android 앱 구조 구성, 화면 전환, 시설별 Activity 구성, UI 구현.",
      highlights: [
        "Splash/Main 화면과 시설 선택 화면 구성",
        "당구장, 볼링장, PC방, 노래방 등 시설별 Activity 분리",
        "Android Manifest 기반 화면 라우팅과 앱 진입점 설정"
      ],
      securityNotes: [
        "Android activity exported 설정 확인 대상으로 삼을 수 있음",
        "추후 로컬 저장소와 네트워크 권한 사용 여부 평가 가능",
        "보안 메인보다 초기 앱 개발 경험으로 배치"
      ]
    }
  },
  en: {
    "cloud-ev-security": {
      title: "AEGIS cloud-ev-security",
      summary: "An AWS-based cyber threat detection and automated response system for EV charging infrastructure.",
      problem: "The project detects attack events in EV charger IoT environments and reduces blast radius through Lambda-based automated response.",
      role: "Contributed MITRE ATT&CK scenarios, Lambda response logic, IAM/GuardDuty/EventBridge integration, and documentation updates.",
      highlights: [
        "Routes GuardDuty findings through EventBridge to trigger Lambda response",
        "Maps automated response to six MITRE ATT&CK techniques",
        "Includes an EV charger MQTT simulator and CloudWatch dashboard"
      ],
      securityNotes: [
        "MITRE ATT&CK based detection and response modeling",
        "Automated response through IAM policy detach, IoT certificate revoke, and IoT policy isolation",
        "Terraform modular cloud security infrastructure",
        "Evidence preservation and visibility through CloudTrail and CloudWatch"
      ]
    },
    "pentest-web": {
      title: "pentest-web",
      summary: "A web security assessment project for a business web service.",
      problem: "The project checks authentication, authorization, file access, CORS, session, and cookie risks, then turns them into remediation guidance.",
      role: "Reproduced vulnerabilities, analyzed impact, wrote remediation guidance, and organized verification cases.",
      highlights: [
        "Assessed authentication and authorization flows",
        "Checked access control around sensitive files and download paths",
        "Reviewed security headers, CORS, cookies, and operational security settings"
      ],
      securityNotes: [
        "Explains root cause, impact, and remediation instead of publishing exploit steps",
        "Turns authentication bypass, IDOR, file exposure, and CORS issues into a security checklist",
        "Can use masked before/after request and response evidence",
        "Private repository materials require strict selection before publication",
        "Local sample documents and uploaded materials must be reviewed before screenshots",
        "Executable samples, payroll, tax, server access, and document samples must not be exposed raw"
      ]
    },
    "isms-automation": {
      title: "KISA ISMS-P Automation",
      summary: "A security automation project that diagnoses and remediates KISA ISMS-P checklist items with Ansible and visualizes results in Streamlit.",
      problem: "The project automates repeated manual security checks and remediation tasks to improve operational efficiency and verifiability.",
      role: "Designed the diagnosis/remediation structure, wrote Rocky Linux and Ubuntu scripts, and connected result storage with the dashboard.",
      highlights: [
        "Automated diagnosis and remediation based on OS and service state",
        "Modular security checks with Ansible Playbooks and Roles",
        "Watchdog-based DB ingestion and dashboard visualization"
      ],
      securityNotes: [
        "Experience automating ISMS-P based security checks",
        "Separated Linux account, file, log, patch, and service checks from remediation logic",
        "Central DB storage and dashboard-based result visibility",
        "Operational design that separates manual guidance from automatable items"
      ]
    },
    "bookstar-new": {
      title: "LitMatch / bookstar_new",
      summary: "A Django web platform for personalized book review feeds and recommendations.",
      problem: "The project improves book discovery and recommendation experiences by using user reviews and preference data.",
      role: "Implemented frontend screens, designed and built user feed/like/bookmark/profile tables, and worked on KoBERT-based similarity analysis.",
      highlights: [
        "Sign-up, login, and logout",
        "Book review feed creation, edit, delete, like, bookmark, and profile features",
        "Personalized book recommendations combining NCF and KoBERT with Cold-Start mitigation"
      ],
      securityNotes: [
        "User feed and relational data modeling experience",
        "Authentication and user-generated content handling experience",
        "Can explain the data flow connecting external API/crawling data to recommendation logic",
        "API keys and user data must be excluded from public material"
      ]
    },
    hearthstock: {
      title: "hearthstock",
      summary: "A Unity game project with event selection and random progression elements.",
      problem: "The project implements interactive logic such as event selection, random draws, and date progression in a game loop.",
      role: "Contributed event logic, random elements, and game progression flow.",
      highlights: [
        "Game event selection and processing",
        "Random draw and state change logic",
        "Day progression and game time handling after event choices"
      ],
      securityNotes: [
        "Not a security-focused project, but useful for showing state management and event-driven logic",
        "Data storage, score calculation, and random logic can be explained structurally",
        "Build outputs and assets should be reviewed before publication"
      ]
    },
    orakgarak: {
      title: "orakgarak",
      summary: "A Kotlin-based Android prototype for browsing leisure facilities.",
      problem: "The project implements a mobile UI flow where users choose among facility types and navigate screen-specific features.",
      role: "Built the Android app structure, screen transitions, facility-specific Activities, and UI.",
      highlights: [
        "Splash/Main screens and facility selection flow",
        "Separated Activities for billiards, bowling, PC rooms, and karaoke",
        "Android Manifest based screen routing and app entry configuration"
      ],
      securityNotes: [
        "Activity exported settings can be reviewed as an Android security baseline",
        "Future review can cover local storage and network permission usage",
        "Positioned as an early app development experience rather than a main security project"
      ]
    }
  }
};

export const constellationText = {
  ko: {
    "cloud-ev-security": {
      motif: "Shield Radar",
      stars: {
        guardduty: ["GuardDuty", "위협 탐지의 시작점. GuardDuty Finding을 이벤트 기반 대응 흐름으로 연결한다.", ["README MITRE ATT&CK 대응 매핑", "video/aegis.mp4"], ["terraform/modules/guardduty", "terraform/modules/eventbridge"]],
        eventbridge: ["이벤트/아키텍처 흐름", "IoT Core, GuardDuty, EventBridge, Lambda, 저장소와 알림이 이어지는 전체 이벤트 흐름.", ["AEGIS 전체 아키텍처"], ["terraform/modules/eventbridge"]],
        lambda: ["Lambda 대응", "공격 유형별 대응을 분기해 격리, 차단, 로그 보존 같은 조치를 실행한다.", ["Lambda 실행 결과 후보", "video/aegis.mp4"], ["lambda/handler.py"]],
        isolate: ["IoT 격리", "IoT 정책 분리와 인증서 revoke로 공격 확산을 줄이는 자동 대응 포인트.", ["T0855/T1078 대응 매핑"], ["terraform/modules/iot", "lambda/handler.py"]],
        evidence: ["관측/감사 로그", "CloudWatch 지표, CloudTrail 감사 로그, DynamoDB 이벤트 저장으로 대응 이후 추적성을 확보한다.", ["코드 기반 관측/감사 구조"], ["terraform/modules/monitoring"]],
        dashboard: ["운영 대시보드", "지도, 이벤트 로그, 공격 시뮬레이터, 충전기 상태를 보는 AEGIS 운영 화면.", ["AEGIS 대시보드 화면"], ["lambda/stats_handler.py", "lambda/simulate_handler.py"]]
      }
    },
    "pentest-web": {
      motif: "Lock Route",
      stars: {
        authSession: ["인증/세션", "로그인, 세션 저장, 로그인 감사 흐름을 기준으로 인증 안정성을 점검한다.", [], ["AuthService.login", "saveAudit"]],
        objectAccess: ["권한/객체 접근", "사용자, 문서, 결재 객체 접근 제어를 서버 측 권한 기준으로 점검한다.", [], ["ApprovalService.canActOnDocument", "EmployeeService"]],
        documentFiles: ["파일/문서 접근", "문서 업로드, 다운로드, 저장 경로 처리에서 민감 파일 노출 위험을 점검한다.", [], ["DocumentService.downloadDocument", "storeDocumentFile"]],
        payslipAccess: ["급여명세 접근", "급여명세 조회, 검색, 다운로드 권한이 사용자와 부서 기준으로 제한되는지 점검한다.", [], ["PayslipService.searchPayslipIds", "assertCanAccessPayslip"]],
        inputValidation: ["입력값 검증", "SQL Injection과 Stored XSS 위험을 입력값 검증과 출력 처리 관점에서 정리한다.", [], ["searchPayslipIds", "runApprovalTypeListQuery"]],
        browserSecurity: ["브라우저 보안 설정", "CORS, 쿠키, CSRF, 보안 헤더 같은 브라우저 보안 설정을 개선 기준으로 정리한다.", [], ["LocalCorsConfig.addCorsMappings", "healthCorsFilter"]]
      }
    },
    "isms-automation": {
      motif: "Automation Checklist",
      stars: {
        architecture: ["시스템 아키텍처", "Control Node, Scan Node, Ansible, PostgreSQL, Streamlit이 이어지는 전체 보안 자동화 구조.", ["시스템 아키텍처 이미지"], ["dashboard/app.py", "run_ansible_simple"]],
        scan: ["자동 진단", "Ubuntu와 Rocky Linux별 스크립트로 ISMS-P 점검 항목을 자동 진단한다.", [], ["scanner.sh", "Rocky_U_*.sh", "Ubuntu_U_*.sh"]],
        loggingDb: ["결과 표준화/DB", "JSONL 로그와 audit DB로 진단 결과를 표준화하고 최신 상태를 조회한다.", ["audit DB 구조 이미지"], ["common_logging.sh", "fetch_data"]],
        remediation: ["자동 조치/재점검", "자동 조치 가능한 항목을 Ansible로 실행하고 DB 반영과 재점검 상태를 확인한다.", [], ["run_ansible_simple", "_poll_db_latest_is_vul"]],
        dashboard: ["운영 대시보드", "Streamlit으로 이행률, 자산 상태, 상세 결과, 일괄/개별 조치 흐름을 제공한다.", ["PDF 22페이지 Dashboard 화면"], ["fetch_data", "parse_diagnostic_log"]],
        improvement: ["As-Is / To-Be", "수동 점검·분리된 조치·보고 흐름을 자동 진단/조치와 대시보드 운영 흐름으로 개선했다.", [], ["current_page state", "run_ansible_simple", "generate_unix_report_excel"]],
        reportAudit: ["리포트/감사 로그", "진단·조치 결과를 보고서로 만들고 주요 사용자 행동을 감사 로그로 남긴다.", ["dashboard 로그/권한 DB 구조 이미지"], ["generate_unix_report_excel", "write_dashboard_log"]]
      }
    },
    "bookstar-new": {
      motif: "Book Network",
      stars: {
        feed: ["리뷰 피드", "사용자가 독서 리뷰를 작성하고 피드 형태로 공유하는 핵심 화면.", ["README 글 작성 화면 이미지"], ["feed views/templates"]],
        user: ["사용자 모델", "게시글, 좋아요, 북마크, 프로필 관계를 데이터 모델로 설계했다.", ["README 담당 역할"], ["models.py"]],
        kobert: ["KoBERT", "리뷰와 책 소개글의 유사도를 분석해 추천 점수에 반영한다.", ["README 프로젝트 개요"], ["KoBERT 분석 코드 후보"]],
        ncf: ["NCF 추천", "협업 필터링 기반 점수를 추천 로직에 결합한다.", ["README 추천 페이지 이미지"], ["train_ncf_main 후보"]],
        cold: ["Cold-Start", "온보딩 기반 데이터로 초기 사용자 추천 문제를 완화한다.", ["README Features"], ["onboarding/recommendation logic"]],
        auth: ["인증/관계", "회원가입과 로그인, 사용자 관계 기능으로 기본 웹 서비스 흐름을 구성한다.", ["README 로그인/회원가입 이미지"], ["auth views"]]
      }
    },
    hearthstock: {
      motif: "Event Branch",
      stars: {
        menu: ["메인 메뉴", "게임 진입과 주요 화면 전환의 시작점.", ["Unity 실행 캡처 예정"], ["MainMenu script 후보"]],
        event: ["이벤트 선택", "사용자 선택에 따라 게임 이벤트가 발생하는 분기 구조.", ["커밋: 이벤트 추가 및 랜덤 뽑기"], ["event script 후보"]],
        random: ["랜덤 뽑기", "랜덤 요소로 게임 진행이 변하도록 만든다.", ["커밋 메시지 기반"], ["random draw logic"]],
        state: ["상태 변화", "이벤트 결과가 플레이어 상태와 지표에 반영되는 흐름.", ["Play Mode 캡처 예정"], ["state manager 후보"]],
        time: ["날짜 진행", "이벤트 선택 후 하루가 진행되는 게임 시간 처리.", ["커밋: 이벤트 최종 성공"], ["time progression logic"]],
        chart: ["상태 UI", "XCharts와 UI 패키지로 상태를 시각화하는 후보 영역.", ["Packages/manifest.json"], ["XCharts UI code"]]
      }
    },
    orakgarak: {
      motif: "Mobile Flow",
      stars: {
        splash: ["Splash", "앱 시작 화면과 초기 진입 경험을 구성한다.", ["Android Studio 캡처 예정"], ["SplashActivity"]],
        main: ["Main", "앱의 중심 화면과 내비게이션 흐름.", ["AndroidManifest.xml"], ["MainActivity"]],
        select: ["시설 선택", "여러 시설 유형을 선택하는 모바일 UI 흐름.", ["Android Emulator 캡처 예정"], ["FacilitySelectionActivity"]],
        facility: ["시설 화면", "당구장, 볼링장, PC방, 노래방 화면을 분리해 확장성을 만든다.", ["AndroidManifest.xml"], ["BilliardsActivity", "BowlingActivity", "PcActivity", "SingingActivity"]],
        manifest: ["Manifest", "Activity exported 설정과 앱 진입점을 확인할 수 있는 Android 보안 기본 자료.", ["app/src/main/AndroidManifest.xml"], ["AndroidManifest.xml"]],
        compose: ["Compose", "Jetpack Compose와 Material 기반 UI 구성.", ["app/build.gradle.kts"], ["build.gradle.kts"]]
      }
    }
  },
  en: {
    "cloud-ev-security": {
      motif: "Shield Radar",
      stars: {
        guardduty: ["GuardDuty", "The starting point for threat detection. GuardDuty findings are connected to an event-driven response flow.", ["README MITRE ATT&CK response mapping", "video/aegis.mp4"], ["terraform/modules/guardduty", "terraform/modules/eventbridge"]],
        eventbridge: ["Event / Architecture Flow", "End-to-end event flow connecting IoT Core, GuardDuty, EventBridge, Lambda, storage, and notifications.", ["AEGIS full architecture"], ["terraform/modules/eventbridge"]],
        lambda: ["Lambda Response", "Branches response actions by attack type, including isolation, blocking, and log preservation.", ["Lambda execution result candidate", "video/aegis.mp4"], ["lambda/handler.py"]],
        isolate: ["IoT Isolation", "Automated response point that reduces spread through IoT policy separation and certificate revoke.", ["T0855/T1078 response mapping"], ["terraform/modules/iot", "lambda/handler.py"]],
        evidence: ["Observability / Audit Logs", "Preserves traceability after response through CloudWatch metrics, CloudTrail audit logs, and DynamoDB event storage.", ["Code-based observability and audit structure"], ["terraform/modules/monitoring"]],
        dashboard: ["Operations Dashboard", "AEGIS operator screen for maps, event logs, attack simulation, and charger security status.", ["AEGIS dashboard screen"], ["lambda/stats_handler.py", "lambda/simulate_handler.py"]]
      }
    },
    "pentest-web": {
      motif: "Lock Route",
      stars: {
        authSession: ["Auth / Session", "Reviews login, session storage, and login audit flow.", [], ["AuthService.login", "saveAudit"]],
        objectAccess: ["Object Access", "Reviews user, document, and approval object access using server-side authorization criteria.", [], ["ApprovalService.canActOnDocument", "EmployeeService"]],
        documentFiles: ["Document Files", "Reviews document upload, download, and storage-path exposure risk.", [], ["DocumentService.downloadDocument", "storeDocumentFile"]],
        payslipAccess: ["Payslip Access", "Reviews payslip search, detail, and download permissions by user and department scope.", [], ["PayslipService.searchPayslipIds", "assertCanAccessPayslip"]],
        inputValidation: ["Input Validation", "Frames SQL Injection and Stored XSS risk around validation and output handling.", [], ["searchPayslipIds", "runApprovalTypeListQuery"]],
        browserSecurity: ["Browser Security", "Reviews CORS, cookies, CSRF, and security headers as remediation criteria.", [], ["LocalCorsConfig.addCorsMappings", "healthCorsFilter"]]
      }
    },
    "isms-automation": {
      motif: "Automation Checklist",
      stars: {
        architecture: ["System Architecture", "End-to-end security automation structure connecting Control Node, Scan Node, Ansible, PostgreSQL, and Streamlit.", ["System architecture image"], ["dashboard/app.py", "run_ansible_simple"]],
        scan: ["Automated Scan", "Runs ISMS-P checks through Ubuntu and Rocky Linux specific scripts.", [], ["scanner.sh", "Rocky_U_*.sh", "Ubuntu_U_*.sh"]],
        loggingDb: ["Log / DB Standardization", "Standardizes diagnosis results through JSONL logs and the audit DB for latest-state lookup.", ["audit DB structure image"], ["common_logging.sh", "fetch_data"]],
        remediation: ["Remediation / Re-check", "Runs Ansible remediation for automatable items and verifies DB reflection plus re-check state.", [], ["run_ansible_simple", "_poll_db_latest_is_vul"]],
        dashboard: ["Operations Dashboard", "Provides fulfillment rate, asset status, detailed results, and batch/individual remediation flows in Streamlit.", ["Dashboard screen from PDF page 22"], ["fetch_data", "parse_diagnostic_log"]],
        improvement: ["As-Is / To-Be", "Improves manual checks and separated remediation/reporting into automated diagnosis, remediation, and dashboard operations.", [], ["current_page state", "run_ansible_simple", "generate_unix_report_excel"]],
        reportAudit: ["Report / Audit Logs", "Turns diagnosis/remediation results into reports and records key user actions as audit logs.", ["dashboard log and role DB structure image"], ["generate_unix_report_excel", "write_dashboard_log"]]
      }
    },
    "bookstar-new": {
      motif: "Book Network",
      stars: {
        feed: ["Review Feed", "Core screen where users create and share book reviews in a feed.", ["README writing screen image"], ["feed views/templates"]],
        user: ["User Model", "Models posts, likes, bookmarks, and profile relationships.", ["README role section"], ["models.py"]],
        kobert: ["KoBERT", "Analyzes similarity between reviews and book descriptions to feed recommendation scores.", ["README project overview"], ["KoBERT analysis code candidate"]],
        ncf: ["NCF Recommendation", "Combines collaborative filtering scores into the recommendation logic.", ["README recommendation page image"], ["train_ncf_main candidate"]],
        cold: ["Cold-Start", "Mitigates new-user recommendation issues through onboarding-based data.", ["README Features"], ["onboarding/recommendation logic"]],
        auth: ["Auth/Relations", "Builds the basic web service flow through sign-up, login, and user relationship features.", ["README login/sign-up image"], ["auth views"]]
      }
    },
    hearthstock: {
      motif: "Event Branch",
      stars: {
        menu: ["Main Menu", "Entry point for the game and primary screen transitions.", ["Unity capture planned"], ["MainMenu script candidate"]],
        event: ["Event Choice", "Branching structure where game events occur based on player choices.", ["Commit: event addition and random draw"], ["event script candidate"]],
        random: ["Random Draw", "Adds random elements that change game progression.", ["Commit message based"], ["random draw logic"]],
        state: ["State Change", "Flow where event results affect player state and indicators.", ["Play Mode capture planned"], ["state manager candidate"]],
        time: ["Date Progression", "Game time handling where a day progresses after an event choice.", ["Commit: final event success"], ["time progression logic"]],
        chart: ["State UI", "Candidate area for visualizing state with XCharts and UI packages.", ["Packages/manifest.json"], ["XCharts UI code"]]
      }
    },
    orakgarak: {
      motif: "Mobile Flow",
      stars: {
        splash: ["Splash", "Sets up the app launch screen and initial entry experience.", ["Android Studio capture planned"], ["SplashActivity"]],
        main: ["Main", "Central app screen and navigation flow.", ["AndroidManifest.xml"], ["MainActivity"]],
        select: ["Facility Select", "Mobile UI flow for choosing among facility types.", ["Android Emulator capture planned"], ["FacilitySelectionActivity"]],
        facility: ["Facility Screens", "Separates billiards, bowling, PC room, and karaoke screens for extensibility.", ["AndroidManifest.xml"], ["BilliardsActivity", "BowlingActivity", "PcActivity", "SingingActivity"]],
        manifest: ["Manifest", "Android security baseline material for Activity exported settings and app entry points.", ["app/src/main/AndroidManifest.xml"], ["AndroidManifest.xml"]],
        compose: ["Compose", "UI composition based on Jetpack Compose and Material.", ["app/build.gradle.kts"], ["build.gradle.kts"]]
      }
    }
  }
};

export function localizeProject(project, language) {
  return {
    ...project,
    ...(projectText[language]?.[project.id] ?? {})
  };
}

export function localizeConstellation(constellation, projectId, language) {
  const text = constellationText[language]?.[projectId];
  if (!text) return constellation;

  return {
    ...constellation,
    motif: text.motif ?? constellation.motif,
    stars: constellation.stars.map((star) => {
      const translated = text.stars?.[star.id];
      if (!translated) return star;
      const [label, description, evidence, code] = translated;
      return {
        ...star,
        label,
        description,
        evidence,
        code
      };
    })
  };
}
