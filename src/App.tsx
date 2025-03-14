import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '@pages/homePage';
import RegisterSebo from '@pages/register/sebo';
import { RegisterSeboProvider } from '@stores/register/sebo/store';
import { NotificationProvider } from '@contexts/notificationContext';
import ProfileSebo from '@pages/profile/sebo';
import ProfileSeboForm from '@pages/profile/sebo/form';
import { ProfileSeboFormProvider } from '@stores/profile/sebo/formStore';
import { ErrorProvider } from '@contexts/errorContext';
import { useEffect, useState } from 'react';
import api from './services/api';
const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('http://localhost:3333/api/sebos');
        setData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <ErrorProvider>
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
            <Route path="/profile/sebo" element={<ProfileSebo />} />
            <Route
              path="/profile/sebo/edit"
              element={
                <ProfileSeboFormProvider>
                  <ProfileSeboForm />
                </ProfileSeboFormProvider>
              }
            />
          </Routes>
        </NotificationProvider>
      </BrowserRouter>
    </ErrorProvider>
  );
};

export default App;
