-- AlterTable
ALTER TABLE `pets` MODIFY `groomRating` ENUM('PREFERRED', 'NEUTRAL', 'CAUTION') NOT NULL DEFAULT 'NEUTRAL';
