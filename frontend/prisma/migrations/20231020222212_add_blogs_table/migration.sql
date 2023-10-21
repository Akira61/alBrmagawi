-- CreateTable
CREATE TABLE `ctfs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `thumbnail` VARCHAR(255) NOT NULL,
    `level` VARCHAR(255) NOT NULL,
    `rating` INTEGER NOT NULL,
    `userOwns` INTEGER NOT NULL,
    `systemOwns` INTEGER NOT NULL,
    `matchineType` VARCHAR(255) NOT NULL,
    `flag` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `joining_date` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
