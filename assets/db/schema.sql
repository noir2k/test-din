BEGIN TRANSACTION;
DROP TABLE IF EXISTS "test_din_history";
CREATE TABLE IF NOT EXISTS "test_din_history" (
	"id"	INTEGER NOT NULL UNIQUE,
	"name"	TEXT NOT NULL,
	"sex"	TEXT NOT NULL,
	"birth"	TEXT NOT NULL,
	"patient"	INTEGER NOT NULL,
	"direction"	TEXT NOT NULL,
	"volume_level"	INTEGER NOT NULL,
	"scoring"	INTEGER NOT NULL,
	"memo"	TEXT,
	"sound_set"	INTEGER NOT NULL,
	"test_date"	NUMERIC NOT NULL,
	"test_result"	REAL NOT NULL,
	"reg_timestamp"	INTEGER NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
COMMIT;
