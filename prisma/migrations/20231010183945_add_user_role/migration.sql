-- CreateEnum
CREATE TYPE "user_roles" AS ENUM ('READ', 'FULL_ACCESS');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "user_roles" NOT NULL DEFAULT 'READ';
