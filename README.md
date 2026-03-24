# 정우성 | Cloud Security & Automation Engineer

AWS 기반 클라우드 환경에서  
보안 탐지 이후 자동 대응까지 연결하는 시스템을 설계하고 구현해왔습니다.  
또한 C++ 기반 로직 설계를 통해 복잡한 데이터 흐름과 상태를 처리하는 시스템 구현 경험을 보유하고 있습니다.

---

## 🔥 Core Skills

- AWS 기반 보안 탐지 및 자동 대응 아키텍처 설계
- Terraform / Ansible 기반 인프라 및 운영 자동화
- Linux 환경 취약점 진단 및 조치 자동화
- 이벤트 기반 시스템 설계 및 구현
- C++ 기반 알고리즘 및 데이터 처리 로직 설계

---

## 🔥 Projects

### 1. AEGIS - EV 충전 인프라 보안 관제 및 자동 대응 시스템

EV 충전기 환경을 가정해 공격 시나리오를 탐지하고,  
자동 대응까지 수행하는 AWS 기반 보안 시스템을 설계한 프로젝트입니다.

**내 역할**
- Terraform으로 AWS 인프라 모듈화 및 구축
- IoT Core, Lambda, EventBridge, GuardDuty를 연계한 구조 설계
- Python 기반 EV 충전기 시뮬레이터 구현 (정상/공격 시나리오 재현)
- Lambda에서 공격 유형별 자동 대응 로직 구현
- GuardDuty 결과에 조건 매칭을 추가해 오탐 최소화
- DynamoDB, CloudWatch, Slack 연계를 통한 운영 구조 설계

**핵심 역량**
- 클라우드 보안 아키텍처 설계
- 이벤트 기반 자동화 시스템 구현
- 인프라 코드화 (Terraform)
- IoT / AWS / 보안 통합 이해

🔗 https://github.com/woorung222/cloud-ev-security

---

### 2. 리눅스 취약점 진단 및 조치 자동화

ISMS-P 기준 리눅스 보안 점검 항목을 분석하고,  
수동으로 수행되던 조치 과정을 자동화한 프로젝트입니다.

**내 역할**
- ISMS-P 70여 개 항목 분석 및 점검/조치 기준 정리
- Ansible Playbook과 Shell Script 기반 자동 조치 구현
- 환경별(Rocky/Ubuntu) 분기 처리 및 일관된 보안 설정 적용
- “점검 자동 → 조치 수동” 구조를 “조치까지 자동화”로 개선

**핵심 역량**
- Linux 운영 자동화
- 보안 정책 기반 자동화 설계
- Ansible / Bash 활용

🔗 https://github.com/woorung222/sw_project_team6

---

### 3. 텍스트 기반 투자 시뮬레이션 시스템

주식 시장을 모델링한 시뮬레이션 프로젝트로,  
대량 트랜잭션 처리와 알고리즘 기반 의사결정 로직을 설계했습니다.

**내 역할**
- C++ 기반 매매 알고리즘 설계 및 구현
- 대량 거래 처리 로직 구성 및 데이터 흐름 설계
- 알고리즘 간 상관관계를 분석해 시스템 무결성 검증

**핵심 역량**
- C++ 기반 데이터 처리 및 로직 설계
- 시뮬레이션 시스템 구현
- 복잡한 상태 변화 처리

---

### 4. BookStar (독서 SNS)

확장성을 고려한 데이터 구조와 사용자 권한 관리 중심의 SNS 프로젝트

- DB 스키마 설계
- 사용자 권한 기반 접근 제어 구현

🔗 https://github.com/woorung222/BookStar

---

### 5. AI 기반 실시간 좌석 분석 플랫폼

AI 분석 데이터를 기반으로 여가시설 정보를 제공하는 플랫폼

- DB 구조 설계 및 JSON 데이터 구조 최적화
- 안드로이드 프론트엔드 개발

🔗 https://github.com/woorung222/orakgarak

---

## 🔹 Additional Experience

- 카투사 복무: 외국인 협업 환경 경험 및 적응력
- 선도부 부장: 규칙 및 운영 프로세스 체계화 경험

---

## 🔹 Tech Stack

- **Cloud / Infra**: AWS, Terraform, Ansible  
- **OS / Script**: Linux, Python, Bash  
- **Backend / Language**: C++, Java, Kotlin  
- **Database**: MySQL
