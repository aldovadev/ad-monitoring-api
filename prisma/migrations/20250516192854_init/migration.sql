-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KpiType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "KpiType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contract" (
    "id" SERIAL NOT NULL,
    "client_id" INTEGER NOT NULL,
    "kpi_type_id" INTEGER NOT NULL,
    "kpi_target" DOUBLE PRECISION NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdPerformance" (
    "id" SERIAL NOT NULL,
    "client_id" INTEGER NOT NULL,
    "contract_id" INTEGER NOT NULL,
    "kpi_type_id" INTEGER NOT NULL,
    "actual_value" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdPerformance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubmissionLog" (
    "id" SERIAL NOT NULL,
    "submitted_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "row_count" INTEGER NOT NULL,

    CONSTRAINT "SubmissionLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobLog" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "row_count" INTEGER NOT NULL,
    "duration_ms" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JobLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_name_key" ON "Client"("name");

-- CreateIndex
CREATE INDEX "Client_name_idx" ON "Client"("name");

-- CreateIndex
CREATE UNIQUE INDEX "KpiType_name_key" ON "KpiType"("name");

-- CreateIndex
CREATE INDEX "KpiType_name_idx" ON "KpiType"("name");

-- CreateIndex
CREATE INDEX "Contract_client_id_kpi_type_id_idx" ON "Contract"("client_id", "kpi_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "Contract_client_id_kpi_type_id_key" ON "Contract"("client_id", "kpi_type_id");

-- CreateIndex
CREATE INDEX "AdPerformance_date_idx" ON "AdPerformance"("date");

-- CreateIndex
CREATE INDEX "AdPerformance_kpi_type_id_idx" ON "AdPerformance"("kpi_type_id");

-- CreateIndex
CREATE INDEX "AdPerformance_client_id_kpi_type_id_date_idx" ON "AdPerformance"("client_id", "kpi_type_id", "date");

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_kpi_type_id_fkey" FOREIGN KEY ("kpi_type_id") REFERENCES "KpiType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdPerformance" ADD CONSTRAINT "AdPerformance_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdPerformance" ADD CONSTRAINT "AdPerformance_contract_id_fkey" FOREIGN KEY ("contract_id") REFERENCES "Contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdPerformance" ADD CONSTRAINT "AdPerformance_kpi_type_id_fkey" FOREIGN KEY ("kpi_type_id") REFERENCES "KpiType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
