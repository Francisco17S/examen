/*
  Warnings:

  - You are about to drop the column `sucursal` on the `computadora2` table. All the data in the column will be lost.
  - You are about to drop the column `sucursal` on the `prestamista2` table. All the data in the column will be lost.
  - You are about to drop the column `sucursal` on the `prestamo2` table. All the data in the column will be lost.
  - Added the required column `idsucursal` to the `computadora2` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idsucursal` to the `prestamista2` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idsucursal` to the `prestamo2` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "computadora2" ADD COLUMN "idsucursal" INTEGER DEFAULT 1;
-- Optional: If you want to remove the default constraint afterwards
ALTER TABLE "computadora2" ALTER COLUMN "idsucursal" DROP DEFAULT;


-- AlterTable
ALTER TABLE "prestamista2" ADD COLUMN "idsucursal" INTEGER DEFAULT 1;
ALTER TABLE "prestamista2" ALTER COLUMN "idsucursal" DROP DEFAULT;

-- AlterTable
ALTER TABLE "prestamo2" ADD COLUMN "idsucursal" INTEGER DEFAULT 1;
ALTER TABLE "prestamo2" ALTER COLUMN "idsucursal" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Sucursal" (
    "idsucursal" SERIAL NOT NULL,
    "lugar" TEXT NOT NULL,

    CONSTRAINT "Sucursal_pkey" PRIMARY KEY ("idsucursal")
);

-- AddForeignKey
ALTER TABLE "computadora2" ADD CONSTRAINT "computadora2_idsucursal_fkey" FOREIGN KEY ("idsucursal") REFERENCES "Sucursal"("idsucursal") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prestamista2" ADD CONSTRAINT "prestamista2_idsucursal_fkey" FOREIGN KEY ("idsucursal") REFERENCES "Sucursal"("idsucursal") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prestamo2" ADD CONSTRAINT "prestamo2_idsucursal_fkey" FOREIGN KEY ("idsucursal") REFERENCES "Sucursal"("idsucursal") ON DELETE RESTRICT ON UPDATE CASCADE;
