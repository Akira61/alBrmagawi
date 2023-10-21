-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 16, 2023 at 11:06 AM
-- Server version: 8.0.31
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `albrmagawi_school`
--

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int NOT NULL,
  `course_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `teacher` int NOT NULL,
  `thumbnail` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sections` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'section',
  `price` int DEFAULT NULL,
  `students` int NOT NULL DEFAULT '0',
  `public` tinyint NOT NULL DEFAULT '0',
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `course_id`, `teacher`, `thumbnail`, `title`, `description`, `sections`, `price`, `students`, `public`, `date`) VALUES
(1, '1695903795596', 5, '1697211415078.jpg', 'first course', 'null', 'section', 12, 0, 0, '2023-09-28'),
(2, '1695904544865', 5, '1695904544863optimized_large_thumb_stage.jpg', 'how to make 100$ a day', NULL, 'section', NULL, 0, 0, '2023-09-28'),
(3, '1695905196933', 5, '1695905196929-Darling in the franxx Otaku by cryptostate.jpeg', 'learn OOP for python', NULL, 'section', NULL, 0, 0, '2023-09-28'),
(4, '1696047595405', 5, NULL, 'how to fix a headset', NULL, 'section', NULL, 0, 0, '2023-09-30');

-- --------------------------------------------------------

--
-- Table structure for table `course_sections`
--

CREATE TABLE `course_sections` (
  `id` int NOT NULL,
  `section_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `course_id` int DEFAULT NULL,
  `section` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `course_sections`
--

INSERT INTO `course_sections` (`id`, `section_id`, `course_id`, `section`) VALUES
(5, '1696138669490', 1, 'second chapter'),
(6, '1696149601451', 1, 'OOP'),
(7, '1696915543722', 1, 'test-max');

-- --------------------------------------------------------

--
-- Table structure for table `ctfs`
--

CREATE TABLE `ctfs` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `thumbnail` varchar(255) NOT NULL,
  `level` varchar(255) NOT NULL,
  `rating` float NOT NULL,
  `userOwns` int NOT NULL,
  `systemOwns` int NOT NULL,
  `flag` varchar(255) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ctfs`
--

INSERT INTO `ctfs` (`id`, `title`, `thumbnail`, `level`, `rating`, `userOwns`, `systemOwns`, `flag`, `description`) VALUES
(1, 'Analytics', 'https://www.hackthebox.com/storage/avatars/f86fcf4c1cfcc690b43f43e100f89718.png', 'medium', 3.5, 3245, 343, 'flag{dsfjds434324324lfsjdr433424fj}', 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos neque rem itaque harum, perspiciatis ea quia voluptatem dolorum rerum pariatur, consequatur, aspernatur quis distinctio quo? Dolorem aut, neque non ex libero optio rerum delectus hic expedita illum, deserunt eos. Neque aut enim praesentium odio saepe! Porro facere voluptas, nemo enim, aspernatur ratione mollitia magnam libero magni, quia alias beatae id itaque sunt hic vel? Error animi ipsam delectus molestias, voluptatem, culpa ut temporibus consequuntur deserunt excepturi voluptates earum laborum obcaecati quod et explicabo quae tempora distinctio! Quia quaerat perspiciatis, sed itaque excepturi eos repellat saepe, tempore earum ipsam aliquam! Quaerat laudantium natus officia voluptatum, possimus consequatur obcaecati id reiciendis vero in exercitationem. Quis, explicabo perferendis? Odio ipsam consequatur iure numquam suscipit exercitationem illum quisquam sapiente veniam quasi saepe beatae delectus commodi nam, nulla minus modi eos. Dolore, officiis quo, quibusdam autem nesciunt reiciendis maiores, deleniti perferendis aperiam cum eum reprehenderit.');

-- --------------------------------------------------------

--
-- Table structure for table `lessons`
--

CREATE TABLE `lessons` (
  `id` int NOT NULL,
  `lesson_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `course_id` int NOT NULL,
  `section` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `blob_content` longblob,
  `thumbnail` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `public` tinyint NOT NULL DEFAULT '1',
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `lessons`
--

INSERT INTO `lessons` (`id`, `lesson_id`, `course_id`, `section`, `title`, `content`, `blob_content`, `thumbnail`, `content_type`, `description`, `public`, `date`) VALUES
(1, '34d2e74e-4e94-4089-a127-353e3cb106c5', 1, 1, 'lesson1', 'https://cdn.filestackcontent.com/4gXeaIRlSZa9rZMsyc6A', NULL, '/uploads/thumbnail-1696188783468-523397085DarlinginthefranxxOtakubycryptostate.jpeg', 'url', 'lesson1 description', 1, '2023-10-01'),
(3, '1697010573981', 1, 6, 'lesson 2', '1697010573959.mp4', NULL, NULL, 'url', '', 1, '2023-10-11'),
(4, '1697010644909', 1, 6, 'lesson 2', '1697010644886.mp4', NULL, NULL, 'url', '', 1, '2023-10-11'),
(5, '1697012174946', 1, 6, 'lesson 3', '1697012174937.mp4', NULL, NULL, 'url', NULL, 1, '2023-10-11');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int NOT NULL,
  `course_id` int NOT NULL,
  `user_id` int NOT NULL,
  `payment_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payment_data` json NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `quizzes`
--

CREATE TABLE `quizzes` (
  `id` int NOT NULL,
  `quiz_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lesson_id` int DEFAULT NULL,
  `course_id` int NOT NULL,
  `section` int NOT NULL,
  `question` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `answers` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `correct_answer` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `section_quiz` tinyint NOT NULL DEFAULT '0',
  `path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `id` int NOT NULL,
  `user_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'staff',
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `joining_date` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `verified` tinyint NOT NULL DEFAULT '1',
  `verifyToken` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `verifyTokenExpire` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `forgotPasswordToken` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `forgotPasswordTokenExpire` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`id`, `user_id`, `first_name`, `last_name`, `phone_number`, `email`, `role`, `password`, `joining_date`, `verified`, `verifyToken`, `verifyTokenExpire`, `forgotPasswordToken`, `forgotPasswordTokenExpire`) VALUES
(1, 'lfkjdslkfjd34234', 'member1', 'member1', '3456789876', 'member1@member1.com', 'CTO', 'fjdkfldfjldf', '9/26/2023', 1, NULL, NULL, NULL, NULL),
(2, 'ec89ded0-96e2-4a7f-81a5-ef804acfe8a2', 'member2', 'member2', '0544322312', 'member@member.com', 'superviser', '$2b$10$CkwysCJrOWAJmd3ghbfxruRgkWzoo56dOwVO/Hvev6Zyt086G55oC', 'Tue Sep 26 2023 16:33:28 GMT+0300 (Arabian Standard Time)', 1, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `id` int NOT NULL,
  `user_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'teacher',
  `gender` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `designation` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `department` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `birth_day` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `education` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `joining_date` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `accepted` tinyint NOT NULL DEFAULT '0',
  `verified` tinyint NOT NULL DEFAULT '0',
  `verifyToken` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `verifyTokenExpire` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `forgotPasswordToken` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `forgotPasswordTokenExpire` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`id`, `user_id`, `first_name`, `last_name`, `phone_number`, `email`, `password`, `role`, `gender`, `designation`, `department`, `birth_day`, `education`, `joining_date`, `accepted`, `verified`, `verifyToken`, `verifyTokenExpire`, `forgotPasswordToken`, `forgotPasswordTokenExpire`) VALUES
(3, '5e04eec2-956e-44c5-bcb4-e80c2b4c8985', 'teacher2', 'teacher', '0567755434', 'teacher2@teacher2.com', '$2b$10$/dLFYiA66uWOFpmD6/ioD.9.ExMNXVbYyRb3rNe1ZdNPeZXfBx1eG', 'teacher', 'male', 'test', 'php', '00/00/0000', 'dsf', 'Mon Sep 25 2023 07:00:41 GMT+0300 (Arabian Standard Time)', 0, 0, '$2b$10$.bD6kKaFd4ooO0Y5fc621e/qcXfz7vyYzJxpWaoLN2Nc0POBqYgV6', '1695877875100', NULL, NULL),
(4, '74793ab9-d786-478f-87cb-5b2d73b2e39a', 'teacher3', 'teacher', '0543322153', 'teacher3@teacher3.com', '$2b$10$uBaJuIdTuM3HyKttGc3F4ewasZZcFvvXl0Gc8TLGOems5zm3C1scm', 'teacher', 'male', 'developer', 'python', '00/00/0000', 'none', 'Mon Sep 25 2023 07:01:44 GMT+0300 (Arabian Standard Time)', 0, 0, '$2b$10$7ZmLRUkzlr57rv7OyDnoA.5NkpTqvu1O14oENJiSAyGamPW.sRWsC', '1695618104888', NULL, NULL),
(5, '53af5647-fe3e-4e7e-b105-7e4f9626e659', 'faahd', 'almansour', '+966599078059', 'dalege6691@fandsend.com', '$2b$10$CwbX8ikICAxMXv8aqzfkPOl1sI65lLiQ8Ee7CV2wNl.oZTYHtqan.', 'teacher', 'Male', 'test', 'mysql', '2023-09-13', 'trst', '2023-09-27 06:56:57.421', 0, 1, '$2b$10$/2A6sJq8XaehfDzTsUXDBOtBgvVYJu5d4bVzbjlDDfLe.Fov477FO', '1695803952191', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `user_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'student',
  `verified` tinyint NOT NULL DEFAULT '0',
  `verifyToken` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `verifyTokenExpire` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `forgotPasswordToken` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `forgotPasswordTokenExpire` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `joining_date` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_id`, `first_name`, `last_name`, `phone_number`, `email`, `password`, `role`, `verified`, `verifyToken`, `verifyTokenExpire`, `forgotPasswordToken`, `forgotPasswordTokenExpire`, `joining_date`) VALUES
(2, '926957a3-e7a1-4198-9f3f-fb7414bc667f', 'student1', 'student1', NULL, 'test@test.com', '$2b$10$M/12rkkxvEtnwkEW07AEz.JtSdk62xkDgzLBHVPsM63FlqvAD5k42', 'student', 1, NULL, NULL, NULL, NULL, 'Thu Sep 21 2023 16:54:45 GMT+0300 (Arabian Standard Time)'),
(8, '76e9dc87-951c-4cc4-a6a0-501104053f25', 'mohammad', 'khalid', NULL, 'jorad98215@ipniel.com', '$2b$10$BIiixJWf7x14cPUoLJEhz.Cszd5AMQrCV4rSzjd6UvSe35SYP7qhq', 'student', 1, 'undefined', 'undefined', 'undefined', 'undefined', 'Fri Sep 22 2023 07:42:38 GMT+0300 (Arabian Standard Time)');

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('374db4e2-2345-4545-83fd-ef7629d08d61', '27346605e6204cb30fb3b4ccc2a1eab426a5896ff1e0f87ed9a0504d1018e988', '2023-09-28 12:19:47.672', '20230928121947_update_courses_table_to_be_columns_null_by_default', NULL, NULL, '2023-09-28 12:19:47.587', 1),
('a47d8c42-13c8-42c4-8089-69b761d6c8f1', 'd9cc1e88dc288ae84efc7f9a4a10a0d2241e02f91139c184f1da3cc61a6bd829', '2023-09-21 14:01:28.509', '20230921140128_change_datatype_in_teachers_table_verify_token_expire_and_forgot_password_expire_to_string', NULL, NULL, '2023-09-21 14:01:28.479', 1),
('e5440742-cf02-404d-8e60-fcc5b7e26451', '5ae5017d46e8d603707c20289c02dc8d9d636fafbc061d37b0461fafc3eb5f73', '2023-09-21 13:58:39.803', '20230921135839_convert_datatype_for_verify_t_oken_expire_and_forgot_token_expite_to_string_in_teachers', NULL, NULL, '2023-09-21 13:58:39.758', 1),
('e6a35ce5-ab76-4b16-9f6e-1182576178fc', 'ee9af3422d7c25c9e64e29c43f25759ddb7cf6ca8d77f7fe026ca57973cba2cb', '2023-09-21 13:50:16.006', '20230921135015_retrive_data', NULL, NULL, '2023-09-21 13:50:15.815', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teacher_id` (`teacher`);

--
-- Indexes for table `course_sections`
--
ALTER TABLE `course_sections`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `section` (`section`),
  ADD KEY `section_courseID` (`course_id`);

--
-- Indexes for table `ctfs`
--
ALTER TABLE `ctfs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lessons`
--
ALTER TABLE `lessons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `courseID` (`course_id`),
  ADD KEY `lesson_section` (`section`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `quizzes`
--
ALTER TABLE `quizzes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `course` (`course_id`),
  ADD KEY `lessonID` (`lesson_id`),
  ADD KEY `sectionID` (`section`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `course_sections`
--
ALTER TABLE `course_sections`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `ctfs`
--
ALTER TABLE `ctfs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `lessons`
--
ALTER TABLE `lessons`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quizzes`
--
ALTER TABLE `quizzes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
