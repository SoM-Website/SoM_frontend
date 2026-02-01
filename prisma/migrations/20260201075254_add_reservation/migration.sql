-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "title" TEXT,
    "content" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Reservation_phone_idx" ON "Reservation"("phone");

-- CreateIndex
CREATE INDEX "Reservation_createdAt_idx" ON "Reservation"("createdAt");
