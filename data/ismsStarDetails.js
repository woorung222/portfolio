const ismsStarDetails = {
  ko: {
    labels: {
      role: "내 역할 / 설명 포인트",
      detail: "상세 설명",
      evidence: "관련 증빙",
      code: "주요 코드",
      selected: "선택한 별",
      common: "프로젝트 공통 정보",
      numberGuide: "운영 포인트",
      codeFocus: "핵심 부분",
      codeRole: "역할",
      codeSummary: "코드 요약",
      codeExplanation: "설명 포인트"
    },
    stars: {
      architecture: {
        summary:
          "Control Node, Scan Node, Ansible, PostgreSQL, Streamlit이 이어지는 전체 보안 자동화 구조다.",
        role:
          "진단 실행, 결과 저장, 대시보드 조회가 한 흐름으로 보이도록 시스템 구조와 데이터 흐름을 정리했다.",
        detail:
          "시스템 아키텍처 별은 ISMS-P 자동화 프로젝트의 큰 흐름을 설명한다. 점검 대상 서버는 Scan Node로 두고, Control Node에서 Ansible과 Python이 진단/조치 작업을 실행한다. 결과는 PostgreSQL에 적재되고 Streamlit 대시보드에서 조회·시각화된다. 포트폴리오에서는 실제 서버 주소나 계정 대신 각 구성요소의 역할과 책임 경계만 보여준다.",
        evidence: [
          {
            title: "시스템 아키텍처",
            src: "/projects/isms-automation/evidence/dashboard-overview.png",
            alt: "ISMS-P 자동 진단 시스템 아키텍처",
            caption:
              "Control Node, Scan Node, Ansible, PostgreSQL, Streamlit 대시보드가 연결되는 전체 구조",
            fit: "natural"
          }
        ],
        code: [
          {
            title: "대시보드 진입 구조",
            path: "dashboard/app.py",
            focus: "main()",
            role: "로그인 이후 대시보드, 점검, 조치, 수동 검토, 보고서 화면을 라우팅한다.",
            summary:
              "Streamlit 세션 상태를 기준으로 운영 화면을 나누고, 점검 결과와 조치 기능을 한 콘솔에서 다룬다.",
            explanation:
              "단순 스크립트 묶음이 아니라 운영자가 반복해서 쓸 수 있는 보안 운영 화면으로 구성했다는 점을 설명한다."
          },
          {
            title: "자동화 실행 경계",
            path: "dashboard/app.py",
            focus: "run_ansible_simple(...)",
            role: "대시보드에서 선택한 자산과 항목을 Ansible 실행 흐름으로 연결한다.",
            summary:
              "사용자 선택값을 자동화 실행 입력으로 넘기고, 실행 결과를 화면과 감사 로그에서 추적할 수 있게 정리한다.",
            explanation:
              "실행 명령 원문보다 대시보드와 자동화 엔진 사이의 책임 분리를 중심으로 설명한다."
          },
          {
            title: "DB 연결 계층",
            path: "dashboard/app.py",
            focus: "get_db_connection()",
            role: "진단 결과, 조치 결과, 대시보드 로그를 조회·저장하는 DB 접점을 모은다.",
            summary:
              "대시보드의 조회 기능이 파일 파싱에만 의존하지 않고 중앙 DB를 통해 최신 상태를 읽는 구조다.",
            explanation:
              "접속정보 원문은 공개하지 않고, DB 기반 운영 가시성 확보라는 설계 의도만 보여준다."
          }
        ]
      },
      scan: {
        summary:
          "Ubuntu와 Rocky Linux 환경별 스크립트로 계정, 파일, 로그, 패치, 서비스 항목을 자동 진단한다.",
        role:
          "OS별 점검 스크립트 묶음과 통합 실행 흐름을 정리해 ISMS-P 점검 기준을 자동화했다.",
        detail:
          "자동 진단 별은 수동 체크리스트를 반복 가능한 스크립트 실행 구조로 바꾼 영역이다. Rocky Linux와 Ubuntu 계열을 나누고, 각 점검 항목은 독립 스크립트로 관리한다. 포트폴리오에서는 위험한 명령이나 실제 서버 결과가 아니라, 항목별 진단 기준과 결과 표준화 흐름을 중심으로 설명한다.",
        evidence: [],
        code: [
          {
            title: "통합 점검 진입점",
            path: "Choung/scanner.sh",
            focus: "script discovery and sequential execution",
            role: "점검 스크립트 목록을 수집하고 순차 실행해 하나의 진단 결과로 묶는다.",
            summary:
              "개별 항목 스크립트를 직접 하나씩 실행하는 방식에서 벗어나, 통합 실행 흐름으로 반복 점검을 단순화한다.",
            explanation:
              "점검 자동화의 시작점으로, 수동 운영을 줄이는 효과를 가장 직관적으로 설명할 수 있다."
          },
          {
            title: "Rocky Linux 점검 스크립트",
            path: "Choung/log_Rocky9_sh/Rocky_U_*.sh",
            focus: "U_01~U_67 item checks",
            role: "Rocky Linux 환경의 계정, 파일, 로그, 패치, 서비스 점검 항목을 실행한다.",
            summary:
              "OS별 차이를 반영해 같은 보안 기준을 Rocky Linux 환경에 맞게 적용한다.",
            explanation:
              "단일 OS 데모가 아니라 여러 Linux 환경을 고려했다는 점을 보여주는 코드 카드다."
          },
          {
            title: "Ubuntu 점검 스크립트",
            path: "Choung/log_Ubuntu_sh/Ubuntu_U_*.sh",
            focus: "Ubuntu-specific item checks",
            role: "Ubuntu 환경에서 동일한 ISMS-P 항목을 실행 가능한 진단 스크립트로 구성한다.",
            summary:
              "같은 점검 기준을 OS별 명령과 파일 구조에 맞춰 분기한 구현이다.",
            explanation:
              "OS별 자동화 분기와 유지보수성을 함께 설명하기 좋은 코드 근거다."
          }
        ]
      },
      loggingDb: {
        summary:
          "진단 결과를 JSONL 로그와 DB 레코드로 표준화해 최신 상태 조회와 보고서 생성을 가능하게 한다.",
        role:
          "로그 포맷, DB 적재 기준, 최신 진단 결과 조회 흐름을 연결해 운영자가 결과를 추적할 수 있게 정리했다.",
        detail:
          "결과 표준화·DB 적재 별은 진단 실행 이후의 데이터를 다룬다. 각 스크립트는 항목 ID, 진단 근거, 상태를 일관된 형태로 남기고, 대시보드는 audit 스키마에서 최신 진단·조치 결과를 조회한다. 실제 로그 원문과 운영 경로는 공개하지 않고, 표준화된 필드와 조회 구조만 설명한다.",
        evidence: [
          {
            title: "audit DB 구조",
            src: "/projects/isms-automation/evidence/diagnosis-history.png",
            alt: "ISMS-P audit 데이터베이스 구조",
            caption:
              "audit.guides, audit.hosts, audit.scans, remedy 테이블을 통해 점검 기준·대상·결과·조치 이력을 연결",
            fit: "natural"
          }
        ],
        code: [
          {
            title: "공통 JSONL 로깅",
            path: "common_logging.sh",
            focus: "log_cmd(...), log_result(...)",
            role: "진단 명령과 결과 근거를 항목 ID와 함께 JSONL 형태로 남긴다.",
            summary:
              "스크립트마다 다른 출력 형식을 쓰지 않고, 대시보드와 보고서가 읽을 수 있는 공통 로그 구조를 만든다.",
            explanation:
              "자동화에서 중요한 것은 실행보다 결과를 다시 해석할 수 있게 남기는 것이라는 점을 보여준다."
          },
          {
            title: "최신 진단 조회",
            path: "dashboard/app.py",
            focus: "fetch_data(...)",
            role: "DB에 누적된 이력 중 자산·항목 기준 최신 진단 결과를 대시보드용 데이터로 정규화한다.",
            summary:
              "이력은 누적하되 화면에는 현재 판단에 필요한 최신 결과를 보여주는 조회 흐름이다.",
            explanation:
              "진단 결과 저장과 운영 화면 표시 사이의 데이터 정리 능력을 어필할 수 있다."
          },
          {
            title: "자산별 최신 스캔",
            path: "dashboard/app.py",
            focus: "fetch_latest_scans_for_hosts(...)",
            role: "선택한 자산 묶음의 최신 점검 상태를 조회한다.",
            summary:
              "여러 서버를 대상으로 점검 결과를 비교하고, 자산별 상태 요약을 만들 수 있게 한다.",
            explanation:
              "다중 자산 운영을 고려한 조회 구조라는 점을 설명한다."
          }
        ]
      },
      remediation: {
        summary:
          "자동 조치 가능한 항목만 Ansible로 실행하고, 조치 후 DB 반영과 재점검 상태를 확인한다.",
        role:
          "조치 가능 항목과 수동 검토 항목을 분리하고, 조치 결과가 대시보드에 반영되는 흐름을 검증했다.",
        detail:
          "자동 조치·재점검 별은 진단 결과를 실제 운영 행동으로 연결하는 영역이다. 모든 항목을 무조건 자동 조치하지 않고, 자동화 가능한 항목과 수동 검토가 필요한 항목을 분리한다. 조치 실행 후에는 DB 반영 여부와 재점검 결과를 확인해 운영자가 조치 성공 여부를 판단할 수 있게 했다.",
        evidence: [],
        code: [
          {
            title: "Ansible 조치 실행",
            path: "dashboard/app.py",
            focus: "run_ansible_simple(...)",
            role: "선택된 자산과 항목 정보를 조치 Playbook 실행으로 연결한다.",
            summary:
              "대시보드에서 조치 요청을 받아 자동화 엔진으로 넘기고, 성공 여부와 실행 로그를 사용자에게 반환한다.",
            explanation:
              "실행 명령 자체보다 선택값 검증, 실행 결과 수집, 운영 화면 반영 구조를 중심으로 설명한다."
          },
          {
            title: "조치 결과 반영 트리거",
            path: "dashboard/app.py",
            focus: "_touch_watchdog_files(...)",
            role: "조치 후 결과 파일 갱신을 감지할 수 있도록 후속 적재 흐름을 유도한다.",
            summary:
              "진단/조치 결과가 파일에서 DB로 이어지는 비동기 흐름을 대시보드 조작과 연결한다.",
            explanation:
              "Watchdog 기반 DB 적재와 대시보드 갱신을 연결한 운영 설계 포인트다."
          },
          {
            title: "DB 반영 확인",
            path: "dashboard/app.py",
            focus: "_poll_db_latest_is_vul(...)",
            role: "조치 실행 이후 최신 진단 상태가 DB에 반영됐는지 일정 시간 확인한다.",
            summary:
              "자동 조치가 끝났다는 사실과 실제 취약 상태가 바뀌었는지를 분리해서 확인한다.",
            explanation:
              "보안 자동화에서 조치 실행보다 검증이 중요하다는 점을 보여주는 카드다."
          }
        ]
      },
      dashboard: {
        summary:
          "Streamlit 대시보드에서 이행률, 자산 상태, 상세 진단 결과, 일괄·개별 조치 흐름을 제공한다.",
        role:
          "진단 이력 조회, 상태 시각화, 조치 실행, 결과 확인이 한 화면 흐름으로 이어지도록 대시보드를 구성했다.",
        detail:
          "운영 대시보드 별은 보안 자동화 결과를 사람이 사용할 수 있는 화면으로 바꾼 영역이다. 전체 이행률, 취약 항목 분포, 자산별 상태, 상세 근거, 자동 조치 버튼, 수동 검토 대기열을 분리해 반복 운영에 필요한 동선을 만든다. PDF 22페이지의 Dashboard 캡처를 통해 이행률 카드, 위험도 차트, 카테고리별 취약 항목, 자산 상태 요약이 한 화면에 모이는 구조를 보여준다.",
        evidence: [
          {
            title: "Dashboard 운영 화면",
            src: "/projects/isms-automation/evidence/dashboard-ui.png",
            alt: "ISMS-P Streamlit 운영 대시보드 화면",
            caption:
              "자산 수, 취약률, 고위험 항목, 자동 조치 가능 항목과 위험도/카테고리 차트를 한 화면에서 확인",
            fit: "natural"
          }
        ],
        code: [
          {
            title: "대시보드 데이터 로딩",
            path: "dashboard/app.py",
            focus: "fetch_data(...)",
            role: "점검 결과를 대시보드 표와 차트에서 사용할 수 있는 데이터프레임으로 만든다.",
            summary:
              "최신 진단 결과, 위험도, 자산 상태를 한 화면에서 비교할 수 있게 정리한다.",
            explanation:
              "보안 자동화 결과를 운영자가 읽을 수 있는 정보 구조로 바꾼 코드다."
          },
          {
            title: "상세 근거 표시",
            path: "dashboard/app.py",
            focus: "parse_diagnostic_log(...)",
            role: "선택한 자산과 항목의 진단 근거를 로그에서 찾아 상세 화면에 표시한다.",
            summary:
              "취약 여부만 보여주는 것이 아니라 어떤 근거로 판단했는지 확인할 수 있게 한다.",
            explanation:
              "진단 결과의 설명 가능성과 감사 대응력을 보여주는 포인트다."
          },
          {
            title: "운영 화면 라우팅",
            path: "dashboard/app.py",
            focus: "current_page state",
            role: "대시보드, 자산 점검, 상세 결과, 일괄 조치, 개별 조치, 수동 검토, 보고서 화면을 나눈다.",
            summary:
              "보안 운영자가 반복해서 쓰는 기능을 메뉴 단위로 분리해 화면 복잡도를 낮춘다.",
            explanation:
              "단순 결과 화면이 아니라 운영 흐름을 고려한 도구라는 점을 설명할 수 있다."
          }
        ]
      },
      improvement: {
        summary:
          "반복적인 수동 점검과 분리된 조치·보고 흐름을 자동 진단/조치와 대시보드 운영 흐름으로 개선했다.",
        role:
          "PDF 24페이지의 As-Is/To-Be 흐름을 구현 관점으로 정리해 자동화 전후의 운영 개선점을 설명할 수 있게 구성했다.",
        detail:
          "As-Is / To-Be 별은 프로젝트의 변화량을 보여주는 영역이다. 기존에는 OS별 점검, 결과 확인, 조치, 보고가 서로 분리되어 반복 작업 부담이 컸다. 개선 후에는 Control Node에서 Ansible 기반 진단/조치를 실행하고, Streamlit 대시보드가 결과 조회·시각화·조치·보고서 생성을 이어주는 운영 화면이 된다.",
        comparison: [
          {
            title: "As-Is",
            items: [
              "OS별 수동 점검과 CLI/스크립트 중심 실행에 의존",
              "결과 확인, 조치, 보고서 작성 흐름이 분리되어 반복 작업 발생",
              "운영자가 현재 이행률과 취약 항목 분포를 한눈에 보기 어려움"
            ]
          },
          {
            title: "To-Be",
            items: [
              "Control Node에서 Ansible 기반 자동 진단/조치 실행",
              "Dashboard에서 Pie Chart, List, Action Button으로 상태 확인과 조치 연결",
              "DB 적재, 보고서 생성, 감사 로그를 같은 운영 흐름으로 연결"
            ]
          },
          {
            title: "개선 효과",
            items: [
              "반복 점검과 조치 수행 시간을 줄이고 결과 확인 흐름을 표준화",
              "운영자가 이행률, 고위험 항목, 자산 상태를 빠르게 이해",
              "조치 이후 보고서와 감사 이력까지 이어져 제출·검토에 유리"
            ]
          }
        ],
        evidence: [],
        code: [
          {
            title: "운영 화면 전환 구조",
            path: "dashboard/app.py",
            focus: "current_page state",
            role: "대시보드, 점검 시작, 상세 결과, 일괄/개별 조치, 수동 검토, 보고서 화면을 하나의 운영 흐름으로 나눈다.",
            summary:
              "수동 작업이 흩어져 있던 As-Is 흐름을 메뉴 기반 To-Be 화면 구조로 재구성한다.",
            explanation:
              "단순 자동화 스크립트가 아니라 운영자가 반복해서 사용할 수 있는 보안 도구로 만든 부분이다."
          },
          {
            title: "자동 조치 연결",
            path: "dashboard/app.py",
            focus: "run_ansible_simple(...)",
            role: "대시보드에서 선택한 자산과 점검 항목을 Ansible 조치 실행 흐름으로 연결한다.",
            summary:
              "사용자 선택, 자동화 실행, 실행 결과 확인을 하나의 조치 흐름으로 묶는다.",
            explanation:
              "PDF 24페이지 To-Be의 Control Node 중심 자동 조치 흐름을 코드로 설명할 수 있다."
          },
          {
            title: "보고서·감사 흐름",
            path: "dashboard/app.py",
            focus: "generate_unix_report_excel(...), write_dashboard_log(...)",
            role: "진단/조치 결과를 보고서로 만들고 주요 사용자 행동을 감사 로그로 남긴다.",
            summary:
              "자동화 결과가 화면 확인에서 끝나지 않고 제출 가능한 산출물과 추적 가능한 이력으로 이어진다.",
            explanation:
              "개선 효과를 결과물과 감사 가능성까지 확장해 보여주는 코드 근거다."
          }
        ]
      },
      reportAudit: {
        summary:
          "진단·조치 결과를 Excel 보고서로 만들고, 사용자 행동은 dashboard 로그로 남긴다.",
        role:
          "보고서 생성, 사용자 행동 기록, 권한 기반 운영 이력을 남기는 흐름을 정리했다.",
        detail:
          "리포트·감사 로그 별은 결과를 제출 가능한 산출물과 운영 이력으로 바꾸는 영역이다. 보고서는 최신 진단 결과와 조치 결과를 표 형태로 정리하고, 대시보드 로그는 누가 어떤 기능을 실행했는지 남긴다. 포트폴리오에서는 실제 사용자, 접속 정보, 원본 로그 대신 보고서 생성 구조와 감사 가능성만 보여준다.",
        evidence: [
          {
            title: "dashboard 로그·권한 DB 구조",
            src: "/projects/isms-automation/evidence/report-flow.png",
            alt: "ISMS-P dashboard 사용자와 로그 데이터베이스 구조",
            caption:
              "dashboard.users, roles, actions, logs 구조로 사용자 권한과 주요 작업 이력을 연결",
            fit: "natural"
          }
        ],
        code: [
          {
            title: "UNIX 보고서 생성",
            path: "dashboard/app.py",
            focus: "generate_unix_report_excel(...)",
            role: "진단 결과와 조치 결과를 Excel 보고서 형식으로 정리한다.",
            summary:
              "자산별 시트, 점검 항목, 위험도, 조치 내용, 재검사 결과를 보고서 형태로 구성한다.",
            explanation:
              "자동화 결과를 채용자가 이해하기 쉬운 산출물로 전환한 부분이다."
          },
          {
            title: "전체 자산 보고서",
            path: "dashboard/app.py",
            focus: "generate_unix_report_excel_all_hosts(...)",
            role: "등록된 UNIX 계열 자산 전체를 대상으로 보고서 생성을 호출한다.",
            summary:
              "단일 서버 결과가 아니라 여러 자산의 점검 현황을 하나의 보고서 흐름으로 묶는다.",
            explanation:
              "운영 범위를 여러 서버로 확장할 수 있는 구조를 보여준다."
          },
          {
            title: "대시보드 감사 로그",
            path: "dashboard/app.py",
            focus: "write_dashboard_log(...)",
            role: "로그인, 점검, 조치, 보고서 생성 같은 주요 사용자 행동을 기록한다.",
            summary:
              "대시보드 사용 이력을 DB에 남겨 사후 추적과 운영 감사가 가능하게 한다.",
            explanation:
              "보안 도구 자체도 감사 가능해야 한다는 관점으로 설명할 수 있다."
          }
        ]
      }
    }
  },
  en: {
    labels: {
      role: "My role / explanation points",
      detail: "Details",
      evidence: "Evidence",
      code: "Key code",
      selected: "Selected star",
      common: "Project common information",
      numberGuide: "Operational points",
      codeFocus: "Key part",
      codeRole: "Role",
      codeSummary: "Code summary",
      codeExplanation: "Explanation point"
    },
    stars: {
      architecture: {
        summary:
          "The end-to-end automation structure connecting Control Node, Scan Node, Ansible, PostgreSQL, and Streamlit.",
        role:
          "Organized the system and data flow so diagnosis, result storage, and dashboard lookup read as one operation path.",
        detail:
          "This star explains the overall ISMS-P automation architecture. Scan Nodes represent target servers, while the Control Node runs diagnosis and remediation through Ansible and Python. Results are stored in PostgreSQL and visualized in Streamlit. The portfolio describes component responsibilities rather than real server addresses or accounts.",
        evidence: [
          {
            title: "System architecture",
            src: "/projects/isms-automation/evidence/dashboard-overview.png",
            alt: "ISMS-P automation system architecture",
            caption:
              "Overall structure connecting Control Node, Scan Node, Ansible, PostgreSQL, and Streamlit dashboard",
            fit: "natural"
          }
        ],
        code: [
          {
            title: "Dashboard entry structure",
            path: "dashboard/app.py",
            focus: "main()",
            role: "Routes users across dashboard, audit, remediation, manual review, and report screens after login.",
            summary:
              "Uses Streamlit session state to separate operational screens and keep diagnosis/remediation in one console.",
            explanation:
              "Shows that the project is an operational security tool, not only a bundle of scripts."
          },
          {
            title: "Automation execution boundary",
            path: "dashboard/app.py",
            focus: "run_ansible_simple(...)",
            role: "Connects selected assets and checklist items from the dashboard to the Ansible execution flow.",
            summary:
              "Passes sanitized operation context into automation and returns execution results for review.",
            explanation:
              "Explains the boundary between UI intent and automation engine without publishing raw commands."
          },
          {
            title: "DB connection layer",
            path: "dashboard/app.py",
            focus: "get_db_connection()",
            role: "Centralizes access to diagnosis, remediation, and dashboard audit records.",
            summary:
              "The dashboard reads current state through a central DB instead of relying only on file parsing.",
            explanation:
              "Keeps connection secrets private while explaining DB-backed operational visibility."
          }
        ]
      },
      scan: {
        summary:
          "Runs Ubuntu and Rocky Linux scripts for account, file, log, patch, and service checks.",
        role:
          "Structured OS-specific check script groups and the integrated execution flow for ISMS-P automation.",
        detail:
          "This star turns manual checklist work into repeatable script execution. Rocky Linux and Ubuntu are separated, and each checklist item is managed as an independent script. The portfolio focuses on check criteria and result standardization, not risky commands or real server output.",
        evidence: [],
        code: [
          {
            title: "Integrated scan entrypoint",
            path: "Choung/scanner.sh",
            focus: "script discovery and sequential execution",
            role: "Collects check scripts and runs them as one diagnosis flow.",
            summary:
              "Reduces repeated manual operation by grouping item scripts into a single execution path.",
            explanation:
              "A clear entrypoint for explaining how the automation begins."
          },
          {
            title: "Rocky Linux check scripts",
            path: "Choung/log_Rocky9_sh/Rocky_U_*.sh",
            focus: "U_01~U_67 item checks",
            role: "Runs account, file, log, patch, and service checks for Rocky Linux.",
            summary:
              "Applies the same security baseline while accounting for Rocky Linux differences.",
            explanation:
              "Shows multi-Linux support rather than a single-environment demo."
          },
          {
            title: "Ubuntu check scripts",
            path: "Choung/log_Ubuntu_sh/Ubuntu_U_*.sh",
            focus: "Ubuntu-specific item checks",
            role: "Implements the same ISMS-P checklist items for Ubuntu targets.",
            summary:
              "Branches implementation by OS while keeping the checklist model consistent.",
            explanation:
              "Good evidence for OS-specific automation and maintainability."
          }
        ]
      },
      loggingDb: {
        summary:
          "Standardizes diagnosis output as JSONL logs and DB records for latest-state lookup and reporting.",
        role:
          "Connected log format, DB ingestion criteria, and latest diagnosis lookup into one traceable flow.",
        detail:
          "This star covers the data after diagnosis execution. Scripts emit item id, basis, and status in a consistent shape, while the dashboard queries the audit schema for current diagnosis and remediation state. Raw logs and operational paths are excluded; only the normalized fields and query structure are explained.",
        evidence: [
          {
            title: "audit DB structure",
            src: "/projects/isms-automation/evidence/diagnosis-history.png",
            alt: "ISMS-P audit database structure",
            caption:
              "Connects guides, hosts, scans, and remediation records for checklist criteria, target assets, and results",
            fit: "natural"
          }
        ],
        code: [
          {
            title: "Shared JSONL logging",
            path: "common_logging.sh",
            focus: "log_cmd(...), log_result(...)",
            role: "Records command context and result basis with checklist item ids.",
            summary:
              "Avoids one-off output formats and gives the dashboard/report layer a consistent log shape.",
            explanation:
              "Shows that automation results were designed to be interpreted later."
          },
          {
            title: "Latest diagnosis lookup",
            path: "dashboard/app.py",
            focus: "fetch_data(...)",
            role: "Normalizes accumulated DB history into current dashboard state by asset and item.",
            summary:
              "Keeps history in storage while showing the latest relevant result in the UI.",
            explanation:
              "Demonstrates data modeling between security checks and operations UI."
          },
          {
            title: "Latest scans by asset",
            path: "dashboard/app.py",
            focus: "fetch_latest_scans_for_hosts(...)",
            role: "Loads latest check state for a selected group of assets.",
            summary:
              "Enables multi-host comparison and asset-level summaries.",
            explanation:
              "Shows the project was built for operating multiple targets."
          }
        ]
      },
      remediation: {
        summary:
          "Runs Ansible remediation only for automatable items, then verifies DB reflection and re-check state.",
        role:
          "Separated automatable and manual-review items, then verified that remediation results reached the dashboard.",
        detail:
          "This star connects diagnosis results to operational action. Not every issue is auto-remediated; risky or ambiguous items are separated into manual review. After remediation, the dashboard checks DB reflection and re-check state so operators can tell whether the issue actually changed.",
        evidence: [],
        code: [
          {
            title: "Ansible remediation execution",
            path: "dashboard/app.py",
            focus: "run_ansible_simple(...)",
            role: "Connects selected asset and item context to remediation Playbook execution.",
            summary:
              "Receives dashboard intent, triggers automation, and returns execution status to the operator.",
            explanation:
              "Focuses on validation, result collection, and UI reflection rather than raw command strings."
          },
          {
            title: "Result refresh trigger",
            path: "dashboard/app.py",
            focus: "_touch_watchdog_files(...)",
            role: "Nudges the follow-up ingestion flow after scan/remediation output changes.",
            summary:
              "Connects dashboard action to the asynchronous file-to-DB update path.",
            explanation:
              "Shows how Watchdog-based ingestion and dashboard refresh are connected."
          },
          {
            title: "DB reflection check",
            path: "dashboard/app.py",
            focus: "_poll_db_latest_is_vul(...)",
            role: "Checks whether the latest DB state reflects the remediation result.",
            summary:
              "Separates command completion from actual vulnerability-state verification.",
            explanation:
              "Good evidence that the automation values validation after action."
          }
        ]
      },
      dashboard: {
        summary:
          "Streamlit dashboard for fulfillment rate, asset state, detailed findings, and batch/individual remediation.",
        role:
          "Built the dashboard flow for diagnosis history lookup, visualization, remediation, and result review.",
        detail:
          "This star turns automation output into an operator-friendly interface. It separates fulfillment rate, vulnerable item distribution, asset state, detailed evidence, automatic remediation, and manual review queue. The Dashboard capture from PDF page 22 shows fulfillment cards, risk charts, category counts, and asset status in one operating screen.",
        evidence: [
          {
            title: "Dashboard operating screen",
            src: "/projects/isms-automation/evidence/dashboard-ui.png",
            alt: "ISMS-P Streamlit operations dashboard screen",
            caption:
              "Shows assets, vulnerability rate, high-risk items, auto-remediable count, risk distribution, and category charts in one screen",
            fit: "natural"
          }
        ],
        code: [
          {
            title: "Dashboard data loading",
            path: "dashboard/app.py",
            focus: "fetch_data(...)",
            role: "Builds the DataFrame used by dashboard tables and charts.",
            summary:
              "Organizes latest diagnosis result, risk level, and asset state for comparison.",
            explanation:
              "Converts security automation output into information operators can read."
          },
          {
            title: "Detailed evidence display",
            path: "dashboard/app.py",
            focus: "parse_diagnostic_log(...)",
            role: "Finds diagnosis evidence for the selected asset and checklist item.",
            summary:
              "Shows not only vulnerable/non-vulnerable state but the basis behind the judgment.",
            explanation:
              "Supports explainability and audit readiness."
          },
          {
            title: "Operational navigation",
            path: "dashboard/app.py",
            focus: "current_page state",
            role: "Separates dashboard, start audit, detailed results, batch remediation, individual remediation, manual review, and reports.",
            summary:
              "Keeps repeated operator workflows organized by screen.",
            explanation:
              "Shows the tool was designed around real operational use."
          }
        ]
      },
      improvement: {
        summary:
          "Improves repetitive manual checks and separated remediation/reporting into automated diagnosis, remediation, and dashboard operations.",
        role:
          "Reframed the PDF page 24 As-Is/To-Be flow as implementation evidence for operational improvement.",
        detail:
          "The As-Is / To-Be star explains the amount of change delivered by the project. Before automation, OS-specific checks, result review, remediation, and reporting were separate repetitive tasks. After the improvement, the Control Node runs Ansible-based diagnosis and remediation, while the Streamlit dashboard connects lookup, visualization, action, and report generation.",
        comparison: [
          {
            title: "As-Is",
            items: [
              "Relied on OS-specific manual checks and CLI/script-centered execution",
              "Result review, remediation, and reporting were separated into repeated work",
              "Operators could not quickly see fulfillment rate or vulnerable item distribution"
            ]
          },
          {
            title: "To-Be",
            items: [
              "Control Node runs Ansible-based automated diagnosis and remediation",
              "Dashboard connects status review and action through charts, lists, and buttons",
              "DB storage, report generation, and audit logs are tied into one operation flow"
            ]
          },
          {
            title: "Impact",
            items: [
              "Reduces repeated checking/remediation work and standardizes result review",
              "Helps operators understand fulfillment rate, high-risk items, and asset state quickly",
              "Carries results into reports and audit history for submission and review"
            ]
          }
        ],
        evidence: [],
        code: [
          {
            title: "Operational navigation structure",
            path: "dashboard/app.py",
            focus: "current_page state",
            role: "Splits dashboard, start audit, detailed results, batch/individual remediation, manual review, and report screens into one workflow.",
            summary:
              "Turns the fragmented As-Is workflow into a menu-based To-Be operating interface.",
            explanation:
              "Shows this was built as a reusable security operations tool, not only as scripts."
          },
          {
            title: "Automated remediation bridge",
            path: "dashboard/app.py",
            focus: "run_ansible_simple(...)",
            role: "Connects selected assets and checklist items from the dashboard to Ansible remediation execution.",
            summary:
              "Links operator selection, automation execution, and result checking into one remediation flow.",
            explanation:
              "Maps directly to the Control Node-centered To-Be automation flow from PDF page 24."
          },
          {
            title: "Report and audit flow",
            path: "dashboard/app.py",
            focus: "generate_unix_report_excel(...), write_dashboard_log(...)",
            role: "Turns diagnosis/remediation output into reports and records key user actions as audit logs.",
            summary:
              "Carries automation results beyond the screen into deliverables and traceable history.",
            explanation:
              "Shows the improvement includes auditability and submission-ready output."
          }
        ]
      },
      reportAudit: {
        summary:
          "Turns diagnosis/remediation results into Excel reports and records user actions as dashboard audit logs.",
        role:
          "Organized report generation, user action logging, and role-based operation history.",
        detail:
          "This star converts results into deliverables and audit history. Reports summarize current diagnosis and remediation state, while dashboard logs record key user actions. The portfolio excludes real users, access details, and raw logs, and focuses on report structure and auditability.",
        evidence: [
          {
            title: "dashboard log and role DB structure",
            src: "/projects/isms-automation/evidence/report-flow.png",
            alt: "ISMS-P dashboard user and log database structure",
            caption:
              "Connects users, roles, actions, and logs for authorization context and operational audit history",
            fit: "natural"
          }
        ],
        code: [
          {
            title: "UNIX report generation",
            path: "dashboard/app.py",
            focus: "generate_unix_report_excel(...)",
            role: "Formats diagnosis and remediation results into an Excel report.",
            summary:
              "Builds asset sheets with checklist item, risk level, remediation content, and re-check results.",
            explanation:
              "Turns automation output into a submission-friendly deliverable."
          },
          {
            title: "All-host report entrypoint",
            path: "dashboard/app.py",
            focus: "generate_unix_report_excel_all_hosts(...)",
            role: "Calls report generation across registered UNIX-like assets.",
            summary:
              "Groups multiple asset results into one report flow.",
            explanation:
              "Shows the reporting path scales beyond a single server."
          },
          {
            title: "Dashboard audit log",
            path: "dashboard/app.py",
            focus: "write_dashboard_log(...)",
            role: "Records key actions such as audit, remediation, and report generation.",
            summary:
              "Stores dashboard activity so operations can be reviewed later.",
            explanation:
              "Frames the dashboard itself as an auditable security tool."
          }
        ]
      }
    }
  }
};

export function getIsmsStarDetail(starId, language) {
  const localized = ismsStarDetails[language] ?? ismsStarDetails.ko;
  const fallback = ismsStarDetails.ko;

  return {
    labels: localized.labels ?? fallback.labels,
    detail: localized.stars[starId] ?? fallback.stars[starId] ?? null
  };
}
