/*
  Warnings:

  - You are about to drop the column `workSpaceId` on the `Folder` table. All the data in the column will be lost.
  - You are about to drop the column `workSpaceId` on the `Invite` table. All the data in the column will be lost.
  - You are about to drop the column `workSpaceId` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `workSpaceId` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the `WorkSpace` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `workspaceId` to the `Folder` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_workSpaceId_fkey";

-- DropForeignKey
ALTER TABLE "Invite" DROP CONSTRAINT "Invite_workSpaceId_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_workSpaceId_fkey";

-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_workSpaceId_fkey";

-- DropForeignKey
ALTER TABLE "WorkSpace" DROP CONSTRAINT "WorkSpace_userId_fkey";

-- AlterTable
ALTER TABLE "Folder" DROP COLUMN "workSpaceId",
ADD COLUMN     "workspaceId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Invite" DROP COLUMN "workSpaceId",
ADD COLUMN     "workspaceId" UUID;

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "workSpaceId",
ADD COLUMN     "workspaceId" UUID;

-- AlterTable
ALTER TABLE "Video" DROP COLUMN "workSpaceId",
ADD COLUMN     "workspaceId" UUID;

-- DropTable
DROP TABLE "WorkSpace";

-- CreateTable
CREATE TABLE "workspace" (
    "id" UUID NOT NULL,
    "type" "Type" NOT NULL,
    "name" TEXT NOT NULL,
    "userId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "workspace_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "workspace" ADD CONSTRAINT "workspace_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspace"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspace"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspace"("id") ON DELETE SET NULL ON UPDATE CASCADE;
