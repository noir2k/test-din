import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import * as License from './modules/license';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: string, args: any[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: string, func: (...args: any[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: any[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);
      // ** (bug) NOT WORK remove listener
      return () => ipcRenderer.removeListener(channel, subscription);
      // return () => ipcRenderer.removeAllListeners(channel);
    },
    once(channel: string, func: (...args: any[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
    async invoke(channel: string, args: any[]) {
      return await ipcRenderer.invoke(channel, args);
    },
    removeListener(channel: string, func: (...args: any[]) => void) {
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
    clear() {
      ipcRenderer.send('electron-store-clear');
    },
    // Other method you want to add like has(), reset(), etc.
  },
  licenseKeys: License.preloadBindings(ipcRenderer),
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
