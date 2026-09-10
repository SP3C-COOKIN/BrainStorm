/*
  Warnings:

  - You are about to drop the column `notes` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `shortDescription` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `worldId` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `genre` on the `World` table. All the data in the column will be lost.
  - You are about to drop the `Note` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "QuickCaptureType" AS ENUM ('WORLD', 'CHARACTER', 'POWER', 'SCENE');

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_worldId_fkey";

-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_worldId_fkey";

-- AlterTable
ALTER TABLE "Character" DROP COLUMN "notes",
DROP COLUMN "shortDescription",
DROP COLUMN "worldId",
ADD COLUMN     "age" INTEGER,
ADD COLUMN     "appearance" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "hobbies" TEXT[],
ADD COLUMN     "interests" TEXT[],
ADD COLUMN     "occupation" TEXT,
ADD COLUMN     "personality" TEXT,
ADD COLUMN     "race" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "World" DROP COLUMN "genre";

-- DropTable
DROP TABLE "Note";

-- CreateTable
CREATE TABLE "Story" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "worldId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Story_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chapter" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "storyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Power" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Power_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scene" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Scene_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorldCharacter" (
    "worldId" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,

    CONSTRAINT "WorldCharacter_pkey" PRIMARY KEY ("worldId","characterId")
);

-- CreateTable
CREATE TABLE "WorldPower" (
    "worldId" TEXT NOT NULL,
    "powerId" TEXT NOT NULL,

    CONSTRAINT "WorldPower_pkey" PRIMARY KEY ("worldId","powerId")
);

-- CreateTable
CREATE TABLE "StoryCharacter" (
    "storyId" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    "age" INTEGER,
    "occupation" TEXT,
    "appearance" TEXT,
    "personality" TEXT,

    CONSTRAINT "StoryCharacter_pkey" PRIMARY KEY ("storyId","characterId")
);

-- CreateTable
CREATE TABLE "StoryPower" (
    "storyId" TEXT NOT NULL,
    "powerId" TEXT NOT NULL,

    CONSTRAINT "StoryPower_pkey" PRIMARY KEY ("storyId","powerId")
);

-- CreateTable
CREATE TABLE "StoryScene" (
    "storyId" TEXT NOT NULL,
    "sceneId" TEXT NOT NULL,

    CONSTRAINT "StoryScene_pkey" PRIMARY KEY ("storyId","sceneId")
);

-- CreateTable
CREATE TABLE "StoryCharacterPower" (
    "storyId" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    "powerId" TEXT NOT NULL,

    CONSTRAINT "StoryCharacterPower_pkey" PRIMARY KEY ("storyId","characterId","powerId")
);

-- CreateTable
CREATE TABLE "SceneWorld" (
    "sceneId" TEXT NOT NULL,
    "worldId" TEXT NOT NULL,

    CONSTRAINT "SceneWorld_pkey" PRIMARY KEY ("sceneId","worldId")
);

-- CreateTable
CREATE TABLE "CharacterScene" (
    "characterId" TEXT NOT NULL,
    "sceneId" TEXT NOT NULL,

    CONSTRAINT "CharacterScene_pkey" PRIMARY KEY ("characterId","sceneId")
);

-- CreateTable
CREATE TABLE "ScenePower" (
    "sceneId" TEXT NOT NULL,
    "powerId" TEXT NOT NULL,

    CONSTRAINT "ScenePower_pkey" PRIMARY KEY ("sceneId","powerId")
);

-- CreateTable
CREATE TABLE "QuickCapture" (
    "id" TEXT NOT NULL,
    "type" "QuickCaptureType" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "userId" TEXT NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuickCapture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuickCaptureWorld" (
    "quickCaptureId" TEXT NOT NULL,
    "worldId" TEXT NOT NULL,

    CONSTRAINT "QuickCaptureWorld_pkey" PRIMARY KEY ("quickCaptureId","worldId")
);

-- CreateTable
CREATE TABLE "QuickCaptureStory" (
    "quickCaptureId" TEXT NOT NULL,
    "storyId" TEXT NOT NULL,

    CONSTRAINT "QuickCaptureStory_pkey" PRIMARY KEY ("quickCaptureId","storyId")
);

-- CreateTable
CREATE TABLE "QuickCaptureCharacter" (
    "quickCaptureId" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,

    CONSTRAINT "QuickCaptureCharacter_pkey" PRIMARY KEY ("quickCaptureId","characterId")
);

-- CreateTable
CREATE TABLE "QuickCapturePower" (
    "quickCaptureId" TEXT NOT NULL,
    "powerId" TEXT NOT NULL,

    CONSTRAINT "QuickCapturePower_pkey" PRIMARY KEY ("quickCaptureId","powerId")
);

-- CreateTable
CREATE TABLE "QuickCaptureScene" (
    "quickCaptureId" TEXT NOT NULL,
    "sceneId" TEXT NOT NULL,

    CONSTRAINT "QuickCaptureScene_pkey" PRIMARY KEY ("quickCaptureId","sceneId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Chapter_storyId_order_key" ON "Chapter"("storyId", "order");

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_worldId_fkey" FOREIGN KEY ("worldId") REFERENCES "World"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Power" ADD CONSTRAINT "Power_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scene" ADD CONSTRAINT "Scene_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorldCharacter" ADD CONSTRAINT "WorldCharacter_worldId_fkey" FOREIGN KEY ("worldId") REFERENCES "World"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorldCharacter" ADD CONSTRAINT "WorldCharacter_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorldPower" ADD CONSTRAINT "WorldPower_worldId_fkey" FOREIGN KEY ("worldId") REFERENCES "World"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorldPower" ADD CONSTRAINT "WorldPower_powerId_fkey" FOREIGN KEY ("powerId") REFERENCES "Power"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoryCharacter" ADD CONSTRAINT "StoryCharacter_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoryCharacter" ADD CONSTRAINT "StoryCharacter_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoryPower" ADD CONSTRAINT "StoryPower_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoryPower" ADD CONSTRAINT "StoryPower_powerId_fkey" FOREIGN KEY ("powerId") REFERENCES "Power"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoryScene" ADD CONSTRAINT "StoryScene_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoryScene" ADD CONSTRAINT "StoryScene_sceneId_fkey" FOREIGN KEY ("sceneId") REFERENCES "Scene"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoryCharacterPower" ADD CONSTRAINT "StoryCharacterPower_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoryCharacterPower" ADD CONSTRAINT "StoryCharacterPower_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoryCharacterPower" ADD CONSTRAINT "StoryCharacterPower_powerId_fkey" FOREIGN KEY ("powerId") REFERENCES "Power"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SceneWorld" ADD CONSTRAINT "SceneWorld_sceneId_fkey" FOREIGN KEY ("sceneId") REFERENCES "Scene"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SceneWorld" ADD CONSTRAINT "SceneWorld_worldId_fkey" FOREIGN KEY ("worldId") REFERENCES "World"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterScene" ADD CONSTRAINT "CharacterScene_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterScene" ADD CONSTRAINT "CharacterScene_sceneId_fkey" FOREIGN KEY ("sceneId") REFERENCES "Scene"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScenePower" ADD CONSTRAINT "ScenePower_sceneId_fkey" FOREIGN KEY ("sceneId") REFERENCES "Scene"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScenePower" ADD CONSTRAINT "ScenePower_powerId_fkey" FOREIGN KEY ("powerId") REFERENCES "Power"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuickCapture" ADD CONSTRAINT "QuickCapture_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuickCaptureWorld" ADD CONSTRAINT "QuickCaptureWorld_quickCaptureId_fkey" FOREIGN KEY ("quickCaptureId") REFERENCES "QuickCapture"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuickCaptureWorld" ADD CONSTRAINT "QuickCaptureWorld_worldId_fkey" FOREIGN KEY ("worldId") REFERENCES "World"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuickCaptureStory" ADD CONSTRAINT "QuickCaptureStory_quickCaptureId_fkey" FOREIGN KEY ("quickCaptureId") REFERENCES "QuickCapture"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuickCaptureStory" ADD CONSTRAINT "QuickCaptureStory_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuickCaptureCharacter" ADD CONSTRAINT "QuickCaptureCharacter_quickCaptureId_fkey" FOREIGN KEY ("quickCaptureId") REFERENCES "QuickCapture"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuickCaptureCharacter" ADD CONSTRAINT "QuickCaptureCharacter_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuickCapturePower" ADD CONSTRAINT "QuickCapturePower_quickCaptureId_fkey" FOREIGN KEY ("quickCaptureId") REFERENCES "QuickCapture"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuickCapturePower" ADD CONSTRAINT "QuickCapturePower_powerId_fkey" FOREIGN KEY ("powerId") REFERENCES "Power"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuickCaptureScene" ADD CONSTRAINT "QuickCaptureScene_quickCaptureId_fkey" FOREIGN KEY ("quickCaptureId") REFERENCES "QuickCapture"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuickCaptureScene" ADD CONSTRAINT "QuickCaptureScene_sceneId_fkey" FOREIGN KEY ("sceneId") REFERENCES "Scene"("id") ON DELETE CASCADE ON UPDATE CASCADE;
