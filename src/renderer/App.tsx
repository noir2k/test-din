import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@store/index';

import 'tailwindcss/tailwind.css';
import './App.css';

import '@assets/fonts/FiraSans-Black.ttf';
import '@assets/fonts/FiraSans-Bold.ttf';
import '@assets/fonts/FiraSans-Regular.ttf';
import '@assets/fonts/LINESeedKR-Bd.ttf';
import '@assets/fonts/LINESeedKR-Rg.ttf';

import Welcome from './pages/WelcomePage';
import MainPage from './pages/MainPage';

export default function App() {
  return (
    <Router>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/main-page" element={<MainPage />} />
        </Routes>
      </Provider>
    </Router>
  );
}
