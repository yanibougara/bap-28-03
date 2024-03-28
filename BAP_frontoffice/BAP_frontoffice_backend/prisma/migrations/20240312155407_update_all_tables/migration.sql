/*
  Warnings:

  - You are about to drop the column `username` on the `user` table. All the data in the column will be lost.
  - Added the required column `archived` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `association` ADD COLUMN `closed` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `event` ADD COLUMN `archived` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `username`,
    ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'En attente',
    ADD COLUMN `verified` BOOLEAN NOT NULL DEFAULT false;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User_email_key` TO `user_email_key`;
