/*
  Warnings:

  - You are about to drop the column `basePrice` on the `addons` table. All the data in the column will be lost.
  - Added the required column `price` to the `addons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `addons` DROP COLUMN `basePrice`,
    ADD COLUMN `price` DOUBLE NOT NULL;
