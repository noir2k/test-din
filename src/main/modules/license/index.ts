export const validateLicenseRequest = 'ValidateLicense-Request';
export const validateLicenseResponse = 'ValidateLicense-Response';

export type AppVer = {
  major: string;
  minor: string;
  patch: string;
};

export type LicenseOpt = {
  version: string;
  root: string;
  user?: string;
};

export type ValidateLicenseResult = {
  success: boolean;
  expire: string | undefined;
  appVersion: AppVer;
  message: string;
};

export const parseVersion = (version: string): AppVer | string => {
  if (!version || version.length < 5) {
    console.warn(
      `Could not parse version since ${version} doesn't seem to follow semver specifications.`
    );
    return version;
  }

  const split = version.split('.');
  if (split.length === 3) {
    return {
      major: split[0],
      minor: split[1],
      patch: split[2],
    };
  }
  return version;
};

export const preloadBindings = (ipcRenderer: Electron.IpcRenderer) => {
  return {
    send: (channel: string) => {
      const validChannels = [validateLicenseRequest];
      if (validChannels.includes(channel)) {
        ipcRenderer.send(channel);
      }
    },
    onReceive: (channel: string, func: (args: any) => void) => {
      const validChannels = [validateLicenseResponse];
      if (validChannels.includes(channel)) {
        ipcRenderer.on(channel, (_event, args) => func(args));
      }
    },
    clearRendererBindings: () => {
      ipcRenderer.removeAllListeners(validateLicenseResponse);
    },
  };
};

export const clearMainBindings = (ipcMain: Electron.IpcMain) => {
  ipcMain.removeAllListeners(validateLicenseRequest);
};
