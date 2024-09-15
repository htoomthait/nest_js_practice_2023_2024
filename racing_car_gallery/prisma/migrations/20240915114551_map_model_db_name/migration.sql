/*
  Warnings:

  - You are about to drop the `car_type` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `car_type`;

-- CreateTable
CREATE TABLE `car_types` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;



