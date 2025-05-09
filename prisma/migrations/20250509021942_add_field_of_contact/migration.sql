/*
  Warnings:

  - Added the required column `contact_id` to the `address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `address` ADD COLUMN `contact_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `address` ADD CONSTRAINT `address_contact_id_fkey` FOREIGN KEY (`contact_id`) REFERENCES `contacts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
