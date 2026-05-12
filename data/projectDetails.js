const projectDetails = {
  ko: {
    "isms-automation": {
      labels: {
        section: "케이스 요약",
        goal: "문제/목표",
        role: "내 역할",
        points: "구현 포인트",
        evidence: "증빙 자료",
        code: "공개 가능한 코드 후보",
        disclosure: "공개 기준"
      },
      caseStudy: {
        goal:
          "반복적인 수동 보안 점검과 조치 작업을 Ansible 기반 자동화로 바꾸고, 진단 결과를 DB와 대시보드로 연결해 운영자가 상태를 빠르게 확인할 수 있게 만드는 것이 목표였다.",
        role:
          "DB 모델링/결과 적재 구조, Streamlit 대시보드, 진단 이력 조회, 자동화 리포트 생성, 진단-DB-대시보드 통합 테스트를 담당했다.",
        points: [
          "Ansible 진단/조치 결과를 JSON/Log 형태로 표준화해 후속 적재와 조회가 가능하게 구성",
          "Watchdog 기반으로 진단 결과 파일 변경을 감지하고 PostgreSQL에 누적 저장하는 흐름 설계",
          "Streamlit에서 전체 보안 이행률, 항목별 진단 상태, 조치 결과, 리포트 생성 흐름을 시각화",
          "자동 조치가 위험한 항목은 수동 가이드로 분리해 운영 안정성을 우선하는 구조로 정리"
        ]
      },
      evidenceAssets: [
        { title: "대시보드 개요", source: "README 기반 공개 이미지", status: "Streamlit 보안 이행률 화면", src: "/projects/isms-automation/evidence/dashboard-overview.png", alt: "ISMS 자동 진단 대시보드 개요 화면" },
        { title: "진단 이력 조회", source: "README 기반 공개 이미지", status: "진단 결과 조회/필터링 흐름", src: "/projects/isms-automation/evidence/diagnosis-history.png", alt: "ISMS 진단 이력 조회 화면" },
        { title: "리포트 생성 흐름", source: "README 기반 공개 이미지", status: "결과 적재 후 보고서화 증빙", src: "/projects/isms-automation/evidence/report-flow.png", alt: "ISMS 리포트 생성 화면" },
        { title: "코드 근거: DB/Watchdog", source: "로컬 소스 확인 완료", status: "이미지 대신 코드 설명 카드로 보강" },
        { title: "시연 영상", source: "기존 시연영상", status: "외부 영상 서버 이전 예정" }
      ],
      codeHighlights: [
        { title: "Streamlit dashboard", path: "dashboard/app.py", note: "진단 결과 조회, 보안 이행률 시각화, 리포트 생성 화면을 담당한다. 포트폴리오에서는 사용자가 결과를 어떻게 탐색하는지와 DB 조회 흐름을 함께 설명한다." },
        { title: "Rocky Linux scan scripts", path: "Choung/log_Rocky9_sh/*", note: "Rocky 환경의 계정, 파일, 로그, 서비스 점검 결과를 표준 로그/JSON 형태로 남기는 영역이다. OS별 분기와 결과 표준화 역량을 보여주는 코드 후보로 사용한다." },
        { title: "Ubuntu scan scripts", path: "Choung/log_Ubuntu_sh/*", note: "Ubuntu 환경의 ISMS-P 점검 항목을 자동화한 스크립트 묶음이다. 동일 기준을 다른 OS에 맞춰 적용한 구조를 설명한다." },
        { title: "Scanner entrypoint", path: "Choung/scanner.sh", note: "진단 스크립트 실행을 묶는 진입점이다. 개별 점검 스크립트가 대시보드/DB 적재 흐름으로 이어지는 연결 지점으로 설명한다." }
      ],
      safeDisclosureNotes: [
        "서버 IP, 계정, 실제 운영 경로, 민감 로그 원본은 공개하지 않는다.",
        "진단 항목은 KISA/주요정보통신기반시설 기준의 방어 목적 자동화로 설명한다.",
        "조치 스크립트는 위험 명령 자체보다 판단 기준, 로그 표준화, 운영 분리 기준 중심으로 공개한다."
      ]
    },
    "cloud-ev-security": {
      labels: {
        section: "케이스 요약",
        goal: "문제/목표",
        role: "내 역할",
        points: "구현 포인트",
        evidence: "증빙 자료",
        code: "공개 가능한 코드 후보",
        disclosure: "공개 기준"
      },
      caseStudy: {
        goal:
          "EV 충전 인프라에서 발생할 수 있는 IoT/클라우드 위협을 MITRE ATT&CK 기준으로 탐지하고, AWS 이벤트 파이프라인을 통해 자동 대응과 운영 가시성을 제공하는 것이 목표였다.",
        role:
          "PM으로 일정과 산출물을 조율하면서 아키텍처 설계, Terraform 인프라 구성, MITRE ATT&CK 대응 코드 설계, 대시보드 구현에 참여했다.",
        points: [
          "AWS IoT Core, GuardDuty, EventBridge, Lambda를 연결해 탐지 이벤트가 대응 함수로 이어지는 구조 설계",
          "T0855, T0839, T1499, T1078, T1548, T1565 기반 공격 유형을 탐지/대응 시나리오로 매핑",
          "DynamoDB, CloudWatch, CloudTrail을 활용해 이벤트 이력, 대응 결과, 감사 추적 가능성을 확보",
          "Terraform 모듈로 IoT, Lambda, EventBridge, GuardDuty, Monitoring 인프라를 재현 가능하게 구성"
        ]
      },
      evidenceAssets: [
        { title: "AEGIS 전체 아키텍처", source: "선별 이미지", status: "별 상세 영역에서 사용" },
        { title: "대시보드 지표", source: "선별 이미지", status: "별 상세 영역에서 사용" },
        { title: "관측/감사 로그 구조", source: "Terraform/저장소 코드 기반", status: "별 상세 영역에서 코드 카드로 설명" },
        { title: "Terraform/Lambda 주요 코드", source: "로컬 소스 확인 완료", status: "별 상세 영역에서 코드 카드로 사용" },
        { title: "시연 영상", source: "기존 시연영상", status: "외부 영상 서버 이전 예정" }
      ],
      codeHighlights: [
        { title: "Threat response handler", path: "lambda/handler.py", note: "탐지 이벤트를 공격 유형별 대응 로직으로 라우팅하는 핵심 Lambda 코드다. 격리, 차단, 로그 보존 같은 방어 중심 흐름을 설명한다." },
        { title: "Simulation and stats APIs", path: "lambda/simulate_handler.py / lambda/stats_handler.py", note: "대시보드에서 시뮬레이션을 실행하고 이벤트 통계를 조회하는 흐름을 담당한다. 탐지-대응 결과가 운영 화면으로 이어지는 연결 지점이다." },
        { title: "EV charger simulator", path: "simulator/charger.py", note: "EV 충전기 동작을 MQTT 메시지로 재현하는 시뮬레이터다. 정상 이벤트와 탐지 대상 이벤트를 분리해 실험 환경을 구성한 점을 보여준다." },
        { title: "Terraform modules", path: "terraform/modules/*", note: "IoT, Lambda, EventBridge, GuardDuty, DynamoDB, Monitoring 구성을 모듈화한 영역이다. 클라우드 보안 파이프라인을 코드로 재현 가능하게 만든 근거로 사용한다." }
      ],
      safeDisclosureNotes: [
        "AWS 계정, 인증서, Slack Webhook, Terraform 변수 원본은 공개하지 않는다.",
        "공격 시나리오는 MITRE ATT&CK ID, 탐지 목적, 대응 효과 중심으로 설명한다.",
        "실제 클라우드 리소스 식별자와 로그 원본은 마스킹된 장표 또는 재현용 캡처로만 사용한다."
      ]
    },
    "pentest-web": {
      labels: {
        section: "케이스 요약",
        goal: "문제/목표",
        role: "내 역할",
        points: "진단 포인트",
        evidence: "증빙 자료",
        code: "공개 가능한 코드 후보",
        findings: "대표 취약점 선별",
        disclosure: "공개 기준"
      },
      caseStudy: {
        goal:
          "실무형 사내 인트라넷 테스트베드를 구성하고 웹 취약점 21개 항목을 점검해, 취약점의 영향과 개선 방향을 방어 관점에서 정리하는 것이 목표였다.",
        role:
          "AWS 인프라 환경 구성, Spring Boot Backend API 구현, 전자결재/급여명세 영역 점검과 결과 분석, 모의해킹 시연영상 제작을 담당했다.",
        points: [
          "Spring Boot 기반 로그인, 전자결재, 급여명세, 자료실, 관리자 기능을 포함한 업무 시스템 구조 점검",
          "권한 기반 기능에서 객체 단위 접근 제어, 세션, 쿠키, CORS, 보안 헤더 등 운영 보안 설정 확인",
          "취약점 재현 자체보다 원인, 영향, 개선 권고, 검증 기준을 보고서 형태로 정리",
          "공개 포트폴리오에서는 공격 요청 세부값과 raw API 조합을 제외하고 마스킹된 증빙과 개선 중심 문구만 사용"
        ]
      },
      representativeFindings: {
        summary: "KISA 가이드 기반 웹 취약점 21개 항목을 점검했고, 포트폴리오에는 대표 5개만 방어 중심으로 상세화한다.",
        items: [
          { name: "인증/권한 검증", impact: "권한 있는 기능과 객체 접근 범위가 서버 측에서 충분히 제한되는지 확인", remediation: "세션 사용자 기준 권한 검사와 객체 소유권 검증 강화" },
          { name: "파일 접근/다운로드", impact: "문서와 첨부 파일 접근 경로에서 민감 자료 노출 가능성 점검", remediation: "부서/소유자 기반 권한 검사와 저장 경로 노출 제거" },
          { name: "Stored XSS", impact: "사용자 입력이 HTML로 해석될 때 권한 있는 사용자 브라우저에서 악용될 수 있음", remediation: "출력 인코딩, textContent 사용, Sanitizer/CSP 적용" },
          { name: "SQL Injection 위험", impact: "입력값이 쿼리 구조에 영향을 줄 수 있는 위험을 오류 응답과 검색 흐름에서 점검", remediation: "파라미터 바인딩, 동적 조건 분리, 화이트리스트 검증" },
          { name: "CSRF/헤더/쿠키", impact: "쿠키 기반 인증과 브라우저 보안 설정 미흡이 다른 취약점의 영향을 키울 수 있음", remediation: "CSRF 토큰, SameSite/Secure/HttpOnly, 보안 헤더 적용" }
        ]
      },
      evidenceAssets: [
        { title: "21개 웹 취약점 점검", source: "보고서 요약 기반", status: "공격 절차 없이 진단 범위와 개선 기준만 공개" },
        { title: "전자결재/급여명세 점검", source: "로컬 소스 확인 완료", status: "이미지 대신 코드 설명 카드로 보강" },
        { title: "보안 설정 검토", source: "Spring Boot 설정 코드 기반", status: "CORS, 쿠키, 헤더 개선 관점으로 설명" },
        { title: "보고서 작성 증빙", source: "마스킹된 목차/요약만 사용", status: "원본 문서와 민감 샘플은 비공개" },
        { title: "시연 영상", source: "기존 시연영상", status: "외부 영상 서버 이전 예정" }
      ],
      codeHighlights: [
        { title: "Authentication flow", path: "AuthController.java / AuthService.java", note: "로그인과 세션 처리 흐름을 보여주는 코드 후보다. 포트폴리오에서는 인증 우회 절차가 아니라 서버 측 인증 정책과 검증 기준을 설명한다." },
        { title: "Approval and payslip APIs", path: "Approval* / Payslip* controller-service", note: "전자결재와 급여명세 기능의 권한 검증 흐름을 보여준다. 사용자 역할과 리소스 소유권 검증을 중심으로 방어 관점을 정리한다." },
        { title: "Document access flow", path: "DocumentController.java / DocumentService.java", note: "자료실 파일 접근 제어와 다운로드 흐름을 설명하는 코드 후보다. 민감 경로와 샘플 파일명은 공개하지 않고 접근 제어 설계만 보여준다." },
        { title: "Browser security config", path: "LocalCorsConfig.java", note: "CORS, 쿠키, 보안 헤더 설정을 정리하는 후보 코드다. 운영 환경에서 브라우저 보안 설정이 왜 중요한지 개선 기준 중심으로 설명한다." },
        { title: "Assessment report summary", path: "Doc/blackbox-pentest-report-2026-04-24-ko.md", note: "보고서 원본 대신 항목 분류, 영향, 개선 기준만 추려 설명한다. 민감 API와 공격 요청 세부값은 공개하지 않는다." }
      ],
      safeDisclosureNotes: [
        "raw API 경로와 공격 요청 세부값 조합, 실행형 샘플 파일, 급여/세금/서버 접근 샘플은 공개하지 않는다.",
        "실제 계정, 세션 쿠키, 내부 IP, 저장 경로, 로그 원본은 화면에 노출하지 않는다.",
        "취약점은 공격 성공 절차가 아니라 원인, 영향, 방어/개선 포인트 중심으로 설명한다.",
        "보고서 이미지는 목차, 요약표, 마스킹된 결과 중심으로만 사용한다."
      ]
    }
  },
  en: {
    "isms-automation": {
      labels: {
        section: "Case Summary",
        goal: "Problem / Goal",
        role: "My Role",
        points: "Implementation Points",
        evidence: "Evidence",
        code: "Public Code Candidates",
        disclosure: "Disclosure Rules"
      },
      caseStudy: {
        goal:
          "The goal was to replace repeated manual security checks and remediation work with Ansible automation, then connect results to a DB and dashboard for fast operational visibility.",
        role:
          "Owned DB modeling/result ingestion structure, Streamlit dashboard work, diagnosis history lookup, automated report generation, and diagnosis-to-DB-to-dashboard integration testing.",
        points: [
          "Standardized Ansible check/remediation output as JSON/Log for downstream ingestion and lookup",
          "Designed a Watchdog-based flow that detects result file changes and stores them in PostgreSQL",
          "Visualized security fulfillment, item-level status, remediation results, and report generation in Streamlit",
          "Separated risky automated remediation items into manual guidance to prioritize operational safety"
        ]
      },
      evidenceAssets: [
        { title: "Dashboard overview", source: "Public README image", status: "Streamlit security fulfillment screen", src: "/projects/isms-automation/evidence/dashboard-overview.png", alt: "ISMS automation dashboard overview" },
        { title: "Diagnosis history lookup", source: "Public README image", status: "Diagnosis result lookup and filtering flow", src: "/projects/isms-automation/evidence/diagnosis-history.png", alt: "ISMS diagnosis history lookup screen" },
        { title: "Report generation flow", source: "Public README image", status: "Evidence of result ingestion and report output", src: "/projects/isms-automation/evidence/report-flow.png", alt: "ISMS report generation screen" },
        { title: "Code evidence: DB/Watchdog", source: "Local source verified", status: "Covered through code cards instead of an image" },
        { title: "Demo video", source: "Existing demo video", status: "To be moved to an external video server" }
      ],
      codeHighlights: [
        { title: "Streamlit dashboard", path: "dashboard/app.py", note: "Handles diagnosis result lookup, security fulfillment visualization, and report generation. The portfolio explanation should connect the user-facing dashboard to the DB query flow." },
        { title: "Rocky Linux scan scripts", path: "Choung/log_Rocky9_sh/*", note: "Produces standardized log/JSON results for Rocky account, file, log, and service checks. This is the strongest code evidence for OS-specific security automation." },
        { title: "Ubuntu scan scripts", path: "Choung/log_Ubuntu_sh/*", note: "Applies the same ISMS-P check criteria to Ubuntu environments. This shows how the automation structure was adapted across operating systems." },
        { title: "Scanner entrypoint", path: "Choung/scanner.sh", note: "Groups and runs the diagnosis scripts. It is the bridge between individual checks and the dashboard/DB ingestion story." }
      ],
      safeDisclosureNotes: [
        "Do not publish server IPs, accounts, real operating paths, or raw sensitive logs.",
        "Explain diagnosis items as defensive automation based on KISA/critical infrastructure security standards.",
        "Show remediation scripts around decision criteria, log standardization, and operational separation rather than risky commands."
      ]
    },
    "cloud-ev-security": {
      labels: {
        section: "Case Summary",
        goal: "Problem / Goal",
        role: "My Role",
        points: "Implementation Points",
        evidence: "Evidence",
        code: "Public Code Candidates",
        disclosure: "Disclosure Rules"
      },
      caseStudy: {
        goal:
          "The goal was to detect IoT/cloud threats against EV charging infrastructure using MITRE ATT&CK and provide automated response plus operational visibility through an AWS event pipeline.",
        role:
          "Served as PM while contributing to architecture design, Terraform infrastructure, MITRE ATT&CK response code design, and dashboard implementation.",
        points: [
          "Designed the event pipeline connecting AWS IoT Core, GuardDuty, EventBridge, and Lambda",
          "Mapped T0855, T0839, T1499, T1078, T1548, and T1565 to detection and response scenarios",
          "Used DynamoDB, CloudWatch, and CloudTrail for event history, response results, and audit traceability",
          "Structured IoT, Lambda, EventBridge, GuardDuty, and Monitoring infrastructure as Terraform modules"
        ]
      },
      evidenceAssets: [
        { title: "AEGIS architecture", source: "Selected image", status: "Used in star detail area" },
        { title: "Dashboard metrics", source: "Selected image", status: "Used in star detail area" },
        { title: "Observability and audit structure", source: "Terraform/storage code based", status: "Explained as code cards in the star detail area" },
        { title: "Terraform/Lambda key code", source: "Local source verified", status: "Used as star-level code cards" },
        { title: "Demo video", source: "Existing demo video", status: "To be moved to an external video server" }
      ],
      codeHighlights: [
        { title: "Threat response handler", path: "lambda/handler.py", note: "Routes detection events into response logic by attack type. This is the main code card for automated defensive response such as isolation, blocking, and evidence logging." },
        { title: "Simulation and stats APIs", path: "lambda/simulate_handler.py / lambda/stats_handler.py", note: "Supports dashboard simulation and event statistics. This explains how detection and response results become visible to operators." },
        { title: "EV charger simulator", path: "simulator/charger.py", note: "Recreates EV charger behavior through MQTT messages. It shows how normal events and detection-target events were separated for testing." },
        { title: "Terraform modules", path: "terraform/modules/*", note: "Defines IoT, Lambda, EventBridge, GuardDuty, DynamoDB, and Monitoring as reusable infrastructure modules. This is the evidence for reproducible cloud security architecture." }
      ],
      safeDisclosureNotes: [
        "Do not publish AWS account data, certificates, Slack Webhook values, or Terraform variable originals.",
        "Explain attack scenarios through MITRE ATT&CK IDs, detection goals, and response effects.",
        "Use only masked slides or reproducible screenshots for real cloud identifiers and logs."
      ]
    },
    "pentest-web": {
      labels: {
        section: "Case Summary",
        goal: "Problem / Goal",
        role: "My Role",
        points: "Assessment Points",
        evidence: "Evidence",
        code: "Public Code Candidates",
        findings: "Representative Findings",
        disclosure: "Disclosure Rules"
      },
      caseStudy: {
        goal:
          "The goal was to build a realistic intranet testbed, assess 21 web vulnerability categories, and document impact plus remediation from a defensive perspective.",
        role:
          "Owned AWS infrastructure setup, Spring Boot Backend API work, approval/payslip assessment and result analysis, and demo video production.",
        points: [
          "Assessed a Spring Boot business system with login, approvals, payslips, documents, and admin features",
          "Checked object-level authorization, session behavior, cookies, CORS, and security headers in role-based flows",
          "Converted findings into root cause, impact, remediation guidance, and verification criteria",
          "For the public portfolio, excluded exploit request details and raw API combinations while keeping masked evidence and remediation-focused wording"
        ]
      },
      representativeFindings: {
        summary: "The team assessed 21 web vulnerability categories based on KISA guidance; this portfolio details five representative items defensively.",
        items: [
          { name: "Authentication / Authorization", impact: "Checked whether privileged functions and object access were properly restricted server-side", remediation: "Strengthen session-user based authorization and object ownership checks" },
          { name: "File access / Download", impact: "Reviewed sensitive data exposure risks around documents and attachments", remediation: "Add department/owner authorization and remove storage path exposure" },
          { name: "Stored XSS", impact: "User input rendered as HTML can impact privileged browsers", remediation: "Apply output encoding, use textContent, and add Sanitizer/CSP where HTML is allowed" },
          { name: "SQL Injection risk", impact: "Reviewed whether inputs could influence query structure through errors and search flows", remediation: "Use parameter binding, separate dynamic conditions, and whitelist validation" },
          { name: "CSRF / Headers / Cookies", impact: "Weak browser security settings can amplify other vulnerabilities", remediation: "Apply CSRF tokens, SameSite/Secure/HttpOnly, and security headers" }
        ]
      },
      evidenceAssets: [
        { title: "21 web vulnerability categories", source: "Report summary based", status: "Publishes only scope and remediation criteria, not exploitation steps" },
        { title: "Approval / payslip assessment", source: "Local source verified", status: "Covered through code cards instead of an image" },
        { title: "Security configuration review", source: "Spring Boot config code", status: "Explained through CORS, cookie, and header remediation criteria" },
        { title: "Report-writing evidence", source: "Masked outline/summary only", status: "Original report and sensitive samples stay private" },
        { title: "Demo video", source: "Existing demo video", status: "To be moved to an external video server" }
      ],
      codeHighlights: [
        { title: "Authentication flow", path: "AuthController.java / AuthService.java", note: "Shows login and session handling. The portfolio explanation focuses on server-side authentication policy and verification criteria, not bypass reproduction." },
        { title: "Approval and payslip APIs", path: "Approval* / Payslip* controller-service", note: "Shows authorization flow for approval and payslip features. This card should focus on role checks and resource ownership validation." },
        { title: "Document access flow", path: "DocumentController.java / DocumentService.java", note: "Explains document access control and download handling. Sensitive paths and sample filenames stay private while the access-control design is described." },
        { title: "Browser security config", path: "LocalCorsConfig.java", note: "Covers CORS, cookie, and security header settings. This card frames browser security as remediation criteria for production-like systems." },
        { title: "Assessment report summary", path: "Doc/blackbox-pentest-report-2026-04-24-ko.md", note: "Use only item categories, impact, and remediation criteria. Sensitive APIs and exploit request details must not be published." }
      ],
      safeDisclosureNotes: [
        "Do not publish raw API path plus exploit request detail combinations, executable samples, payroll/tax/server access samples, or document sample originals.",
        "Do not expose real accounts, session cookies, internal IPs, storage paths, or raw logs.",
        "Explain vulnerabilities through root cause, impact, and defensive remediation, not exploit steps.",
        "Report images should be limited to outlines, summary tables, and masked results."
      ]
    }
  }
};

export function getProjectDetail(projectId, language) {
  return projectDetails[language]?.[projectId] ?? null;
}
