import fs from 'fs';
import path from 'path';
import webpackPaths from '../configs/webpack.paths';

const rimraf = require('rimraf');
const glob = require('glob');

export default function deleteSourceMaps() {
  if (fs.existsSync(webpackPaths.distMainPath))
    rimraf.sync(
      glob.sync(path.join(webpackPaths.distMainPath, '*.js.map'))
    );
  if (fs.existsSync(webpackPaths.distRendererPath))
    rimraf.sync(
      glob.sync(path.join(webpackPaths.distRendererPath, '*.js.map'))
  );
}
