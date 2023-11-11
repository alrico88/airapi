-- CreateTable
CREATE TABLE "airports" (
    "id" INTEGER NOT NULL,
    "ident" VARCHAR(10) NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255),
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "elevation" INTEGER,
    "continent" VARCHAR(255) NOT NULL,
    "iso_country" VARCHAR(255) NOT NULL,
    "iso_region" VARCHAR(255) NOT NULL,
    "municipality" VARCHAR(255),

    CONSTRAINT "airports_pkey" PRIMARY KEY ("id")
);
