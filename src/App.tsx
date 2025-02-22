import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '@pages/homePage';
import RegisterSebo from '@pages/register/sebo';
import { RegisterSeboProvider } from '@stores/register/sebo/store';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/*<Route path="/register" element={<Register />} />  path pra tela inicial de cadastro*/}
        <Route
          path="/register/sebo"
          element={
            <RegisterSeboProvider>
              <RegisterSebo />
            </RegisterSeboProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
