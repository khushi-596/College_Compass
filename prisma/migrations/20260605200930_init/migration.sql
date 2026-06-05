-- CreateTable
CREATE TABLE "College" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "fees" INTEGER NOT NULL,
    "rating" REAL NOT NULL,
    "placements" INTEGER NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "fees" INTEGER NOT NULL,
    "collegeId" TEXT NOT NULL,
    CONSTRAINT "Course_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "College_name_key" ON "College"("name");

-- CreateIndex
CREATE INDEX "College_location_idx" ON "College"("location");

-- CreateIndex
CREATE INDEX "College_fees_idx" ON "College"("fees");

-- CreateIndex
CREATE INDEX "College_rating_idx" ON "College"("rating");

-- CreateIndex
CREATE INDEX "Course_collegeId_idx" ON "Course"("collegeId");
