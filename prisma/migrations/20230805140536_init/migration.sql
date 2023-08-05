-- CreateTable
CREATE TABLE "Note" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Note_title_key" ON "Note"("title");
