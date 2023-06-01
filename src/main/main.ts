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
} from 'electron';

import Store from 'electron-store';
import log from 'electron-log';

import MenuBuilder from './menu';
import * as Util from './util';

import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-assembler';

// import { autoUpdater } from 'electron-updater';
// class AppUpdater {
//   constructor() {
//     log.transports.file.level = 'info';
//     autoUpdater.logger = log;
//     autoUpdater.checkForUpdatesAndNotify();
//   }
// }

const STORE = new Store();

const RESOURCES_PATH = app.isPackaged
? path.join(process.resourcesPath, 'assets')
: path.join(__dirname, '../../assets');

export const getAssetPath = (...paths: string[]): string => {
  return path.join(RESOURCES_PATH, ...paths);
};

async function installExtensions(){
  // [REACT_DEVELOPER_TOOLS] not work!
  [REDUX_DEVTOOLS].forEach(extension => {
    console.log(extension);
    installExtension(extension, {
      loadExtensionOptions: {
        allowFileAccess: true,
      },
      forceDownload: !!process.env.UPGRADE_EXTENSIONS
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
  log.initialize({ preload: true });
}

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
    log.info('Log from the main process');
  }

  const db = await Util.createDb();
  Util.initDbTable(db);
  // Util.testDb(db);

  mainWindow = new BrowserWindow({
    show: false,
    width: 1200,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
      ? path.join(__dirname, 'preload.js')
      : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
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

  /**
   * ipcMain event
   **/
  ipcMain.on('ipc', async (event, arg) => {
    const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
    log.log(msgTemplate(arg));
    event.reply('ipc', msgTemplate('pong'));
  });

  ipcMain.on('show-open-sql', (event) => {
    const options = {
      title: 'Open a file or folder',
      buttonLabel: 'Open',
      filters: [
        { name: 'sql', extensions: ['sql'] }
      ]
    };

    const filePaths = dialog.showOpenDialogSync(options);

    if (filePaths !== undefined && filePaths.length > 0) {
      STORE.set('loadFilePath', filePaths[0]);
      const result = Util.loadFromSql(db, filePaths[0]);
      result && result.length > 0
      ? event.sender.send('sql-file-selected', result)
      : event.sender.send('sql-file-failured', 'File open Error\nEmpty Data or Invalid file Format');
    } else {
      // event.sender.send('sql-file-canceled', 'File open canceled');
    }
  });

  ipcMain.on('show-save-sql', (event) => {
    const options = {
      title: 'Save Database File',
      buttonLabel: 'Save',
      filters: [
        { name: 'sql', extensions: ['sql']}
      ],
    };

    const filePath = dialog.showSaveDialogSync(options);

    if (filePath) {
      const result = Util.findAll(db);

      if(result && result.length > 0) {
        const sqlstr = Util.generateInsertQueryFromSelect(result);
        Util.saveFile(filePath, sqlstr)
        ? event.sender.send('save-file-completed', 'File save completed')
        : event.sender.send('save-file-failured', 'File save Error');
      } else {
        dialog.showMessageBox({
          message: 'No Data Found!',
          buttons: ['OK']
        })
      }
    } else {
      log.log('No file selected.');
      // event.sender.send('no-file-selected', 'File open canceled');
    }
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
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    // log.info('ts', new Date().getTime());
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
