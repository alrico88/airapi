/*
  Warnings:

  - You are about to drop the `airports` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "airports";

-- CreateTable
CREATE TABLE "Airport" (
    "id" SERIAL NOT NULL,
    "icao" VARCHAR(10) NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255),
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "elevation" INTEGER,
    "continent" VARCHAR(255) NOT NULL,
    "isoCountry" VARCHAR(255) NOT NULL,
    "isoRegion" VARCHAR(255) NOT NULL,
    "municipality" VARCHAR(255),

    CONSTRAINT "Airport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Runway" (
    "id" SERIAL NOT NULL,
    "airportRef" INTEGER NOT NULL,
    "airportIdent" TEXT NOT NULL,
    "length" INTEGER,
    "width" INTEGER,
    "surface" TEXT,
    "lighted" INTEGER NOT NULL,
    "closed" INTEGER NOT NULL,
    "leIdent" TEXT,
    "leLatitude" DOUBLE PRECISION,
    "leLongitude" DOUBLE PRECISION,
    "leElevation" INTEGER,
    "leHeading" INTEGER,
    "leDisplacedThreshold" INTEGER,
    "heIdent" TEXT,
    "heLatitude" DOUBLE PRECISION,
    "heLongitude" DOUBLE PRECISION,
    "heElevation" INTEGER,
    "heHeading" INTEGER,
    "heDisplacedThreshold" INTEGER,

    CONSTRAINT "Runway_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Airport_icao_key" ON "Airport"("icao");

-- AddForeignKey
ALTER TABLE "Runway" ADD CONSTRAINT "Runway_airportRef_fkey" FOREIGN KEY ("airportRef") REFERENCES "Airport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
