/*
  Warnings:

  - You are about to drop the `CarType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `CarType`;

-- CreateTable
CREATE TABLE `car_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
