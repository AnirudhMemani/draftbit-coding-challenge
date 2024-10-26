/*
  Warnings:

  - You are about to drop the `Prism` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UnitType" AS ENUM ('PIXELS', 'PERCENTAGE', 'AUTO');

-- DropForeignKey
ALTER TABLE "Props" DROP CONSTRAINT "Props_marginAndPaddingId_fkey";

-- DropTable
DROP TABLE "Prism";

-- CreateTable
CREATE TABLE "MarginAndPadding" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "marginTop" DECIMAL(65,30) DEFAULT 0,
    "marginBottom" DECIMAL(65,30) DEFAULT 0,
    "marginLeft" DECIMAL(65,30) DEFAULT 0,
    "marginRight" DECIMAL(65,30) DEFAULT 0,
    "paddingTop" DECIMAL(65,30) DEFAULT 0,
    "paddingBottom" DECIMAL(65,30) DEFAULT 0,
    "paddingLeft" DECIMAL(65,30) DEFAULT 0,
    "paddingRight" DECIMAL(65,30) DEFAULT 0,
    "marginTopUnit" "UnitType" DEFAULT 'PIXELS',
    "marginBottomUnit" "UnitType" DEFAULT 'PIXELS',
    "marginLeftUnit" "UnitType" DEFAULT 'PIXELS',
    "marginRightUnit" "UnitType" DEFAULT 'PIXELS',
    "paddingTopUnit" "UnitType" DEFAULT 'PIXELS',
    "paddingBottomUnit" "UnitType" DEFAULT 'PIXELS',
    "paddingLeftUnit" "UnitType" DEFAULT 'PIXELS',
    "paddingRightUnit" "UnitType" DEFAULT 'PIXELS',

    CONSTRAINT "MarginAndPadding_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Props" ADD CONSTRAINT "Props_marginAndPaddingId_fkey" FOREIGN KEY ("marginAndPaddingId") REFERENCES "MarginAndPadding"("id") ON DELETE CASCADE ON UPDATE CASCADE;
