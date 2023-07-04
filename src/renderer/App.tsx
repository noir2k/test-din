import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@store/index';

import 'tailwindcss/tailwind.css';
import './App.css';

// import '@assets/fonts/woff2/FiraSans-Bold.woff2';
// import '@assets/fonts/woff2/FiraSans-Regular.woff2';
// import '@assets/fonts/woff2/LINESeedKR-Bd.woff2';
// import '@assets/fonts/woff2/LINESeedKR-Rg.woff2';

// import '@assets/fonts/woff/FiraSans-Bold.woff';
// import '@assets/fonts/woff/FiraSans-Regular.woff';
// import '@assets/fonts/woff/LINESeedKR-Bd.woff';
// import '@assets/fonts/woff/LINESeedKR-Rg.woff';

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
