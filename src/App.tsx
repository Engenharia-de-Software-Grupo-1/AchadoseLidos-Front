import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '@pages/homePage';
import RegisterSebo from '@pages/register/sebo';
import { RegisterSeboProvider } from '@stores/register/sebo/store';
import { NotificationProvider } from '@contexts/notificationContext';
import ProfileSebo from '@pages/profile/sebo';
import ProfileSeboForm from '@pages/profile/sebo/form';
import { ProfileSeboFormProvider } from '@stores/profile/sebo/formStore';
import { ErrorProvider } from '@contexts/errorContext';
import RegisterUser from '@pages/register/user';
import { RegisterUserProvider } from '@stores/register/user/store';
import RegistrationPage from '@pages/registrationPage';
import ProfileUser from '@pages/profile/user';
import ProfileUserForm from '@pages/profile/user/form';
import { ProfileUserFormProvider } from '@stores/profile/user/formStore';

const App = () => {
  return (
    <ErrorProvider>
      <BrowserRouter>
        <NotificationProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegistrationPage />} />
            {/*<Route path="/register" element={<Register />} />  path pra tela inicial de cadastro*/}
            <Route
              path="/register/sebo"
              element={
                <RegisterSeboProvider>
                  <RegisterSebo />
                </RegisterSeboProvider>
              }
            />
            <Route
              path="/register/user"
              element={
                <RegisterUserProvider>
                  <RegisterUser />
                </RegisterUserProvider>
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
            <Route path="/profile/user" element={<ProfileUser />} />
            <Route
              path="/profile/user/edit"
              element={
                <ProfileUserFormProvider>
                  <ProfileUserForm />
                </ProfileUserFormProvider>
              }
            />
          </Routes>
        </NotificationProvider>
      </BrowserRouter>
    </ErrorProvider>
  );
};

export default App;
