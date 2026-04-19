/*
  Warnings:

  - You are about to alter the column `isFeatured` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Boolean`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL DEFAULT '',
    "endDate" TEXT,
    "endTime" TEXT,
    "venue" TEXT NOT NULL DEFAULT '',
    "address" TEXT NOT NULL DEFAULT '',
    "city" TEXT NOT NULL DEFAULT 'Lucknow',
    "organizer" TEXT NOT NULL DEFAULT '',
    "organizerUrl" TEXT,
    "imageUrl" TEXT,
    "registrationUrl" TEXT,
    "maxAttendees" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'upcoming',
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "tags" TEXT NOT NULL DEFAULT '',
    "categoryId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Event_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Event" ("address", "categoryId", "city", "createdAt", "date", "description", "endDate", "endTime", "id", "imageUrl", "isFeatured", "maxAttendees", "organizer", "organizerUrl", "registrationUrl", "slug", "status", "tags", "time", "title", "updatedAt", "venue") SELECT "address", "categoryId", "city", "createdAt", "date", "description", "endDate", "endTime", "id", "imageUrl", "isFeatured", "maxAttendees", "organizer", "organizerUrl", "registrationUrl", "slug", "status", "tags", "time", "title", "updatedAt", "venue" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
CREATE UNIQUE INDEX "Event_slug_key" ON "Event"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
