import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '@pages/homePage';
import LoginPage from '@pages/loginPage';
import RecoverPageOne from '@pages/recoverPageOne';
import RecoverPageTwo from '@pages/recoverPageTwo';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage children={undefined} simpleHeader={true} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
