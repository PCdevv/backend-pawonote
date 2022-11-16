/*
  Warnings:

  - Added the required column `userId` to the `Notes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `notes` ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Notes` ADD CONSTRAINT `Notes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
