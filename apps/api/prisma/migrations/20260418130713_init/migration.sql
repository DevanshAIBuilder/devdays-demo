-- CreateTable
CREATE TABLE "Meetup" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Rsvp" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "meetupId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    CONSTRAINT "Rsvp_meetupId_fkey" FOREIGN KEY ("meetupId") REFERENCES "Meetup" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
