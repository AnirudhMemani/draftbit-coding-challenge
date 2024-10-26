-- CreateTable
CREATE TABLE "Component" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "propsId" TEXT NOT NULL,

    CONSTRAINT "Component_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Props" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "marginAndPaddingId" TEXT NOT NULL,

    CONSTRAINT "Props_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prism" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "marginTop" TEXT DEFAULT '0',
    "marginBottom" TEXT DEFAULT '0',
    "marginLeft" TEXT DEFAULT '0',
    "marginRight" TEXT DEFAULT '0',
    "paddingTop" TEXT DEFAULT '0',
    "paddingBottom" TEXT DEFAULT '0',
    "paddingLeft" TEXT DEFAULT '0',
    "paddingRight" TEXT DEFAULT '0',

    CONSTRAINT "Prism_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Component_propsId_key" ON "Component"("propsId");

-- CreateIndex
CREATE UNIQUE INDEX "Props_marginAndPaddingId_key" ON "Props"("marginAndPaddingId");

-- AddForeignKey
ALTER TABLE "Component" ADD CONSTRAINT "Component_propsId_fkey" FOREIGN KEY ("propsId") REFERENCES "Props"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Props" ADD CONSTRAINT "Props_marginAndPaddingId_fkey" FOREIGN KEY ("marginAndPaddingId") REFERENCES "Prism"("id") ON DELETE CASCADE ON UPDATE CASCADE;
