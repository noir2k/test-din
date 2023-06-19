import { URL } from 'url';
import path from 'path';
import fs from 'fs';
import { getAssetPath } from './main';

import log from 'electron-log';

import type { Database, QueryExecResult } from 'sql.js';
const initSqlJs = require('sql.js');

const tbName = 'test_din_history';

export type ConfigSchemaType = {
  soundInterval?: number;
};

export const defaultConfig: ConfigSchemaType = {
  soundInterval: 3,
};

export interface ColumnType {
  id: Number;
  user_name: string;
  gender: string;
  birthday: string;
  patient_no: string;
  direction: string;
  volume_level: Number;
  scoring: string;
  memo: string;
  sound_set: Number;
  test_date: string;
  test_result: Number;
  reg_timestamp: Number;
}

export const ColumnName = {
  id: 'id',
  user_name: 'user_name',
  gender: 'gender',
  birthday: 'birthday',
  patient_no: 'patient_no',
  direction: 'direction',
  volume_level: 'volume_level',
  scoring: 'scoring',
  memo: 'memo',
  sound_set: 'sound_set',
  test_date: 'test_date',
  test_result: 'test_result',
  reg_timestamp: 'reg_timestamp',
};

export const resolveHtmlPath = (htmlFileName: string) => {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }

  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
};

const _rowsFromSqlDataArray = (queryExecResult: QueryExecResult) => {
  let data = [];
  let i = 0;
  let j = 0;
  for (let valueArray of queryExecResult.values) {
    data[i] = {};
    j = 0;
    for (let column of queryExecResult.columns) {
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

  queryText = queryText.replace(/\n$/, '');
  log.log("queryText", queryText, regexPattern.test(queryText));
  return true; //regexPattern.test(queryText);
};

// NOT USED
export const writeDb = (db: Database) => {
  const data = db.export();
  fs.writeFileSync(getAssetPath('/db/test-din.db'), Buffer.from(data));
};

export const createDb = async (): Promise<any> => {
  const SQL = await initSqlJs();
  // return new SQL.Database();
  return initSqlJs()
    .then((SQL: any) => {
      log.info('Create Database');
      return new SQL.Database();
    })
    .catch((err: any) => {
      log.error('Create Database Error', err);
      return null;
    });
};

export const initDbTable = async (db: Database) => {
  const sqlstr = fs.readFileSync(getAssetPath('/db/schema.sql'), 'utf8');
  db.run(sqlstr);
};

export const loadFromSql = (db: Database, filePath: string) => {
  const sqlstr = fs.readFileSync(filePath, 'utf8');

  if (_checkRegexSql(sqlstr)) {
    log.info('check regex OK');
    initDbTable(db);
    db.run(sqlstr);
    return findByRegDate(db);
  } else {
    log.error('check regex NOT OK');
    return null;
  }
};

export const findAll = (db: Database) => {
  let sqlstr = `SELECT * FROM ${tbName}`;
  const res = db.exec(sqlstr);
  return res;
};

export const rowCount = (db: Database) => {
  let sqlstr = `SELECT COUNT(id) FROM ${tbName} LIMIT 1`;

  const res = db.exec(sqlstr);
  return res[0].values[0][0];
};

export const findByRegDate = (db: Database, offset?: string) => {
  let sqlstr = `SELECT * FROM ${tbName} ORDER BY ${ColumnName.reg_timestamp} DESC LIMIT 10`;
  if (offset === undefined) {
    offset = '0';
  }
  sqlstr += ` OFFSET ${offset}`;

  const res = db.exec(sqlstr);
  return _resultData(res);
};

export const getGraphData = (db: Database) => {
  let sqlstr = `SELECT
    ${ColumnName.id},
    ${ColumnName.direction},
    ${ColumnName.scoring},
    ${ColumnName.test_date},
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
    ${ColumnName.test_date},
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
    ${data.test_date},
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
    insertQuery = insertQuery.slice(0, -2) + `) VALUES (`;
    for (const v of value) {
      insertQuery += typeof v === 'string' ? `'${v}', ` : `${v}, `;
    }
    insertQuery = insertQuery.slice(0, -2) + `);\n`;
  }
  insertQuery += `COMMIT;`;

  return insertQuery;
};

export const isExistFile = (filePath: string) => {
  return fs.existsSync(filePath);
};

export const saveFile = (filePath: string, queryText: string) => {
  let result = false;
  try {
    fs.writeFileSync(filePath, queryText, 'utf8');
    log.log('File saved:', filePath);
    result = true;
  } catch (error) {
    log.error('Error saving file:', error);
  } finally {
    return result;
  }
};

export const testDb = (db: Database) => {
  let sqlstr = `select * from ${tbName} limit 1`;
  let res = db.exec(sqlstr);

  _resultData(res);
};
