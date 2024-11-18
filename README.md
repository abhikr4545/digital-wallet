# Distributed Financial Microservices Platform

## Overview

This project is a comprehensive microservices-based financial platform built using modern architecture and best practices for distributed systems.

## 🚀 Architecture

### System Components
- **Frontend**: React.js Single Page Application
- **Backend**: NestJS Microservices
- **Communication**: Apache Kafka
- **Logging**: ELK Stack (Elasticsearch, Logstash, Kibana)

### Microservices
1. **Wallet Service**: User wallet management
2. **Balance Service**: Account balance tracking
3. **Transaction Service**: Transaction processing
4. **Fund Transfer Orchestrator**: Cross-service fund transfer coordination

## 🛠 Tech Stack

### Frontend
- React.js
- Nx Monorepo
- State Management
- Responsive Design

### Backend
- NestJS
- TypeScript
- Microservices Architecture
- Kafka Message Broker

### Database
- [Specify your database, e.g., PostgreSQL, MongoDB]

### Infrastructure
- Apache Kafka
- ELK Stack
- Docker
- Kubernetes (Optional)

## 📦 Comprehensive Setup and Installation

### 1. Prerequisites

#### System Requirements

- **Software Requirements**:
  - Node.js (v18.x LTS or higher)
  - npm (v9.x+) or Yarn (v1.22+)
  - Docker (v20.10+)
  - Docker Compose (v2.x+)
  - Git (v2.x+)

### 2. Clone the Repository

```bash
# HTTPS
git clone https://github.com/[your-username]/digital-wallet.git

# SSH
git clone git@github.com:[your-username]/digital-wallet.git

# Change to project directory
cd digital-wallet
```

### 3. Install Global Dependencies

```bash

# Install Nx CLI globally
npm install -g @nrwl/cli

# Install NestJS CLI globally
npm install -g @nestjs/cli

# Install project-wide dependencies
npm install

```

### 4. Environment Configuration

```bash

cp .env.example .env

```

### 5. Infrastructure Setup

```bash

docker compose up -d

```

### 6. Start Microservices

```bash

# start in this order only
nx serve wallet-service
nx serve balance-service
nx serve transaction-service
nx serve fund-transfer-orchestrator
nx serve client

visit http://localhost:4200

```
