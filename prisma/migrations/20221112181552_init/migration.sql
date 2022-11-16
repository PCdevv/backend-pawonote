/*
  Warnings:

  - You are about to drop the column `userId` on the `notes` table. All the data in the column will be lost.
  - Added the required column `writerId` to the `Notes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `notes` DROP FOREIGN KEY `Notes_userId_fkey`;

-- AlterTable
ALTER TABLE `notes` DROP COLUMN `userId`,
    ADD COLUMN `writerId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Notes` ADD CONSTRAINT `Notes_writerId_fkey` FOREIGN KEY (`writerId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
