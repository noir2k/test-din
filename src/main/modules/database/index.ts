import log from 'electron-log';

import type { Database, QueryExecResult } from 'sql.js';
import { getAssetPath } from '../../main';

const initSqlJs = require('sql.js');

const tbName = 'test_din_history';

export interface ColumnType {
  id: number;
  user_name: string;
  gender: string;
  birthday: string;
  patient_no: string;
  tester_name: string;
  receiver: string;
  fixed_type: string;
  direction: string;
  volume_level: number;
  scoring: string;
  memo: string;
  sound_set: number;
  test_datetime: string;
  test_result: number;
  reg_timestamp: number;
}

export const ColumnName = {
  id: 'id',
  user_name: 'user_name',
  gender: 'gender',
  birthday: 'birthday',
  patient_no: 'patient_no',
  tester_name: 'tester_name',
  receiver: 'receiver',
  fixed_type: 'fixed_type',
  direction: 'direction',
  volume_level: 'volume_level',
  scoring: 'scoring',
  memo: 'memo',
  sound_set: 'sound_set',
  test_datetime: 'test_datetime',
  test_result: 'test_result',
  reg_timestamp: 'reg_timestamp',
};

const _rowsFromSqlDataArray = (queryExecResult: QueryExecResult) => {
  const data = [];
  let i = 0;
  let j = 0;
  for (const valueArray of queryExecResult.values) {
    data[i] = {};
    j = 0;
    // eslint-disable-next-line
    for (const column of queryExecResult.columns) {
      Object.assign(data[i], { [column]: valueArray[j] });
      j++;
    }
    i++;
  }

  return data;
};

const _resultData = (queryExecResults: QueryExecResult[]) => {
  let resultArr;
  if (queryExecResults.length === 0) {
    log.error('No Data Found!');
  } else {
    resultArr = _rowsFromSqlDataArray(queryExecResults[0]);
  }

  return resultArr;
};

const _checkRegexSql = (queryText: string) => {
  const regexPattern: RegExp =
    /^BEGIN TRANSACTION;\n(?:INSERT INTO ["']?test_din_history["']?.*;\n)*COMMIT;$/;

  const qry = queryText.replace(/\n$/, '');
  log.log('queryText', qry, regexPattern.test(qry));
  return regexPattern.test(qry);
};

// NOT USED
export const writeDb = (fs: typeof import('fs'), db: Database) => {
  const data = db.export();
  fs.writeFileSync(getAssetPath('/db/test-din.db'), Buffer.from(data));
};

export const createDb = async (): Promise<any> => {
  const SQL = await initSqlJs();

  return new SQL.Database();
  // return initSqlJs()
  //   .then((SQL: any) => {
  //     log.info('Create Database');
  //     return new SQL.Database();
  //   })
  //   .catch((err: any) => {
  //     log.error('Create Database Error', err);
  //     return null;
  //   });
};

export const initDbTable = async (fs: typeof import('fs'), db: Database) => {
  const sqlstr = fs.readFileSync(getAssetPath('/db/schema.sql'), 'utf8');
  db.run(sqlstr);
};

export const findAll = (db: Database) => {
  const sqlstr = `SELECT * FROM ${tbName}`;
  const res = db.exec(sqlstr);
  return res;
};

export const rowCount = (db: Database) => {
  const sqlstr = `SELECT COUNT(id) FROM ${tbName} LIMIT 1`;

  const res = db.exec(sqlstr);
  return res[0].values[0][0];
};

export const findByRegDate = (db: Database, offset?: string) => {
  let sqlstr = `SELECT * FROM ${tbName} ORDER BY ${ColumnName.reg_timestamp} DESC LIMIT 15`;
  let offsetStr = offset;
  if (offset === undefined) {
    offsetStr = '0';
  }
  sqlstr += ` OFFSET ${offsetStr}`;

  const res = db.exec(sqlstr);
  return _resultData(res);
};

export const loadFromSql = (
  fs: typeof import('fs'),
  db: Database,
  filePath: string
) => {
  const sqlstr = fs.readFileSync(filePath, 'utf8');

  if (_checkRegexSql(sqlstr)) {
    log.info('check regex OK');
    initDbTable(fs, db);
    db.run(sqlstr);
    return findByRegDate(db);
  }
  log.error('check regex NOT OK');
  return null;
};

export const getGraphData = (db: Database) => {
  const sqlstr = `SELECT
    ${ColumnName.id},
    ${ColumnName.direction},
    ${ColumnName.scoring},
    ${ColumnName.test_datetime},
    ${ColumnName.test_result},
    ${ColumnName.reg_timestamp}
  FROM ${tbName} ORDER BY ${ColumnName.reg_timestamp} DESC LIMIT 6`;

  const res = db.exec(sqlstr);
  return _resultData(res);
};

export const insertData = (db: Database, data: ColumnType) => {
  let sqlstr = `BEGIN TRANSACTION;\n`;
  sqlstr += `INSERT INTO ${tbName} (
    ${ColumnName.id},
    ${ColumnName.user_name},
    ${ColumnName.gender},
    ${ColumnName.birthday},
    ${ColumnName.patient_no},
    ${ColumnName.direction},
    ${ColumnName.volume_level},
    ${ColumnName.scoring},
    ${ColumnName.memo},
    ${ColumnName.sound_set},
    ${ColumnName.test_datetime},
    ${ColumnName.test_result},
    ${ColumnName.reg_timestamp}
    ) VALUES (
    ${data.id},
    ${data.user_name},
    ${data.gender},
    ${data.birthday},
    ${data.patient_no},
    ${data.direction},
    ${data.volume_level},
    ${data.scoring},
    ${data.memo},
    ${data.sound_set},
    ${data.test_datetime},
    ${data.test_result},
    ${data.reg_timestamp}
    );\n`;
  sqlstr += `COMMIT;`;

  db.run(sqlstr);
  return findByRegDate(db);
};

export const deleteData = (db: Database, id: string) => {
  let sqlstr = `BEGIN TRANSACTION;\n`;
  sqlstr += `DELETE FROM ${tbName} WHERE ${ColumnName.id} = ${id};\n`;
  sqlstr += `COMMIT;`;

  db.run(sqlstr);
  return findByRegDate(db);
};

export const updateUserName = (db: Database, userName: string) => {
  let sqlstr = `BEGIN TRANSACTION;\n`;
  sqlstr += `UPDATE ${tbName} SET ${ColumnName.user_name} = '${userName}';\n`;
  sqlstr += `COMMIT;`;

  db.run(sqlstr);
  return findByRegDate(db);
};

export const generateInsertQueryFromSelect = (
  selectResult: QueryExecResult[]
) => {
  const columns = Object.values(selectResult[0].columns);
  const values = Object.values(selectResult[0].values);

  let insertQuery = `BEGIN TRANSACTION;\n`;
  for (const value of values) {
    insertQuery += `INSERT INTO ${tbName} (`;
    for (const column of columns) {
      insertQuery += `'${column}', `;
    }
    insertQuery = `${insertQuery.slice(0, -2)}) VALUES (`;
    for (const v of value) {
      insertQuery += typeof v === 'string' ? `'${v}', ` : `${v}, `;
    }
    insertQuery = `${insertQuery.slice(0, -2)});\n`;
  }
  insertQuery += `COMMIT;`;

  return insertQuery;
};

export const isExistFile = (fs: typeof import('fs'), filePath: string) => {
  return fs.existsSync(filePath);
};

export const saveFile = (
  fs: typeof import('fs'),
  filePath: string,
  queryText: string
) => {
  try {
    fs.writeFileSync(filePath, queryText, 'utf8');
    log.log('File saved:', filePath);
    return true;
  } catch (error) {
    log.error('Error saving file:', error);
    return false;
  }
};

export const testDb = (db: Database) => {
  const sqlstr = `select * from ${tbName} limit 1`;
  const res = db.exec(sqlstr);

  _resultData(res);
};
