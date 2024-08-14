-- CreateEnum
CREATE TYPE "Role" AS ENUM ('BASIC', 'OPERATOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "Kelamin" AS ENUM ('L', 'P');

-- CreateEnum
CREATE TYPE "JenisSimpanan" AS ENUM ('wajib', 'pokok', 'tabungan');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "anggotas" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "no" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "kelamin" "Kelamin" NOT NULL,
    "tempatLahir" TEXT,
    "tanggalLahir" TEXT NOT NULL,
    "nik" BIGINT NOT NULL,
    "kk" BIGINT,
    "pekerjaan" TEXT,
    "alamat" TEXT,
    "tanggalMasuk" TIMESTAMP(3) NOT NULL,
    "tanggalKeluar" TIMESTAMP(3),
    "aktif" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "anggotas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "simpanans" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "anggotaId" TEXT NOT NULL,
    "jenis" "JenisSimpanan" NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "tahun" INTEGER,
    "bulan" INTEGER,
    "nilai" INTEGER NOT NULL,
    "tutup" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "simpanans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pinjamans" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "anggotaId" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "nilai" INTEGER NOT NULL,
    "jumlahBulan" INTEGER NOT NULL,
    "totalAngsuran" INTEGER NOT NULL,
    "lunas" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pinjamans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "angsurans" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "anggotaId" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "nilai" INTEGER NOT NULL,
    "bulanKe" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "angsurans_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE INDEX "users_createAt_idx" ON "users"("createAt");

-- CreateIndex
CREATE UNIQUE INDEX "anggotas_no_key" ON "anggotas"("no");

-- CreateIndex
CREATE UNIQUE INDEX "anggotas_nik_key" ON "anggotas"("nik");

-- CreateIndex
CREATE INDEX "anggotas_createdAt_idx" ON "anggotas"("createdAt");

-- CreateIndex
CREATE INDEX "simpanans_createdAt_idx" ON "simpanans"("createdAt");

-- CreateIndex
CREATE INDEX "pinjamans_createdAt_idx" ON "pinjamans"("createdAt");

-- CreateIndex
CREATE INDEX "angsurans_createdAt_idx" ON "angsurans"("createdAt");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anggotas" ADD CONSTRAINT "anggotas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "simpanans" ADD CONSTRAINT "simpanans_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "simpanans" ADD CONSTRAINT "simpanans_anggotaId_fkey" FOREIGN KEY ("anggotaId") REFERENCES "anggotas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pinjamans" ADD CONSTRAINT "pinjamans_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pinjamans" ADD CONSTRAINT "pinjamans_anggotaId_fkey" FOREIGN KEY ("anggotaId") REFERENCES "anggotas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "angsurans" ADD CONSTRAINT "angsurans_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "angsurans" ADD CONSTRAINT "angsurans_anggotaId_fkey" FOREIGN KEY ("anggotaId") REFERENCES "anggotas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
