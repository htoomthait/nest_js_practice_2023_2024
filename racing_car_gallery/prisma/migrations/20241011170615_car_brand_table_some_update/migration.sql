-- AlterTable
ALTER TABLE `car_types` ADD COLUMN `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active';

-- CreateTable
CREATE TABLE `car_brands` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(128) NOT NULL,
    `country_of_origin` VARCHAR(128) NOT NULL,
    `established_year` INTEGER NOT NULL DEFAULT 1900,
    `logo_img` VARCHAR(512) NOT NULL,
    `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
