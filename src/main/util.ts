/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import path from 'path';
import fs from 'fs';

import initSqlJs from 'sql.js';
import type { QueryExecResult } from 'sql.js';

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

export const loadDb = ( filePath: string ) => {
  initSqlJs().then(function (SQL) {
    const db = new SQL.Database(fs.readFileSync(filePath));
    let stmt = `select * from test_din_history desc limit 1`;
    let res = db.exec(stmt);
    console.log(res);
    if (res.length === 0) {
      console.error("No Data Found!");
    } else {
      const resultArr = _rowsFromSqlDataArray(res[0]);
      console.log(resultArr);
      db.close();
    }
  });
}
