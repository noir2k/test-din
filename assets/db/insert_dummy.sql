BEGIN TRANSACTION;
INSERT INTO "test_din_history" ("name","sex","birth","patient","direction","volume_level","scoring","memo","sound_set","test_date","test_result","reg_timestamp") VALUES ('bong','M','19800101',12345678,'LR',0,0,NULL,0,20230505,'',1685600533847);
INSERT INTO "test_din_history" ("name","sex","birth","patient","direction","volume_level","scoring","memo","sound_set","test_date","test_result","reg_timestamp") VALUES ('bong','M','19800101',12345678,'LR',0,0,NULL,0,20230506,'',1685600533850);
COMMIT;
