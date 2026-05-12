const aegisStarDetails = {
  ko: {
    labels: {
      role: "내 역할 / 설명 포인트",
      detail: "상세 설명",
      evidence: "관련 증빙",
      code: "주요 코드",
      selected: "선택한 별",
      common: "프로젝트 공통 정보",
      numberGuide: "번호 해설",
      codeFocus: "핵심 부분",
      codeRole: "역할",
      codeSummary: "코드 요약",
      codeExplanation: "설명 포인트"
    },
    stars: {
      guardduty: {
        summary:
          "GuardDuty와 IoT Rule에서 들어온 탐지 신호를 MITRE ATT&CK 기준으로 정규화하는 탐지 시작점이다.",
        role:
          "탐지-대응 기준을 통일해 T0855/T0839/T1499/T1078/T1548/T1565 시나리오가 코드와 대시보드에서 같은 의미로 읽히도록 정리했다.",
        detail:
          "GuardDuty 자체는 클라우드 계정/권한 이상 징후를 탐지하고, IoT Rule은 MQTT 토픽에서 충전기 이상 이벤트를 탐지한다. AEGIS에서는 두 출처의 이벤트를 Lambda에서 동일한 MITRE 코드 체계로 변환해 이후 대응 로직이 같은 인터페이스로 동작하게 만들었다.",
        evidence: [],
        code: [
          {
            title: "GuardDuty Finding → MITRE 매핑",
            path: "lambda/handler.py",
            focus: "GUARDDUTY_TO_MITRE",
            role: "GuardDuty detail.type을 T1078/T1548 계열 공격 코드 후보로 변환한다.",
            summary:
              "클라우드 계정 탈취, 권한 상승, 노출 자격 증명 같은 Finding을 대응 가능한 MITRE 코드로 묶어 Lambda 대응 분기와 대시보드 표기가 같은 기준을 쓰게 한다.",
            explanation:
              "단순히 GuardDuty를 켠 것이 아니라, 탐지 결과를 서비스 내부 이벤트 모델로 바꾸는 매핑 계층을 만들었다는 점을 설명할 수 있다."
          },
          {
            title: "탐지 유형 결정",
            path: "lambda/handler.py",
            focus: "detect_attack_type(event, detail)",
            role: "IoT Rule이 넣은 detected_attack_type을 우선 읽고, 없으면 GuardDuty Finding을 매핑한다.",
            summary:
              "IoT 기반 공격과 클라우드 계정 기반 공격을 한 함수에서 표준 공격 유형으로 결정한다.",
            explanation:
              "서로 다른 이벤트 소스를 하나의 대응 파이프라인으로 합친 설계 포인트다."
          },
          {
            title: "GuardDuty 활성화 IaC",
            path: "terraform/modules/guardduty/main.tf",
            focus: "aws_guardduty_detector.aegis",
            role: "GuardDuty detector를 Terraform으로 활성화한다.",
            summary:
              "탐지 서비스를 콘솔 수동 설정이 아니라 재현 가능한 인프라 코드로 관리한다.",
            explanation:
              "보안 탐지 구성도 배포 가능한 코드로 관리했다는 인프라 역량을 보여준다."
          }
        ]
      },
      eventbridge: {
        summary:
          "IoT Core부터 GuardDuty, EventBridge, Lambda, 저장소와 알림까지 이어지는 전체 아키텍처 흐름이다.",
        role:
          "아키텍처와 Terraform 모듈 경계를 설계해 탐지, 이벤트 라우팅, 자동 대응, 저장, 대시보드가 한 흐름으로 이어지게 했다.",
        detail:
          "이 별은 단일 AWS 서비스 설명이 아니라 AEGIS 전체 구조를 보여주는 자리다. Python 충전기 시뮬레이터에서 발생한 MQTT 이벤트와 GuardDuty Finding이 EventBridge/Lambda로 들어오고, 대응 결과가 DynamoDB, CloudWatch, API Gateway, Dashboard, Slack으로 이어지는 흐름을 설명한다.",
        evidence: [
          {
            title: "AEGIS 전체 아키텍처",
            src: "/projects/cloud-ev-security/evidence/architecture.png",
            alt: "AEGIS AWS IoT 보안 자동화 아키텍처",
            caption:
              "Python 충전기 시뮬레이터, AWS IoT Core, GuardDuty, EventBridge, Lambda, DynamoDB, CloudWatch, API Gateway, Dashboard, Slack 알림이 연결된 전체 구조"
          }
        ],
        code: [
          {
            title: "GuardDuty 이벤트 라우팅",
            path: "terraform/modules/eventbridge/main.tf",
            focus: "aws_cloudwatch_event_rule.guardduty",
            role: "source가 aws.guardduty인 Finding 이벤트만 잡도록 EventBridge Rule을 정의한다.",
            summary:
              "보안 탐지 이벤트를 Lambda 대응 함수의 입력으로 보내는 라우팅 조건이다.",
            explanation:
              "탐지와 대응 사이를 이벤트 기반으로 연결한 인프라 설계 지점이다."
          },
          {
            title: "Lambda Target 연결",
            path: "terraform/modules/eventbridge/main.tf",
            focus: "aws_cloudwatch_event_target.lambda",
            role: "GuardDuty Rule의 target을 AEGIS 대응 Lambda ARN으로 연결한다.",
            summary:
              "Finding 발생 이후 대응 함수가 자동 실행되도록 만든다.",
            explanation:
              "수동 확인이 아니라 이벤트 발생 즉시 대응 로직으로 진입하게 만든 부분이다."
          },
          {
            title: "루트 모듈 연결",
            path: "terraform/main.tf",
            focus: "module.guardduty → module.lambda → module.eventbridge",
            role: "GuardDuty detector ID와 Lambda ARN을 모듈 간 입력으로 전달한다.",
            summary:
              "각 AWS 서비스를 독립 모듈로 두면서도 전체 파이프라인이 배포되도록 조립한다.",
            explanation:
              "PM/아키텍처 역할로 모듈 경계를 잡고 병렬 작업 가능한 구조를 설계했다는 포인트다."
          }
        ]
      },
      lambda: {
        summary:
          "탐지된 공격 유형을 자동 대응, 기록, 지표, 알림으로 연결하는 핵심 백엔드 함수다.",
        role:
          "MITRE 코드 설계와 Lambda 대응 흐름을 정리해 탐지, 대응, 증거 저장, 알림이 한 함수 흐름에서 이어지도록 구성했다.",
        detail:
          "Lambda는 AEGIS의 대응 엔진이다. 이벤트를 받아 공격 유형을 결정하고, 유형별 대응을 수행한 뒤 DynamoDB 저장, CloudWatch Metric 기록, Slack 알림까지 처리한다. 포트폴리오에서는 공격 절차보다 방어 자동화와 운영 증거 흐름을 중심으로 설명한다.",
        evidence: [],
        code: [
          {
            title: "Lambda 진입 흐름",
            path: "lambda/handler.py",
            focus: "lambda_handler(event, context)",
            role: "event/detail을 정리하고 attack_type, severity, region을 뽑아 전체 대응 흐름을 실행한다.",
            summary:
              "detect_attack_type → dispatch → record_metric → notify_slack → save_to_dynamo 순서로 탐지 결과를 처리한다.",
            explanation:
              "AEGIS의 전체 백엔드 흐름을 한눈에 설명할 수 있는 메인 함수다."
          },
          {
            title: "공격 유형별 대응 분기",
            path: "lambda/handler.py",
            focus: "dispatch(attack_type, event, detail)",
            role: "T0855, T0839, T1499, T1078, T1548, T1565 계열별 대응을 분기한다.",
            summary:
              "충전 제어 차단, 인증서 상태 변경, 펌웨어 차단, 계정 접근키 비활성화, 증거 보존 같은 대응 결과를 반환한다.",
            explanation:
              "MITRE ATT&CK를 코드 구조로 구체화한 핵심 구현부다."
          },
          {
            title: "대응 결과 저장과 알림",
            path: "lambda/handler.py",
            focus: "save_to_dynamo, record_metric, notify_slack",
            role: "대응 결과를 DynamoDB, CloudWatch Metric, Slack 알림으로 남긴다.",
            summary:
              "자동 대응이 끝난 뒤 운영자가 볼 수 있는 이력과 지표를 생성한다.",
            explanation:
              "단순 차단이 아니라 감사 가능하고 추적 가능한 보안 운영 흐름을 만들었다는 점을 보여준다."
          }
        ]
      },
      isolate: {
        summary:
          "IoT Policy 분리, 인증서 상태 변경, Thing Shadow 업데이트로 피해 확산을 줄이는 격리 대응 영역이다.",
        role:
          "자동 격리를 무조건 차단이 아니라 정책 분리, 인증 상태 변경, 수동 조치 상태로 나누어 운영 안정성을 고려한 대응으로 정리했다.",
        detail:
          "충전기 보안 대응은 서비스 중단 위험이 있기 때문에 모든 상황을 동일하게 차단하면 안 된다. AEGIS는 공격 유형에 따라 IoT Policy detach, certificate inactive/revoke, Thing Shadow 업데이트, 수동 조치 필요 상태를 나누어 대응한다.",
        evidence: [],
        code: [
          {
            title: "IoT Policy 분리",
            path: "lambda/handler.py",
            focus: "iot_client.detach_policy(...)",
            role: "비인가 명령 또는 고위험 제어 이벤트에서 충전기 principal의 IoT Policy를 분리한다.",
            summary:
              "충전기가 더 이상 기존 정책으로 MQTT 제어를 이어가지 못하도록 차단한다.",
            explanation:
              "피해 확산을 줄이는 가장 직접적인 자동 격리 코드로 설명할 수 있다."
          },
          {
            title: "인증서 상태 변경",
            path: "lambda/handler.py",
            focus: "iot_client.update_certificate(...)",
            role: "비인가 설정 변경, OS 침투, 자격 증명 탈취 시 인증서를 INACTIVE 또는 REVOKED로 변경한다.",
            summary:
              "디바이스 인증 자체를 제한해 재접속과 악성 제어 가능성을 낮춘다.",
            explanation:
              "IoT 보안에서 인증서 수명주기 관리가 대응 수단이 된다는 점을 보여준다."
          },
          {
            title: "Thing Shadow 대응",
            path: "lambda/handler.py",
            focus: "iot_data_client.update_thing_shadow(...)",
            role: "relay_off, connector_unlock, rate_limit 같은 desired state를 업데이트한다.",
            summary:
              "디바이스의 목표 상태를 안전한 방향으로 바꿔 원격 대응을 수행한다.",
            explanation:
              "클라우드에서 IoT 디바이스 상태를 제어하는 실전형 대응 포인트다."
          },
          {
            title: "IoT Rule 탐지 조건",
            path: "terraform/modules/iot/main.tf",
            focus: "detected_attack_type",
            role: "command/config/firmware/telemetry 토픽별로 T0855/T0839/T1499/T1548 이벤트를 주입한다.",
            summary:
              "MQTT 이벤트가 Lambda에서 바로 공격 유형으로 읽히도록 Rule SQL에서 탐지 코드를 붙인다.",
            explanation:
              "탐지 조건과 대응 코드가 느슨하게 연결되지 않고 인프라 레벨에서 이어진다는 점을 설명한다."
          }
        ]
      },
      dashboard: {
        summary:
          "탐지 건수, 평균 대응 시간, 대응 완료, 충전기 상태를 운영자가 바로 확인하는 대시보드 영역이다.",
        role:
          "대시보드 구현에 참여해 보안 이벤트가 숫자, 지도, 상태 패널, 시뮬레이터 실행 흐름으로 보이도록 구성했다.",
        detail:
          "대시보드는 보안 자동화의 결과를 보여주는 운영 화면이다. 대시보드 수치 기준으로 탐지 10건은 누적 탐지 이벤트, 평균 응답 1130ms는 Lambda Duration 기반 대응 시간, 대응 완료 10건은 자동 대응 처리 수, 충전기 5대는 IoT Core에 등록된 모니터링 대상 수를 의미한다.",
        metrics: [
          { value: "10", label: "탐지 건수", note: "오늘 누적 탐지 이벤트 수" },
          { value: "1130ms", label: "평균 응답 시간", note: "Lambda Duration 기반 대응 시간" },
          { value: "10", label: "대응 완료", note: "자동 대응 완료 집계" },
          { value: "5", label: "충전기", note: "IoT Core 모니터링 대상" }
        ],
        callouts: [
          {
            number: "1",
            title: "데이터 패널",
            description:
              "탐지 10건, 평균 응답 1130ms, 대응 완료 10건, 충전기 5대를 한눈에 보여주는 운영 지표 영역입니다."
          },
          {
            number: "2",
            title: "충전소 지도",
            description:
              "충전기 위치와 상태를 지도 위 색상으로 표시해 어느 충전소에서 이벤트가 발생했는지 빠르게 확인합니다."
          },
          {
            number: "3",
            title: "이벤트 로그 & Slack 알림",
            description:
              "탐지 이벤트 내역과 Slack 알림 결과를 미러링해 운영자가 알림 이후의 조치 흐름을 추적할 수 있게 했습니다."
          },
          {
            number: "4",
            title: "공격 시뮬레이터",
            description:
              "MITRE ATT&CK 기반 공격 유형 버튼, 수동 조치, 초기화 흐름을 제공해 대응 파이프라인을 시연할 수 있습니다."
          },
          {
            number: "5",
            title: "충전소 보안 현황",
            description:
              "충전기별 정상, 대응완료, 수동조치 상태를 분리해 자동 대응 이후의 현재 보안 상태를 보여줍니다."
          },
          {
            number: "6",
            title: "CloudWatch & PDF 보고서",
            description:
              "운영 지표와 보고서 접근 영역으로, 모니터링 수치와 제출용 요약 산출물을 연결하는 입구입니다."
          }
        ],
        evidence: [
          {
            title: "대시보드 메인 화면",
            src: "/projects/cloud-ev-security/evidence/dashboard-overview.png",
            alt: "AEGIS 대시보드 메인 화면",
            caption:
              "탐지 수, 평균 대응 시간, 대응 완료, 충전기 수를 한 화면에서 보고 지도/상태 패널로 내려가 확인하는 운영자 화면"
          }
        ],
        code: [
          {
            title: "통계 조회 API",
            path: "lambda/stats_handler.py",
            focus: "lambda_handler(event, context)",
            role: "DynamoDB의 공격 이벤트를 읽고 공격 유형별 카운트, 최근 이벤트, 대응 완료 수를 만든다.",
            summary:
              "대시보드 상단 숫자와 이벤트 목록의 데이터 근거가 되는 함수다.",
            explanation:
              "화면 숫자가 정적인 장식이 아니라 실제 이벤트 저장소에서 계산된 값이라는 점을 설명한다."
          },
          {
            title: "충전기 수 집계",
            path: "lambda/stats_handler.py",
            focus: "iot_client.list_things()",
            role: "IoT Core Thing 목록을 조회해 모니터링 중인 충전기 수를 계산한다.",
            summary:
              "대시보드의 충전기 수 지표를 AWS IoT Core와 연결한다.",
            explanation:
              "IoT 인벤토리와 운영 대시보드를 연결한 구현 포인트다."
          },
          {
            title: "시뮬레이션 API",
            path: "lambda/simulate_handler.py",
            focus: "_build_payload, _handle_reset, MANUAL_DEMO",
            role: "대시보드 버튼에서 공격 시뮬레이션, 초기화, 수동 조치 이벤트를 만들 수 있게 한다.",
            summary:
              "시연 영상에서 보이는 버튼 동작과 Lambda 대응 파이프라인을 이어준다.",
            explanation:
              "보안 파이프라인을 실제로 검증 가능한 데모 형태로 만든 코드다."
          },
          {
            title: "API Gateway 라우트",
            path: "terraform/modules/apigw/main.tf",
            focus: "GET /stats, POST /simulate",
            role: "정적 대시보드가 Stats/Simulation Lambda를 호출할 수 있게 HTTP API를 구성한다.",
            summary:
              "프론트 대시보드와 서버리스 백엔드를 연결한다.",
            explanation:
              "백엔드와 인프라를 함께 구성한 풀스택 클라우드 구현 포인트다."
          }
        ]
      },
      evidence: {
        summary:
          "CloudWatch 지표, CloudTrail 감사 로그, DynamoDB 이벤트 저장으로 대응 이후 추적성을 확보하는 영역이다.",
        role:
          "탐지와 대응이 일회성 시연으로 끝나지 않도록 지표, 이력, 감사 로그, 보고서 흐름을 묶어 운영 증거를 남기게 했다.",
        detail:
          "보안 자동화는 대응 자체만큼 대응 후 증거가 중요하다. AEGIS는 CloudWatch 지표, CloudTrail 감사 로그, DynamoDB 이벤트 저장소를 함께 구성해 탐지 이후의 운영 상태와 대응 이력을 추적 가능하게 만든다.",
        evidence: [],
        code: [
          {
            title: "CloudWatch Dashboard",
            path: "terraform/modules/monitoring/main.tf",
            focus: "aws_cloudwatch_dashboard.aegis",
            role: "Lambda Invocations, Errors, Duration 위젯과 공격 유형별 차트를 Terraform으로 만든다.",
            summary:
              "운영자가 대응 함수 상태와 공격 추이를 볼 수 있는 관측 화면을 코드로 생성한다.",
            explanation:
              "모니터링도 콘솔 수동 구성이 아니라 IaC로 관리했다는 점을 보여준다."
          },
          {
            title: "CloudTrail 감사 로그",
            path: "terraform/modules/monitoring/main.tf",
            focus: "aws_cloudtrail.aegis",
            role: "AWS API 활동을 추적할 CloudTrail과 저장 버킷 정책을 구성한다.",
            summary:
              "보안 이벤트 대응 이후 감사 가능한 로그 기반을 마련한다.",
            explanation:
              "탐지/대응/감사를 연결한 보안 운영 관점의 구현이다."
          },
          {
            title: "DynamoDB 이벤트 저장소",
            path: "terraform/modules/dynamodb/main.tf",
            focus: "aws_dynamodb_table.attack_events",
            role: "공격 유형, 충전기 ID, 타임스탬프 기반으로 대응 이력을 저장한다.",
            summary:
              "대시보드, 이벤트 타임라인, 보고서의 데이터 근거가 되는 테이블이다.",
            explanation:
              "자동 대응 결과를 추적 가능한 데이터로 남겼다는 점을 설명한다."
          }
        ]
      }
    }
  }
};

export function getAegisStarDetail(starId, language) {
  const localized = aegisStarDetails[language] ?? aegisStarDetails.ko;
  const fallback = aegisStarDetails.ko;

  return {
    labels: localized.labels,
    detail: localized.stars[starId] ?? fallback.stars[starId] ?? null
  };
}
