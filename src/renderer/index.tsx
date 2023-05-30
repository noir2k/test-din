import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<App />);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc', (arg) => {
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc', ['ping']);
window.electron.ipcRenderer.testDb();
