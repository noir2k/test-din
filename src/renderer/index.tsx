import { createRoot } from 'react-dom/client';
import log from 'electron-log/renderer';

import App from './App';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<App />);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc', (arg) => {
  console.log(arg);
});

window.electron.ipcRenderer.sendMessage('ipc', ['ping']);

window.electron.ipcRenderer.on('load-data-failured', (message) => {
  alert(message);
});

window.electron.ipcRenderer.on('save-file-failured', (message) => {
  alert(message);
});

log.info('Log from the renderer process');
