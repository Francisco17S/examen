/*
  Warnings:

  - You are about to drop the column `sucursal` on the `computadora2` table. All the data in the column will be lost.
  - You are about to drop the column `sucursal` on the `prestamista2` table. All the data in the column will be lost.
  - You are about to drop the column `sucursal` on the `prestamo2` table. All the data in the column will be lost.
  - Made the column `idsucursal` on table `computadora2` required. This step will fail if there are existing NULL values in that column.
  - Made the column `idsucursal` on table `prestamista2` required. This step will fail if there are existing NULL values in that column.
  - Made the column `idsucursal` on table `prestamo2` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "computadora2" DROP COLUMN "sucursal",
ALTER COLUMN "idsucursal" SET NOT NULL;

-- AlterTable
ALTER TABLE "prestamista2" DROP COLUMN "sucursal",
ALTER COLUMN "idsucursal" SET NOT NULL;

-- AlterTable
ALTER TABLE "prestamo2" DROP COLUMN "sucursal",
ALTER COLUMN "idsucursal" SET NOT NULL;
