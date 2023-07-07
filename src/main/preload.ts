import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import * as License from './modules/license';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: string, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: string, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);
      // ** (bug) NOT WORK remove listener
      return () => ipcRenderer.removeListener(channel, subscription);
      // return () => ipcRenderer.removeAllListeners(channel);
    },
    once(channel: string, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
    async invoke(channel: string, args: unknown[]) {
      await ipcRenderer.invoke(channel, args);
    },
    removeListener(channel: string, func: (...args: unknown[]) => void) {
      ipcRenderer.removeListener(channel, func);
    },
    removeAllListeners(channel: string) {
      ipcRenderer.removeAllListeners(channel);
    },
    self() {
      return ipcRenderer;
    },
  },
  store: {
    get(key: string) {
      return ipcRenderer.sendSync('electron-store-get', key);
    },
    set(key: string, val: any) {
      ipcRenderer.send('electron-store-set', key, val);
    },
    getObj(key: string) {
      return ipcRenderer.sendSync('electron-store-get-obj', key);
    },
    setObj(obj: object) {
      ipcRenderer.send('electron-store-set-obj', obj);
    },
    clear() {
      ipcRenderer.send('electron-store-clear');
    },
    // Other method you want to add like has(), reset(), etc.
  },
  licenseKeys: License.preloadBindings(ipcRenderer),
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
