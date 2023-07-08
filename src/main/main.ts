/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import { URL } from 'url';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

import {
  app,
  BrowserWindow,
  shell,
  ipcMain,
  dialog,
  safeStorage,
  protocol,
  net,
  OpenDialogSyncOptions,
} from 'electron';

import Store from 'electron-store';
import log from 'electron-log';
import 'dotenv/config';

// import type { Database } from 'sql.js';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from 'electron-devtools-assembler';

import MenuBuilder from './menu';

// import * as Db from './modules/database';
// import type { ConfigSchemaType } from './modules/database';

import * as License from './modules/license';
import type {
  AppVer,
  LicenseOpt,
  ValidateLicenseResult,
} from './modules/license';

// const SecureElectronLicenseKeys = require('secure-electron-license-keys');

// import { autoUpdater } from 'electron-updater';
// class AppUpdater {
//   constructor() {
//     log.transports.file.level = 'info';
//     autoUpdater.logger = log;
//     autoUpdater.checkForUpdatesAndNotify();
//   }
// }

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

Store.initRenderer();
export const STORE = new Store();

const RESOURCES_PATH = app.isPackaged
  ? path.join(process.resourcesPath, 'assets')
  : path.join(__dirname, '../../assets');

export const getAssetPath = (...paths: string[]): string => {
  return path.join(RESOURCES_PATH, ...paths);
};

async function installExtensions() {
  [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS].forEach((extension) => {
    log.log(extension);
    installExtension(extension, {
      loadExtensionOptions: {
        allowFileAccess: true,
      },
      forceDownload: !!process.env.UPGRADE_EXTENSIONS,
    })
      .then((name) => console.log(`Added Extension: ${name}`))
      .catch((err) => console.log(`"${extension}" An error occurred: `, err));
  });
}

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

// log.log(app.getPath('userData'));

const resolveHtmlPath = (htmlFileName: string) => {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }

  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
};

const validateLicense = (options: LicenseOpt): ValidateLicenseResult => {
  const validationResult = {
    success: false,
    expire: '',
    appVersion: License.parseVersion(options.version),
    message: '',
  } as ValidateLicenseResult;

  const publicKeyPath = path.join(options.root, 'public.key');
  const licenseDataPath = path.join(options.root, 'license.data');
  console.log('options', options);
  console.log('STORE', STORE.get('config'));
  console.log('STORE', STORE.get('config.user'));

  if (fs.existsSync(publicKeyPath) && fs.existsSync(licenseDataPath)) {
    const publicKey = fs.readFileSync(publicKeyPath);
    const licenseData = fs.readFileSync(licenseDataPath);

    try {
      const decrypted = crypto.publicDecrypt(publicKey, licenseData);
      const parseStr = JSON.parse(decrypted.toString('utf8'));

      console.log('parseStr', parseStr);

      validationResult.expire = parseStr.expire;

      let expired = false;
      if (parseStr.expire !== '' && parseStr.expire !== undefined) {
        const expireDate = new Date(parseStr.expire);
        const today = new Date();
        expired = expireDate < today;
      }

      // check validation
      if (
        parseStr.major !== 'all' &&
        parseStr.major !== validationResult.appVersion.major
      ) {
        validationResult.message = 'major version not matched';
      } else if (
        parseStr.minor !== 'all' &&
        parseStr.minor !== validationResult.appVersion.minor
      ) {
        validationResult.message = 'minor version not matched';
      } else if (
        parseStr.patch !== 'all' &&
        parseStr.patch !== validationResult.appVersion.patch
      ) {
        validationResult.message = 'patch version not matched';
      } else if (parseStr.user !== STORE.get('config.user')) {
        validationResult.message = 'user not matched';
      } else if (expired) {
        validationResult.message = 'license expired';
      } else {
        validationResult.success = true;
        validationResult.message = 'OK';
      }
    } catch (err) {
      validationResult.expire = '####-##-##';
      validationResult.message = 'license file is invalid';
      return validationResult;
    }
  } else {
    validationResult.expire = '####-##-##';
    validationResult.message = 'license file not found';
  }

  return validationResult;
};

// const _loadData = (
//   database: Database,
//   channel: string,
//   event: Electron.IpcMainEvent,
//   result: {}[] | null | undefined
// ) => {
//   if (result && result.length > 0) {
//     const rowCount = Db.rowCount(database);
//     STORE.set('rowCount', rowCount);
//     STORE.set('currentPage', 1);
//     event.sender.send(channel, result);
//   } else {
//     event.sender.send('load-data-failured', 'Empty Data');
//   }
// };

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
    log.info('Log from the main process');
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1440,
    height: 1024,
    minWidth: 1024,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      devTools: true,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
      nodeIntegration: true,
    },
    /** TODO: when release, remove comment */
    // resizable: false,
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('close', (event: Electron.Event) => {
    const response = dialog.showMessageBoxSync(mainWindow!, {
      type: 'question',
      buttons: ['종료', '취소'],
      defaultId: 1,
      cancelId: 1,
      title: '아이해브 청력테스트 Pro',
      message: '프로그램을 종료하시겠습니까?',
    });

    if (response === 1) {
      event.preventDefault();
    } else {
      if (STORE.get('react-route') === 'MainPage') {
        if (mainWindow) {
          mainWindow.webContents.send('app-close');
        } else {
          mainWindow = null;
        }
      } else {
        mainWindow = null;
      }
    }
  });

  mainWindow.on('closed', (event: Electron.Event) => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // const database = await Db.createDb();
  // await Db.initDbTable(database);

  /**
   * ipcMain event
   * */
  ipcMain.on('ipc', async (event, arg) => {
    console.log('ipc', arg);
    const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
    log.log(msgTemplate(arg));
    event.reply('ipc', msgTemplate('pong'));
  });

  // ipcMain.on('show-open-sql', (event) => {
  //   const options: OpenDialogSyncOptions = {
  //     title: 'Open a file or folder',
  //     defaultPath: '',
  //     buttonLabel: 'Open',
  //     filters: [{ name: 'sql', extensions: ['sql'] }],
  //   };

  //   if (STORE.get('loadFilePath')) {
  //     const defaultPath = STORE.get('loadFilePath') as string;
  //     options.defaultPath = defaultPath;
  //   }

  //   const filePaths = dialog.showOpenDialogSync(options);

  //   if (filePaths !== undefined && filePaths.length > 0) {
  //     STORE.set('loadFilePath', filePaths[0]);
  //     const result = Db.loadFromSql(fs, database, filePaths[0]);
  //     _loadData(database, 'sql-file-selected', event, result);
  //   } else {
  //     // event.sender.send('sql-file-canceled', 'File open canceled');
  //   }
  // });

  // ipcMain.on('show-save-sql', (event) => {
  //   const options = {
  //     title: 'Save Database File',
  //     buttonLabel: 'Save',
  //     filters: [{ name: 'sql', extensions: ['sql'] }],
  //   };

  //   const filePath = dialog.showSaveDialogSync(options);

  //   if (filePath) {
  //     const result = Db.findAll(database);

  //     if (result && result.length > 0) {
  //       const sqlstr = Db.generateInsertQueryFromSelect(result);
  //       const saved = Db.saveFile(fs, filePath, sqlstr);
  //       if (saved) {
  //         event.sender.send('save-file-completed', 'File save completed');
  //       } else {
  //         event.sender.send('save-file-failured', 'File save Error');
  //       }
  //     } else {
  //       dialog.showMessageBox({
  //         message: 'No Data Found!',
  //         buttons: ['OK'],
  //       });
  //     }
  //   } else {
  //     log.log('No file selected.');
  //     // event.sender.send('no-file-selected', 'File open canceled');
  //   }
  // });

  // ipcMain.on('next-page', (event) => {
  //   const PAGE_COUNT = 15;
  //   const rowCount = Number(STORE.get('rowCount'));
  //   const currentPage = Number(STORE.get('currentPage'));
  //   const offset = currentPage * PAGE_COUNT;

  //   if (rowCount > offset) {
  //     const result = Db.findByRegDate(database, offset.toString());
  //     if (result && result.length > 0) {
  //       event.sender.send('load-more-data', result);
  //       STORE.set('currentPage', currentPage + 1);
  //     } else {
  //       log.log('No more data(1)');
  //       event.sender.send('no-more-data', 'No more data(1)');
  //     }
  //   } else {
  //     log.log('No more data(2)');
  //     event.sender.send('no-more-data', 'No more data(2)');
  //   }
  // });

  // ipcMain.on('graph-data', (event) => {
  //   const result = Db.getGraphData(database);
  //   log.log(result);
  //   if (result && result.length > 0) {
  //     event.sender.send('graph-data-result', result);
  //   } else {
  //     event.sender.send('load-data-failured', 'Empty Data');
  //   }
  // });

  // ipcMain.on('delete-data', (event, arg) => {
  //   const result = Db.deleteData(database, arg);
  //   _loadData(database, 'reload-data', event, result);
  // });

  // ipcMain.on('update-user-name', (event, arg) => {
  //   const result = Db.updateUserName(database, arg);
  //   _loadData(database, 'update-user-name', event, result);
  // });

  ipcMain.on('react-route', async (_, arg) => {
    STORE.set('react-route', arg[0]);
  });

  ipcMain.handle('set:temp', async (_, arg) => {
    STORE.set('temp', arg[0]);
  });

  ipcMain.handle('get:temp', async (_, arg) => {
    const temp = STORE.get('temp');
    return temp;
  });

  ipcMain.handle('set:conf', async (_, arg) => {
    STORE.set({ config: arg[0] });
  });

  ipcMain.handle('get:conf', (event, arg) => {
    return STORE.get(`config.${arg[0]}`);
  });

  ipcMain.on('electron-store-clear', async (event, obj) => {
    STORE.clear();
  });

  ipcMain.on(License.validateLicenseRequest, (event, _args) => {
    const result = validateLicense({
      root: process.cwd(),
      version: app.getVersion(),
    });
    console.log('result', result);

    event.sender.send(License.validateLicenseResponse, result);
  });

  // Remove this if your app does not use auto updates
  // new AppUpdater();
};

/**
 * Add event listeners...
 */
app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  } else {
    License.clearMainBindings(ipcMain);
  }
});

app
  .whenReady()
  .then(() => {
    protocol.handle('static', (request) => {
      return net.fetch(
        `file://${getAssetPath(request.url.slice('static://'.length))}`
      );
    });
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch((e) => console.log(e));
