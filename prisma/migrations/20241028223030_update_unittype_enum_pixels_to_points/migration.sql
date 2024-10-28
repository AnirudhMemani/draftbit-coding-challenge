/*
  Warnings:

  - The values [PIXELS] on the enum `UnitType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UnitType_new" AS ENUM ('POINTS', 'PERCENTAGE', 'AUTO');
ALTER TABLE "MarginAndPadding" ALTER COLUMN "marginBottomUnit" DROP DEFAULT;
ALTER TABLE "MarginAndPadding" ALTER COLUMN "marginLeftUnit" DROP DEFAULT;
ALTER TABLE "MarginAndPadding" ALTER COLUMN "marginRightUnit" DROP DEFAULT;
ALTER TABLE "MarginAndPadding" ALTER COLUMN "marginTopUnit" DROP DEFAULT;
ALTER TABLE "MarginAndPadding" ALTER COLUMN "paddingBottomUnit" DROP DEFAULT;
ALTER TABLE "MarginAndPadding" ALTER COLUMN "paddingLeftUnit" DROP DEFAULT;
ALTER TABLE "MarginAndPadding" ALTER COLUMN "paddingRightUnit" DROP DEFAULT;
ALTER TABLE "MarginAndPadding" ALTER COLUMN "paddingTopUnit" DROP DEFAULT;
ALTER TABLE "MarginAndPadding" ALTER COLUMN "marginTopUnit" TYPE "UnitType_new" USING ("marginTopUnit"::text::"UnitType_new");
ALTER TABLE "MarginAndPadding" ALTER COLUMN "marginBottomUnit" TYPE "UnitType_new" USING ("marginBottomUnit"::text::"UnitType_new");
ALTER TABLE "MarginAndPadding" ALTER COLUMN "marginLeftUnit" TYPE "UnitType_new" USING ("marginLeftUnit"::text::"UnitType_new");
ALTER TABLE "MarginAndPadding" ALTER COLUMN "marginRightUnit" TYPE "UnitType_new" USING ("marginRightUnit"::text::"UnitType_new");
ALTER TABLE "MarginAndPadding" ALTER COLUMN "paddingTopUnit" TYPE "UnitType_new" USING ("paddingTopUnit"::text::"UnitType_new");
ALTER TABLE "MarginAndPadding" ALTER COLUMN "paddingBottomUnit" TYPE "UnitType_new" USING ("paddingBottomUnit"::text::"UnitType_new");
ALTER TABLE "MarginAndPadding" ALTER COLUMN "paddingLeftUnit" TYPE "UnitType_new" USING ("paddingLeftUnit"::text::"UnitType_new");
ALTER TABLE "MarginAndPadding" ALTER COLUMN "paddingRightUnit" TYPE "UnitType_new" USING ("paddingRightUnit"::text::"UnitType_new");
ALTER TYPE "UnitType" RENAME TO "UnitType_old";
ALTER TYPE "UnitType_new" RENAME TO "UnitType";
DROP TYPE "UnitType_old";
ALTER TABLE "MarginAndPadding" ALTER COLUMN "marginBottomUnit" SET DEFAULT 'POINTS';
ALTER TABLE "MarginAndPadding" ALTER COLUMN "marginLeftUnit" SET DEFAULT 'POINTS';
ALTER TABLE "MarginAndPadding" ALTER COLUMN "marginRightUnit" SET DEFAULT 'POINTS';
ALTER TABLE "MarginAndPadding" ALTER COLUMN "marginTopUnit" SET DEFAULT 'POINTS';
ALTER TABLE "MarginAndPadding" ALTER COLUMN "paddingBottomUnit" SET DEFAULT 'POINTS';
ALTER TABLE "MarginAndPadding" ALTER COLUMN "paddingLeftUnit" SET DEFAULT 'POINTS';
ALTER TABLE "MarginAndPadding" ALTER COLUMN "paddingRightUnit" SET DEFAULT 'POINTS';
ALTER TABLE "MarginAndPadding" ALTER COLUMN "paddingTopUnit" SET DEFAULT 'POINTS';
COMMIT;

-- AlterTable
ALTER TABLE "MarginAndPadding" ALTER COLUMN "marginTopUnit" SET DEFAULT 'POINTS',
ALTER COLUMN "marginBottomUnit" SET DEFAULT 'POINTS',
ALTER COLUMN "marginLeftUnit" SET DEFAULT 'POINTS',
ALTER COLUMN "marginRightUnit" SET DEFAULT 'POINTS',
ALTER COLUMN "paddingTopUnit" SET DEFAULT 'POINTS',
ALTER COLUMN "paddingBottomUnit" SET DEFAULT 'POINTS',
ALTER COLUMN "paddingLeftUnit" SET DEFAULT 'POINTS',
ALTER COLUMN "paddingRightUnit" SET DEFAULT 'POINTS';
