import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@store/index';

import 'tailwindcss/tailwind.css';
import './App.css';

import WelcomePage from './pages/WelcomePage';
import MainPage from './pages/MainPage';

export default function App() {
  return (
    <Router>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/main-page" element={<MainPage />} />
        </Routes>
      </Provider>
    </Router>
  );
}
