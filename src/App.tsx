import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '@pages/homePage';
import RegisterSebo from '@pages/registerSebo';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/registerSebo" element={<RegisterSebo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
