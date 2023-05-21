import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import 'tailwindcss/tailwind.css';
import './App.css';
import Welcome from './pages/WelcomePage';
import MainPage from './pages/MainPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/main-page" element={<MainPage />} />
      </Routes>
    </Router>
  );
}
