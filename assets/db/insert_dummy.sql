BEGIN TRANSACTION;
INSERT INTO test_din_history ("user_name","gender","birthday","patient_no","direction","volume_level","scoring","memo","sound_set","test_datetime","test_result","reg_timestamp") VALUES ('bong','M','1980-01-01','12345678','LR',0,'digit',NULL,0,'2023-05-05','',1685600533847);
INSERT INTO test_din_history ("user_name","gender","birthday","patient_no","direction","volume_level","scoring","memo","sound_set","test_datetime","test_result","reg_timestamp") VALUES ('bong','M','1980-01-01','12345678','LR',0,'triplet',NULL,0,'2023-05-06','',1685600533850);
COMMIT;
