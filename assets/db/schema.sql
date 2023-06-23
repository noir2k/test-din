BEGIN TRANSACTION;
DROP TABLE IF EXISTS "test_din_history";
CREATE TABLE IF NOT EXISTS "test_din_history" (
	"id" INTEGER NOT NULL UNIQUE,
	"user_name" TEXT NOT NULL,
	"gender" TEXT NOT NULL,
	"birthday" TEXT NOT NULL,
	"patient_no" TEXT NOT NULL,
  "tester_name": TEXT NOT NULL,
  "reciever": TEXT NOT NULL,
  "fixed_type": TEXT NOT NULL,
	"direction"	TEXT NOT NULL,
	"volume_level" INTEGER NOT NULL,
	"scoring"	TEXT NOT NULL,
	"memo" TEXT,
	"sound_set"	INTEGER NOT NULL,
	"test_date"	TEXT,
	"test_result"	REAL,
	"reg_timestamp"	INTEGER NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);

COMMIT;
