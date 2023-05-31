/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import path from 'path';
import fs from 'fs';

import log from 'electron-log';

import initSqlJs from 'sql.js';
import type { Database, QueryExecResult } from 'sql.js';

export function resolveHtmlPath(htmlFileName: string) {
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

export const testDb = ( db: Database ) => {
  let stmt = `select * from test_din_history desc limit 1`;
  let res = db.exec(stmt);
  console.log(res);
  if (res.length === 0) {
    console.error("No Data Found!");
  } else {
    const resultArr = _rowsFromSqlDataArray(res[0]);
    console.log(resultArr);
  }
}

export const execSql = ( db: Database, filePath: string ) => {
  log.log('2. initTable', filePath);
  log.log(db);
  const sqlstr = fs.readFileSync(filePath, 'utf8');
  log.log('3. sqlstr', filePath);
  log.log(sqlstr);
  db.run(sqlstr);
}
