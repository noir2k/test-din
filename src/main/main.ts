/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';

import {
  app,
  BrowserWindow,
  shell,
  ipcMain,
  dialog,
  protocol,
  net,
  OpenDialogSyncOptions,
} from 'electron';

import Store from 'electron-store';
import log from 'electron-log';
import 'dotenv/config';

import type { Database } from 'sql.js';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from 'electron-devtools-assembler';

import MenuBuilder from './menu';
import * as Util from './util';
import type { ConfigSchemaType } from './util';

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
const STORE = new Store();

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

const _loadDefaultConfig = () => {
  const config = STORE.get('config') as ConfigSchemaType;
  if (!!config && !config.hasOwnProperty('soundInterval')) {
    config.soundInterval = Util.defaultConfig.soundInterval;
    STORE.set('config', config);
  } else {
    STORE.set('config', 0);
  }
};

const _loadData = (
  db: Database,
  channel: string,
  event: Electron.IpcMainEvent,
  result: {}[] | null | undefined
) => {
  if (result && result.length > 0) {
    const rowCount = Util.rowCount(db);
    STORE.set('rowCount', rowCount);
    STORE.set('currentPage', 1);
    event.sender.send(channel, result);
  } else {
    event.sender.send('load-data-failured', 'Empty Data');
  }
};

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
    },
    /** TODO: when release, remove comment */
    // resizable: false,
  });

  mainWindow.loadURL(Util.resolveHtmlPath('index.html'));

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

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  const db = await Util.createDb();
  await Util.initDbTable(db);
  _loadDefaultConfig();
  // Util.testDb(db);

  /**
   * ipcMain event
   * */
  ipcMain.on('ipc', async (event, arg) => {
    const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
    log.log(msgTemplate(arg));
    event.reply('ipc', msgTemplate('pong'));
  });

  ipcMain.on('show-open-sql', (event) => {
    const options: OpenDialogSyncOptions = {
      title: 'Open a file or folder',
      defaultPath: '',
      buttonLabel: 'Open',
      filters: [{ name: 'sql', extensions: ['sql'] }],
    };

    if (STORE.get('loadFilePath')) {
      const defaultPath = STORE.get('loadFilePath') as string;
      options.defaultPath = defaultPath;
    }

    const filePaths = dialog.showOpenDialogSync(options);

    if (filePaths !== undefined && filePaths.length > 0) {
      STORE.set('loadFilePath', filePaths[0]);
      const result = Util.loadFromSql(db, filePaths[0]);
      _loadData(db, 'sql-file-selected', event, result);
    } else {
      // event.sender.send('sql-file-canceled', 'File open canceled');
    }
  });

  ipcMain.on('show-save-sql', (event) => {
    const options = {
      title: 'Save Database File',
      buttonLabel: 'Save',
      filters: [{ name: 'sql', extensions: ['sql'] }],
    };

    const filePath = dialog.showSaveDialogSync(options);

    if (filePath) {
      const result = Util.findAll(db);

      if (result && result.length > 0) {
        const sqlstr = Util.generateInsertQueryFromSelect(result);
        const saved = Util.saveFile(filePath, sqlstr);
        if (saved) {
          event.sender.send('save-file-completed', 'File save completed');
        } else {
          event.sender.send('save-file-failured', 'File save Error');
        }
      } else {
        dialog.showMessageBox({
          message: 'No Data Found!',
          buttons: ['OK'],
        });
      }
    } else {
      log.log('No file selected.');
      // event.sender.send('no-file-selected', 'File open canceled');
    }
  });

  ipcMain.on('next-page', (event) => {
    const PAGE_COUNT = 15;
    const rowCount = Number(STORE.get('rowCount'));
    const currentPage = Number(STORE.get('currentPage'));
    const offset = currentPage * PAGE_COUNT;

    if (rowCount > offset) {
      const result = Util.findByRegDate(db, offset.toString());
      if (result && result.length > 0) {
        event.sender.send('load-more-data', result);
        STORE.set('currentPage', currentPage + 1);
      } else {
        log.log('No more data(1)');
        event.sender.send('no-more-data', 'No more data(1)');
      }
    } else {
      log.log('No more data(2)');
      event.sender.send('no-more-data', 'No more data(2)');
    }
  });

  ipcMain.on('graph-data', (event) => {
    const result = Util.getGraphData(db);
    log.log(result);
    if (result && result.length > 0) {
      event.sender.send('graph-data-result', result);
    } else {
      event.sender.send('load-data-failured', 'Empty Data');
    }
  });

  ipcMain.on('delete-data', (event, arg) => {
    const result = Util.deleteData(db, arg);
    _loadData(db, 'reload-data', event, result);
  });

  ipcMain.on('update-user-name', (event, arg) => {
    const result = Util.updateUserName(db, arg);
    _loadData(db, 'update-user-name', event, result);
  });

  ipcMain.on('electron-store-get', async (event, val) => {
    event.returnValue = STORE.get(val);
  });

  ipcMain.on('electron-store-set', async (event, key, val) => {
    STORE.set(key, val);
  });

  const printOptions = {
    silent: false,
    printBackground: true,
    color: true,
    margin: {
      marginType: 'printableArea',
    },
    landscape: false,
    pagesPerSheet: 1,
    collate: false,
    copies: 1,
  };

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
