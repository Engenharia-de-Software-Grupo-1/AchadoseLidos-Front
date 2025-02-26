import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '@pages/homePage';
import RegisterSebo from '@pages/register/sebo';
import { RegisterSeboProvider } from '@stores/register/sebo/store';
import { NotificationProvider } from '@utils/notificationContext';
import ProfileSebo from '@pages/profile/sebo';

const App = () => {
  return (
    <BrowserRouter>
      <NotificationProvider>
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

          <Route path="/profile/sebo" element={<ProfileSebo />}/>
        </Routes>
      </NotificationProvider>
    </BrowserRouter>
  );
};

export default App;
