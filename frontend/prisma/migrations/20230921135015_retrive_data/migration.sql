-- CreateTable
CREATE TABLE `contact` (
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `message` TEXT NOT NULL,
    `date` DATE NOT NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `course_sections` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `section_id` VARCHAR(255) NOT NULL,
    `course_id` INTEGER NULL,
    `section` VARCHAR(255) NULL,

    UNIQUE INDEX `section`(`section`),
    INDEX `section_courseID`(`course_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `courses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `course_id` VARCHAR(255) NOT NULL,
    `teacher` INTEGER NOT NULL,
    `thumbnail` VARCHAR(255) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `sections` VARCHAR(255) NULL DEFAULT 'section',
    `price` INTEGER NOT NULL,
    `students` INTEGER NOT NULL DEFAULT 0,
    `public` TINYINT NOT NULL DEFAULT 0,
    `date` DATE NOT NULL,

    INDEX `teacher_id`(`teacher`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lessons` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lesson_id` VARCHAR(255) NOT NULL,
    `course_id` INTEGER NOT NULL,
    `section` INTEGER NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `content` VARCHAR(255) NOT NULL,
    `blob_content` LONGBLOB NULL,
    `thumbnail` VARCHAR(255) NULL,
    `content_type` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NULL,
    `public` TINYINT NOT NULL DEFAULT 1,
    `date` DATE NOT NULL,

    INDEX `courseID`(`course_id`),
    INDEX `lesson_section`(`section`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `course_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `payment_id` VARCHAR(255) NOT NULL,
    `payment_data` JSON NOT NULL,
    `date` DATE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quizzes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quiz_id` VARCHAR(255) NOT NULL,
    `lesson_id` INTEGER NULL,
    `course_id` INTEGER NOT NULL,
    `section` INTEGER NOT NULL,
    `question` VARCHAR(255) NOT NULL,
    `answers` VARCHAR(255) NOT NULL,
    `correct_answer` VARCHAR(255) NOT NULL,
    `section_quiz` TINYINT NOT NULL DEFAULT 0,
    `path` VARCHAR(255) NOT NULL,

    INDEX `course`(`course_id`),
    INDEX `lessonID`(`lesson_id`),
    INDEX `sectionID`(`section`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `staff` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `phone_number` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `role` VARCHAR(255) NOT NULL DEFAULT 'staff',
    `password` VARCHAR(255) NOT NULL,
    `joining_date` VARCHAR(255) NOT NULL,
    `verified` TINYINT NOT NULL DEFAULT 1,
    `verifyToken` VARCHAR(255) NULL,
    `verifyTokenExpire` DATE NULL,
    `forgotPasswordToken` VARCHAR(255) NULL,
    `forgotPasswordTokenExpire` DATE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teachers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `phone_number` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` VARCHAR(255) NOT NULL DEFAULT 'teacher',
    `gender` VARCHAR(255) NOT NULL,
    `designation` VARCHAR(255) NOT NULL,
    `department` VARCHAR(255) NOT NULL,
    `birth_day` VARCHAR(255) NOT NULL,
    `education` VARCHAR(255) NOT NULL,
    `joining_date` VARCHAR(255) NOT NULL,
    `accepted` TINYINT NOT NULL DEFAULT 0,
    `verified` TINYINT NOT NULL DEFAULT 0,
    `verifyToken` VARCHAR(255) NULL,
    `verifyTokenExpire` DATE NULL,
    `forgotPasswordToken` VARCHAR(255) NULL,
    `forgotPasswordTokenExpire` DATE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `phone_number` VARCHAR(255) NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` VARCHAR(255) NOT NULL DEFAULT 'student',
    `verified` TINYINT NOT NULL DEFAULT 0,
    `verifyToken` VARCHAR(255) NULL,
    `verifyTokenExpire` VARCHAR(255) NULL,
    `forgotPasswordToken` VARCHAR(255) NULL,
    `forgotPasswordTokenExpire` VARCHAR(255) NULL,
    `joining_date` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
