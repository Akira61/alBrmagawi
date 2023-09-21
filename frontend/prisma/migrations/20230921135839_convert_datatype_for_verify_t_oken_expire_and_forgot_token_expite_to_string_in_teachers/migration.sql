-- AlterTable
ALTER TABLE `staff` MODIFY `verifyTokenExpire` VARCHAR(255) NULL,
    MODIFY `forgotPasswordTokenExpire` VARCHAR(255) NULL;
