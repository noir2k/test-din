BEGIN TRANSACTION;
INSERT INTO test_din_history ("name","sex","birth","patient","direction","volume_level","scoring","memo","sound_set","test_date","test_result","reg_timestamp") VALUES ('bong','M','1980-01-01',12345678,'LR',0,'digit',NULL,0,'2023-05-07','',1685600533847);
INSERT INTO test_din_history ("name","sex","birth","patient","direction","volume_level","scoring","memo","sound_set","test_date","test_result","reg_timestamp") VALUES ('bong','M','1980-01-01',12345678,'LR',0,'tripet',NULL,0,'2023-05-08','',1685600533850);
INSERT INTO test_din_history ("name","sex","birth","patient","direction","volume_level","scoring","memo","sound_set","test_date","test_result","reg_timestamp") VALUES ('bong','M','1980-01-01',12345678,'LR',0,'tripet',NULL,0,'2023-05-09','',1685600533858);
COMMIT;
