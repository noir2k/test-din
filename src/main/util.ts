import { URL } from 'url';
import path from 'path';
import fs from 'fs';
import { getAssetPath } from './main';

import log from 'electron-log';

import initSqlJs from 'sql.js';
import type { Database, QueryExecResult } from 'sql.js';

const tbName = 'test_din_history';
export interface ColumnType {
  id: Number,
	name: string,
	sex: string,
	birth: string,
	patient: Number,
	direction: string,
	volume_level: Number,
	scoring: string,
	memo: string,
	sound_set: Number,
	test_date: string,
	test_result: Number,
	reg_timestamp: Number,
}

const col = {
  id: 'id',
	user_name: 'name',
	sex: 'sex',
	birth: 'birth',
	patient: 'patient',
	direction: 'direction',
	volume_level: 'volume_level',
	scoring: 'scoring',
	memo: 'memo',
	sound_set: 'sound_set',
	test_date: 'test_date',
	test_result: 'test_result',
	reg_timestamp: 'reg_timestamp',
}

export const resolveHtmlPath = (htmlFileName: string) => {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}

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

const _resultData = ( queryExecResults: QueryExecResult[] ) => {
  let resultArr;
  if (queryExecResults.length === 0) {
    log.error("No Data Found!");
  } else {
    resultArr = _rowsFromSqlDataArray(queryExecResults[0]);
  }
  log.log(resultArr);
  return resultArr;
}

// NOT USED
export const writeDb = (db: Database) => {
  const data = db.export();
  fs.writeFileSync(getAssetPath('/db/test-din.db'), Buffer.from(data));
}

export const createDb = async (): Promise<any> => {
  return initSqlJs().then((SQL) => {
    // const db = new SQL.Database(fs.readFileSync(filePath));
    log.info('Create Database');
    return new SQL.Database();
  })
  .catch((err) => {
    log.error('Create Database Error', err);
    return null;
  });
}

export const initDbTable = (db: Database) => {
  const sqlstr = fs.readFileSync(getAssetPath('/db/schema.sql'), 'utf8');
  db.run(sqlstr);
}

export const loadFromSql = (db: Database, filePath: string) => {
  initDbTable(db);
  const sqlstr = fs.readFileSync(filePath, 'utf8');
  db.run(sqlstr);
  return findByRegDate(db);
}

export const findAll = (db: Database) => {
  let sqlstr = `SELECT * FROM ${tbName}`;
  const res = db.exec(sqlstr);
  return _resultData(res);
}

export const findByRegDate = (db: Database, offset?: string) => {
  let sqlstr = `SELECT * FROM ${tbName} ORDER BY ${col.reg_timestamp} DESC LIMIT 10`;
  if (offset === undefined) {
    offset = '0';
  }
  sqlstr += ` offset ${offset}`;
  const res = db.exec(sqlstr);

  return _resultData(res);
}

export const getGraphData = (db: Database) => {
  let sqlstr = `SELECT
    ${col.id},
    ${col.direction},
    ${col.scoring},
    ${col.test_date},
    ${col.test_result},
    ${col.reg_timestamp}
  FROM ${tbName} ORDER BY ${col.reg_timestamp} DESC LIMIT 6`;
  const res = db.exec(sqlstr);

  return _resultData(res);
}

export const insertData = (db: Database, data: ColumnType) => {
  let sqlstr = `BEGIN TRANSACTION;\n`;
  sqlstr += `INSERT INTO ${tbName} (
    ${col.id},
    ${col.user_name},
    ${col.sex},
    ${col.birth},
    ${col.patient},
    ${col.direction},
    ${col.volume_level},
    ${col.scoring},
    ${col.memo},
    ${col.sound_set},
    ${col.test_date},
    ${col.test_result},
    ${col.reg_timestamp}
    ) VALUES (
    ${data.id},
    ${data.name},
    ${data.sex},
    ${data.birth},
    ${data.patient},
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
}

export const deleteData = (db: Database, data: ColumnType, id: string) => {
  let sqlstr = `BEGIN TRANSACTION;\n`;
  sqlstr += `DELETE FROM ${tbName} WHERE ${col.id} = ${id} LIMIT 1;\n`;
  sqlstr += `COMMIT;`;

  db.run(sqlstr);
  return findByRegDate(db);
}

export const generateInsertQueryFromSelect = (selectResult: QueryExecResult[]) => {
  log.log(selectResult);
  const columns = Object.keys(selectResult[0]);

  let insertQuery = `INSERT INTO table (`;
  // for (const column of columns) {
  //   insertQuery += `${column},`;
  // }
  // insertQuery = insertQuery.slice(0, -1) + `) VALUES (`;

  // Add the values from the SELECT result to the INSERT query
  // for (const row of selectResult) {
  //   for (const column of columns) {
  //     insertQuery += `${row[column]},`;
  //   }
  //   insertQuery = insertQuery.slice(0, -1) + `);`;
  // }

  // Return the INSERT query
  return insertQuery;

}

export const isExistFile = (filePath: string) => {
  return fs.existsSync(filePath);
}

export const saveFile = (filePath: string, queryText: string) => {
  let result = false;
  try {
    fs.writeFileSync(filePath, queryText, 'utf8');
    log.log("File saved:", filePath);
    result = true;
  } catch (error) {
    log.error("Error saving file:", error);
  } finally {
    return result;
  }
}

export const testDb = ( db: Database ) => {
  let sqlstr = `select * from ${tbName} limit 1`;
  let res = db.exec(sqlstr);

  _resultData(res);
}
