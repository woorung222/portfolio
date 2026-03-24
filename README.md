# 정우성 | Cloud Security & Automation Portfolio

클라우드 인프라와 보안 자동화에 관심을 가지고,  
AWS 기반 아키텍처 설계와 Linux 환경 자동화 프로젝트를 수행해 왔습니다.  
단순 기능 구현보다 문제를 구조화하고, 운영 가능한 형태로 설계하는 개발을 지향합니다.

---

## About Me

- 숭실대학교 소프트웨어학부
- OPIc IH
- ADsP
- Linux(Rocky/Ubuntu), AWS, Terraform, Ansible, Python, Bash, MySQL 기반 프로젝트 경험
- 카투사 복무 경험을 통해 외국인과의 협업 환경에 익숙하며, 다양한 환경에 빠르게 적응할 수 있습니다.

---

## Tech Stack

### Cloud / Infra
- AWS EC2, S3, RDS, Lambda, GuardDuty, CloudWatch, IoT Core, EventBridge, API Gateway
- Terraform
- Ansible

### OS / Backend / Script
- Linux (Rocky, Ubuntu)
- Python
- Bash
- MySQL

### Languages
- Java
- C++
- Kotlin
- Lua

---

## Projects

### 1. 취약점 진단 및 조치 자동화
**프로젝트 성격**: 현대오토에버 프로젝트  
**요약**: ISMS-P 기준 리눅스 보안 점검 항목을 분석하고, 기존의 수동 조치 과정을 자동화하는 프로젝트입니다.

**주요 기여**
- ISMS-P 가이드라인 약 70개 항목을 분석하여 점검 및 조치 대상 정리
- Ansible Playbook과 Shell Script를 활용해 리눅스 취약 항목 자동 조치 로직 구현
- 기존의 “점검 자동, 조치 수동” 구조를 “조치까지 자동화”하는 방향으로 고도화
- 환경별로 일관된 보안 설정이 적용되도록 자동화 구조 설계

**관련 역량**
- Linux 운영 자동화
- 보안 정책 기반 자동화
- Ansible / Shell Script 활용 능력

**Repository**
- [sw_project_team6](https://github.com/woorung222/sw_project_team6)

---

### 2. AEGIS - EV 충전 인프라 보안 관제 및 자동 대응 시스템
**프로젝트 성격**: 현대오토에버 프로젝트  
**요약**: EV 충전기 환경을 가정해, 공격 시나리오를 탐지하고 자동 대응까지 수행하는 AWS 기반 보안 시스템을 설계한 프로젝트입니다.

**주요 기여**
- Terraform으로 AWS 인프라를 모듈화하여 설계 및 구축
- AWS IoT Core, Lambda, EventBridge, GuardDuty, DynamoDB, CloudWatch, API Gateway를 연계한 구조 설계
- Python 기반 EV 충전기 시뮬레이터를 구현해 정상 상태와 공격 시나리오 재현
- Lambda에서 이벤트를 수신해 공격 유형별 자동 대응 로직 구현
- GuardDuty 결과를 그대로 사용하지 않고, 세부 조건 매칭 단계를 추가해 오탐 가능성을 줄이는 구조 설계
- 대응 결과를 DynamoDB에 저장하고 CloudWatch Dashboard 및 Slack 알림으로 연계

**관련 역량**
- 클라우드 보안 아키텍처 설계
- 이벤트 기반 자동화 설계
- IoT / AWS / 보안 통합 이해
- Terraform 기반 인프라 코드화

**Repository**
- 비공개 프로젝트

---

### 3. BookStar
**프로젝트 성격**: 소프트웨어 프로젝트  
**요약**: 독서 기반 SNS 서비스로, 확장성을 고려한 데이터 구조와 사용자 권한 관리를 중점적으로 구현한 프로젝트입니다.

**주요 기여**
- 서비스 확장성을 고려한 DB 스키마 설계
- 사용자 권한 기반 접근 제어 로직 구현
- 서비스 기능에 맞는 데이터 구조와 흐름 설계

**관련 역량**
- DB 설계
- 접근 제어
- 서비스 구조 설계

**Repository**
- [BookStar](https://github.com/woorung222/BookStar)

---

### 4. AI 기반 실시간 잔여 좌석 분석 및 여가시설 플랫폼
**프로젝트 성격**: 캡스톤디자인 2  
**요약**: AI 분석 데이터를 활용해 여가시설 정보를 제공하는 플랫폼으로, 데이터 관리 구조와 안드로이드 프론트엔드 개발에 참여했습니다.

**주요 기여**
- AI 분석 데이터 저장 및 활용을 위한 DB 구조 설계
- 데이터 연동을 고려한 JSON 규격 최적화
- 안드로이드 프론트엔드 개발

**관련 역량**
- 데이터 구조 설계
- 모바일 연동
- JSON 기반 데이터 처리

**Repository**
- [orakgarak](https://github.com/woorung222/orakgarak)

---

## Additional Experience

### 카투사 복무
- 외국인과의 협업 환경에 익숙하며, 문화적 차이가 있는 환경에서도 원활하게 적응하고 소통한 경험이 있습니다.

### 고등학교 선도부 부장
- 단순 운영이 아니라 규칙과 절차를 체계화하는 방식으로 조직을 관리한 경험이 있습니다.
- 이 경험을 통해 문제를 논리적으로 구조화하고, 일관된 기준을 세워 운영하는 태도를 길렀습니다.

---

## What I Value

저는 문제를 단순히 해결하는 것에 그치지 않고,  
반복 가능한 구조로 만들고 운영 가능한 형태로 정리하는 것을 중요하게 생각합니다.  
앞으로도 클라우드와 보안, 자동화가 결합된 환경에서 실질적인 문제를 해결하는 엔지니어로 성장하고자 합니다.
