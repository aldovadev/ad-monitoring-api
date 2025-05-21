# 🚀 Hillir Ad Performance Monitoring System API

Project ini merupakan API backend menggunakan **TypeScript**, **Express.js**, **Prisma ORM**, dan **PostgreSQL**.

---

## ✔️ Fitur

- Express.js dengan TypeScript.
- Prisma sebagai ORM.
- PostgreSQL (bisa via Docker).
- Cron Job Simulation Pakai Script.
- Batch Import Ad Performance via CSV.
- Clean layered architecture (controller, service, repository).

---

## 📝 Prasyarat

- Node.js v18+ [Install Node.js](https://nodejs.org/en/download)
- PostgreSQL v13+ [Install PostgreSQL](https://www.postgresql.org/download/windows)
- Docker & Docker Compose, Install Docker [Windows](https://docs.docker.com/desktop/setup/install/windows-install) atau [Linux](https://docs.docker.com/desktop/setup/install/linux)

---

## ▶️ Cara Menjalankan Project dengan [NPM](https://www.npmjs.com/)

### 1. Save dan Masuk Lokasi File Sourcecode

Download file .zip lalu ekstract semua file

```bash
cd hillir-test-api
```

### 2. Copy File .Env

Sesuaikan crendentialnya mencakup username, password, nama database

```bash
cp .env.example .env
```

### 3. Install Dependency

```bash
npm install
```

### 4. Jalankan Script Seeder

Perintah ini dilakukan untuk mengisi database dengan data dummy client, KPI type, dan contract

```bash
npx prisma generate

npx prisma db push

node prisma/seed.js
```

### 5. API Documentation

Bisa langsung dicoba dengan menggunakan swagger UI setelah API sukses dijalankan [API Documentation](http://localhost:8000/docs)

### 6. Simulasi Import Data Eksternal

Data Eksternal disimulasikan berasal dari sebuah file CSV dengan bentuk data yang berbeda dari parameter penambahan data, disana terdapat validasi dan filtrasi sebelum di masukan ke database.

```bash
npx ts-node src/scripts/externalCSVImpor.ts
```

## ▶️ Cara Menjalankan Project dengan [Docker](https://www.docker.com/)

### 1. Save dan Masuk Lokasi File Sourcecode

Download file .zip lalu ekstract semua file

```bash
cd hillir-test-api
```

### 2. Copy File .Env

Sesuaikan crendentialnya mencakup username, password, nama database

```bash
cp .env.example .env
```

### 3. Jalan kan Container di Latar Belakang

```bash
docker compose up -d
```

### 5. API Documentation

Bisa langsung dicoba dengan menggunakan swagger UI setelah API sukses dijalankan [API Documentation](http://localhost:8000/docs)

### 5. Untuk Menguji Simulasi API External

Masuke ke container

```bash
docker exec -it hillir-test-api sh
```

Eksekusi Script untuk membaca CSV

```bash
node dist/scripts/externalCSVImport.js
```

Keluar dari container

```bash
exit
```

## 📄 License & Copyright

© 2025 Aldova Guswantri.  
This project and its contents are protected under copyright. Unauthorized use, modification, or distribution is prohibited without permission.
