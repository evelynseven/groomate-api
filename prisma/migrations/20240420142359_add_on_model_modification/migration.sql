/*
  Warnings:

  - You are about to drop the `_AddonToAppointment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `addons` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_AddonToAppointment` DROP FOREIGN KEY `_AddonToAppointment_A_fkey`;

-- DropForeignKey
ALTER TABLE `_AddonToAppointment` DROP FOREIGN KEY `_AddonToAppointment_B_fkey`;

-- DropTable
DROP TABLE `_AddonToAppointment`;

-- DropTable
DROP TABLE `addons`;

-- CreateTable
CREATE TABLE `addOns` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `remarks` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,
    `nameAbbrev` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AddOnToAppointment` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_AddOnToAppointment_AB_unique`(`A`, `B`),
    INDEX `_AddOnToAppointment_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_AddOnToAppointment` ADD CONSTRAINT `_AddOnToAppointment_A_fkey` FOREIGN KEY (`A`) REFERENCES `addOns`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AddOnToAppointment` ADD CONSTRAINT `_AddOnToAppointment_B_fkey` FOREIGN KEY (`B`) REFERENCES `appointments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
