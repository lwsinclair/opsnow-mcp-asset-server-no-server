[![MseeP.ai Security Assessment Badge](https://mseep.net/pr/taejulee-opsnow-mcp-asset-server-no-server-badge.png)](https://mseep.ai/app/taejulee-opsnow-mcp-asset-server-no-server)

# OpsNow MCP Asset Server

## 소개
OpsNow MCP Asset Server는 Model Context Protocol(MCP)을 기반으로 하여 OpsNow의 자산 데이터를 LLM 벤더의 데스크톱 애플리케이션(예: Claude)에 제공하는 서버입니다.

## 시스템 구조
```mermaid
graph LR
    A[LLM Vendor Desktop App] --> |MCP Protocol| B[OpsNow MCP Asset Server]:::highlight
    B --> C[OpsNow MCP Provider]
    C --> D[OpsNow Resources]
    
    classDef highlight fill:#2e8b57,stroke:#333,stroke-width:2px;
```

- **LLM Vendor Desktop App**: Claude와 같은 LLM 기반 데스크톱 애플리케이션
- **OpsNow MCP Server**: Asset 및 Cost 데이터를 MCP 형식으로 제공하는 서버
- **OpsNow MCP Provider**: OpsNow API Bridge를 통해 자원 데이터를 처리
- **OpsNow Resources**: 실제 OpsNow 리소스 데이터를 가정한 목데이터로 구현 (개발 및 테스트 목적)

## 주요 기능
- MCP 프로토콜을 통한 자산 데이터 제공
- OpsNow API Bridge와의 연동
- 실시간 자산 정보 조회

## 기술 스택

- Node.js
- TypeScript
- MCP SDK (@modelcontextprotocol/sdk)
- dotenv
- zod
- node-fetch

## 설치 방법

```bash
# 저장소 클론
git clone [repository-url]

# 의존성 설치
npm install

# 빌드
npm run build
```

## 환경 설정
프로젝트에 기본 `.env` 파일이 포함되어 있으며, 목데이터를 사용하도록 설정되어 있습니다. 필요한 경우 이 파일을 수정하여 실제 환경에 맞게 설정할 수 있습니다.


## 개발 환경 설정

### 필수 요구사항

- Node.js 18.x 이상
- npm 9.x 이상