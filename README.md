# 🚀 Hillir Test API

Project ini merupakan API backend menggunakan **Express.js (TypeScript)**, **Prisma ORM**, dan **PostgreSQL**.

---

## 📦 Fitur

- Express.js dengan TypeScript.
- Prisma sebagai ORM.
- PostgreSQL (bisa via Docker).
- Cron Job Simulation.
- Batch Import Ad Performance via CSV.
- Clean layered architecture (controller, service, repository).

---

## 🔧 Prasyarat

- Node.js v18+
- Docker & Docker Compose (optional, jika ingin pakai container)
- PostgreSQL (bisa local atau dockerized)

---

## ⚙️ Cara Menjalankan Project dengan NPM

### 1. Masuk Lokasi File API

```bash
cd hillir-test-api
```

### 2. Install Dependency

```bash
npm install
```

### 3. Buat File .env

```bash
cp .env.example .env
```

### 3. Sesuaikan Credentials

### 5. Jalankan Script Seeder Client, KpiType, dan Contract

```bash
npx ts-node prisma/seed.ts
```

### 5. Untuk Menguji API bisa menggunakan postman

```bash
1. POST /ad-performances

Payload :
{
    "submitted_by" : "aldova",
    "data" : [
    {
        "client_id": 1,
        "contract_id": 1,
        "kpi_type_id": 1,
        "actual_value": 0.029999,
        "date": "2025-05-18"
    },
    {
        "client_id": 1,
        "contract_id": 2,
        "kpi_type_id": 2,
        "actual_value": 9999,
        "date": "2025-05-18"
    },
    {
        "client_id": 2,
        "contract_id": 3,
        "kpi_type_id": 1,
        "actual_value": 0.03,
        "date": "2025-05-18"
    },
    {
        "client_id": 2,
        "contract_id": 4,
        "kpi_type_id": 2,
        "actual_value": 10000,
        "date": "2025-05-18"
    },
        {
        "client_id": 3,
        "contract_id": 5,
        "kpi_type_id": 1,
        "actual_value": 0.05,
        "date": "2025-05-18"
    },
    {
        "client_id": 3,
        "contract_id": 6,
        "kpi_type_id": 2,
        "actual_value": 11000,
        "date": "2025-05-18"
    }
    ]
}

2. GET /underperforming-ads?client_id={number}&kpi_type_id{number}&date={date}
3. /job-logs?status={status}
3. /job-logs?submitted_by={name}
```

### 5. Untuk Menguji Simulasi API External

```bash
npx ts-node src/scripts/externalCSVImpor.ts
```

## ⚙️ Cara Menjalankan Project dengan Docker

### 1. Masuk Lokasi File API

```bash
cd hillir-test-api
```

### 2. Buat File .env

```bash
cp .env.example .env
```

### 3. Sesuaikan Credentials

### 5. Jalan kan Container di Latar Belakang

```bash
docker compose up -d
```

### 5. Jalankan Seeder lewat Docker Exec

```bash
docker exec -it hillir-test-api sh
node prisma/seed.ts
```

### 5. Untuk Menguji Simulasi API External

```bash
docker exec -it hillir-test-api sh
node dist/scripts/externalCSVImpor.ts
```
