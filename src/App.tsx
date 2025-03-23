import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '@pages/homePage';
import RegisterSebo from '@pages/register/sebo';
import { RegisterSeboProvider } from '@stores/register/sebo/store';
import { NotificationProvider } from '@contexts/notificationContext';
import ProfileSebo from '@pages/profile/sebo';
import ProfileSeboForm from '@pages/profile/sebo/form';
import { ProfileSeboFormProvider } from '@stores/profile/sebo/formStore';
import { ErrorProvider } from '@contexts/errorContext';
import { SeboProvider } from '@stores/profile/sebo/indexStore';

const App = () => {
  return (
    <ErrorProvider>
      <BrowserRouter>
        <NotificationProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/register/sebo"
              element={
                <RegisterSeboProvider>
                  <RegisterSebo />
                </RegisterSeboProvider>
              }
            />
            <Route
              path="/profile/sebo"
              element={
                <SeboProvider>
                  <ProfileSebo id={1}/>
                </SeboProvider>
              }
            />
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
