/*
  Warnings:

  - You are about to drop the column `isDeleted` on the `addOns` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `breeds` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `addOns` DROP COLUMN `isDeleted`,
    ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `appointments` DROP COLUMN `isDeleted`,
    ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `breeds` DROP COLUMN `isDeleted`,
    ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `customers` DROP COLUMN `isDeleted`,
    ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `pets` DROP COLUMN `isDeleted`,
    ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `services` DROP COLUMN `isDeleted`,
    ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `isDeleted`,
    ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true;
