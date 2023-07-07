declare module 'secure-electron-license-keys' {
  import { IpcRenderer, IpcMain, BrowserWindow } from 'electron';

  interface Version {
    major: string;
    minor: string;
    patch: string;
  }

  interface ValidationResult {
    success: boolean;
    appVersion: Version | string;
    user: string | undefined;
  }

  export const validateLicenseRequest: string;
  export const validateLicenseResponse: string;

  export function preloadBindings(ipcRenderer: IpcRenderer): {
    send: (channel: string) => void;
    onReceive: (
      channel: string,
      func: (args: ValidationResult) => void
    ) => void;
    clearRendererBindings: () => void;
  };

  export function mainBindings(
    ipcMain: IpcMain,
    browserWindow: BrowserWindow,
    fs: typeof import('fs'),
    crypto: typeof import('crypto'),
    options?: { root: string; version?: string }
  ): void;

  export function clearMainBindings(ipcMain: IpcMain): void;

  export class SecureElectronLicenseKeys {
    constructor();
  }
}
